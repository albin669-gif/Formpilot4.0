import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  LearnedWorkflow, 
  Opportunity, 
  UserCareerDNA, 
  UserDocument, 
  ChaosScenario, 
  AgentMetrics, 
  LanguageCode, 
  AgentActionLog, 
  AgentPlanStep 
} from '../types/agent';
import { 
  INITIAL_USER_DNA, 
  INITIAL_DOCUMENTS, 
  INITIAL_LEARNED_WORKFLOWS, 
  INITIAL_OPPORTUNITIES, 
  CHAOS_SCENARIOS, 
  INITIAL_METRICS,
  DEMO_SCENES 
} from '../data/mockData';
import { VoiceService } from '../services/voiceService';

export type NavTab = 
  | 'command-center' 
  | 'browser-agent' 
  | 'government-hub' 
  | 'copilot' 
  | 'workflows' 
  | 'test-lab' 
  | 'analytics' 
  | 'trust-center' 
  | 'settings' 
  | 'timeline' 
  | 'calendar';

export type AgentStatus = 
  | 'idle' 
  | 'planning' 
  | 'running' 
  | 'learning' 
  | 'reused' 
  | 'recovering' 
  | 'waiting_approval' 
  | 'completed' 
  | 'error';

export interface NotificationItem {
  id: string;
  type: 'urgent' | 'opportunity' | 'workflow' | 'document' | 'healed';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionTab?: NavTab;
}

interface AgentContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  currentQuery: string;
  setCurrentQuery: (q: string) => void;
  agentStatus: AgentStatus;
  currentPlan: AgentPlanStep[];
  actionLogs: AgentActionLog[];
  learnedWorkflows: LearnedWorkflow[];
  opportunities: Opportunity[];
  userDNA: UserCareerDNA;
  userDocuments: UserDocument[];
  chaosScenarios: ChaosScenario[];
  metrics: AgentMetrics;
  notifications: NotificationItem[];
  
  // Browser sandbox state
  browserUrl: string;
  setBrowserUrl: (url: string) => void;
  isMutatedDom: boolean;
  setIsMutatedDom: (m: boolean) => void;
  hasPopupOverlay: boolean;
  setHasPopupOverlay: (p: boolean) => void;
  activeElementSelector: string;
  cursorPos: { x: number; y: number; clicking: boolean };
  isHumanTakeover: boolean;
  toggleHumanTakeover: () => void;

  // Active highlighted item / focus
  activeRecoveryLog: string | null;
  activeReusedWorkflowId: string | null;
  activeNewlyLearnedWf: LearnedWorkflow | null;

  // Actions
  executeAgentTask: (query: string, options?: { forceReuse?: boolean; forceMutate?: boolean }) => Promise<void>;
  cancelAgentTask: () => void;
  triggerChaosTest: (scenarioId: string) => Promise<void>;
  relearnWorkflow: (workflowId: string) => Promise<void>;
  deleteWorkflow: (workflowId: string) => void;
  updateUserDNA: (dna: Partial<UserCareerDNA>) => void;
  updateDocument: (docId: string, updates: Partial<UserDocument>) => void;
  approveApplication: (oppId: string) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  clearMemory: () => void;
  resetToDefaults: () => void;

  // Demo player
  isDemoRunning: boolean;
  currentDemoScene: number;
  startHackathonDemo: () => void;
  stopHackathonDemo: () => void;
  jumpToDemoScene: (sceneNum: number) => void;
  nextDemoScene: () => void;
  prevDemoScene: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('command-center');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [currentQuery, setCurrentQuery] = useState('Find CSE internships in Bangalore with stipend above ₹10,000.');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  
  const [currentPlan, setCurrentPlan] = useState<AgentPlanStep[]>([]);
  const [actionLogs, setActionLogs] = useState<AgentActionLog[]>([]);
  const [learnedWorkflows, setLearnedWorkflows] = useState<LearnedWorkflow[]>(INITIAL_LEARNED_WORKFLOWS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [userDNA, setUserDNA] = useState<UserCareerDNA>(INITIAL_USER_DNA);
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>(INITIAL_DOCUMENTS);
  const [chaosScenarios, setChaosScenarios] = useState<ChaosScenario[]>(CHAOS_SCENARIOS);
  const [metrics, setMetrics] = useState<AgentMetrics>(INITIAL_METRICS);
  
  // Browser sandbox state
  const [browserUrl, setBrowserUrl] = useState('https://bangalore.techjobs.internal/internships');
  const [isMutatedDom, setIsMutatedDom] = useState(false);
  const [hasPopupOverlay, setHasPopupOverlay] = useState(false);
  const [activeElementSelector, setActiveElementSelector] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 320, y: 180, clicking: false });
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);

  // Recovery & Learning badges
  const [activeRecoveryLog, setActiveRecoveryLog] = useState<string | null>(null);
  const [activeReusedWorkflowId, setActiveReusedWorkflowId] = useState<string | null>(null);
  const [activeNewlyLearnedWf, setActiveNewlyLearnedWf] = useState<LearnedWorkflow | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      type: 'urgent',
      title: '🔴 Scholarship Deadline Approaching',
      message: 'Karnataka SSP Post-Matric application closes in 15 days.',
      timestamp: '10m ago',
      read: false,
      actionTab: 'government-hub'
    },
    {
      id: 'n-2',
      type: 'opportunity',
      title: '🎯 High Match Opportunity (96%)',
      message: 'Zepto AI Systems & Backend Intern verified in Bangalore.',
      timestamp: '25m ago',
      read: false,
      actionTab: 'command-center'
    },
    {
      id: 'n-3',
      type: 'document',
      title: '📋 Missing Document Alert',
      message: 'Income Certificate required to unlock 100% scholarship readiness.',
      timestamp: '1h ago',
      read: false,
      actionTab: 'copilot'
    }
  ]);

  // Demo Player state
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [currentDemoScene, setCurrentDemoScene] = useState(1);
  const demoTimerRef = useRef<any>(null);
  const isExecutingRef = useRef(false);

  const voice = VoiceService.getInstance();

  const addLog = useCallback((
    iconType: AgentActionLog['iconType'], 
    message: string, 
    details?: string, 
    selector?: string
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog: AgentActionLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      timeOffsetMs: Date.now(),
      iconType,
      message,
      details,
      highlightSelector: selector
    };
    setActionLogs(prev => [newLog, ...prev.slice(0, 49)]);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  // Execution Planner
  const generatePlan = (query: string): AgentPlanStep[] => {
    return [
      { id: 'p1', title: 'Parse Query & Career DNA Constraints', status: 'pending', estimatedSeconds: 3 },
      { id: 'p2', title: 'Check Learned Workflow Registry for Cache Hit', status: 'pending', estimatedSeconds: 2 },
      { id: 'p3', title: 'Launch Autonomous Webcmd Browser Agent', status: 'pending', estimatedSeconds: 8 },
      { id: 'p4', title: 'Traverse Target Portals & Handle DOM Mutations', status: 'pending', estimatedSeconds: 12 },
      { id: 'p5', title: 'Extract Live Listings & Verify Official Source Signatures', status: 'pending', estimatedSeconds: 5 },
      { id: 'p6', title: 'Calculate 7-Factor Eligibility & Rank Opportunities', status: 'pending', estimatedSeconds: 4 },
      { id: 'p7', title: 'Synthesize / Update Reusable Workflow Schema', status: 'pending', estimatedSeconds: 4 }
    ];
  };

  const executeAgentTask = async (
    query: string, 
    options?: { forceReuse?: boolean; forceMutate?: boolean }
  ) => {
    if (isExecutingRef.current) return;
    isExecutingRef.current = true;

    setAgentStatus('planning');
    setActiveRecoveryLog(null);
    setActiveReusedWorkflowId(null);
    setActiveNewlyLearnedWf(null);
    voice.playChime('start');

    const plan = generatePlan(query);
    setCurrentPlan(plan);
    addLog('ai', `Planner initialized for prompt: "${query}"`);

    // Sleep helper
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    try {
      // Step 1: Parse
      await delay(600);
      setCurrentPlan(p => p.map((st, i) => i === 0 ? { ...st, status: 'in_progress' } : st));
      addLog('ai', `Identified constraints: Degree=B.Tech CSE, Location=Bangalore/Remote, Stipend >= ₹10,000`);
      await delay(800);
      setCurrentPlan(p => p.map((st, i) => i === 0 ? { ...st, status: 'completed' } : st));

      // Step 2: Cache check
      setCurrentPlan(p => p.map((st, i) => i === 1 ? { ...st, status: 'in_progress' } : st));
      const shouldReuse = options?.forceReuse || (!options?.forceMutate && query.toLowerCase().includes('internship'));
      
      if (shouldReuse) {
        setAgentStatus('reused');
        setActiveReusedWorkflowId('wf-tech-internships-blr');
        addLog('workflow', '⚡ WORKFLOW FOUND: Reusing "CSE Bangalore Internship Hunter" (Reliability: 96%)', 'Skipping cold search. Executing fast-path.');
        voice.playChime('success');
        await delay(1200);
        setCurrentPlan(p => p.map((st, i) => i === 1 ? { ...st, status: 'completed' } : st));
      } else {
        addLog('network', 'No exact workflow match found in cache. Initiating cold exploration.');
        await delay(800);
        setCurrentPlan(p => p.map((st, i) => i === 1 ? { ...st, status: 'completed' } : st));
      }

      // Step 3: Launch Browser Agent
      setAgentStatus('running');
      setCurrentPlan(p => p.map((st, i) => i === 2 ? { ...st, status: 'in_progress' } : st));
      const targetUrl = query.toLowerCase().includes('scholarship') || query.toLowerCase().includes('ವಿದ್ಯಾರ್ಥಿವೇತನ')
        ? 'https://scholarships.gov.in/schemes'
        : 'https://bangalore.techjobs.internal/internships';
      setBrowserUrl(targetUrl);
      addLog('network', `🌐 Navigated to ${targetUrl}`, 'HTTP 200 OK | DOM ReadyState: complete');
      
      // Simulate cursor moving
      setCursorPos({ x: 280, y: 140, clicking: false });
      await delay(600);
      setCursorPos({ x: 360, y: 210, clicking: true });
      voice.playChime('click');
      await delay(400);
      setCursorPos(prev => ({ ...prev, clicking: false }));
      setCurrentPlan(p => p.map((st, i) => i === 2 ? { ...st, status: 'completed' } : st));

      // Step 4: Traverse DOM & check mutation
      setCurrentPlan(p => p.map((st, i) => i === 3 ? { ...st, status: 'in_progress' } : st));
      const isMutate = options?.forceMutate || isMutatedDom;

      if (isMutate) {
        setAgentStatus('recovering');
        voice.playChime('alert');
        addLog('warn', '⚠️ WORKFLOW CHANGE DETECTED: Expected selector "#btn-apply" not found on page.');
        await delay(1000);
        addLog('ai', '🧠 Analyzing alternative DOM nodes via Semantic Tree Vector embeddings...');
        await delay(1200);
        setActiveRecoveryLog('Found: "Start Application" (.cta-begin-flow) | Confidence: 94% | Dynamic XPath re-bound successfully.');
        voice.playChime('heal');
        addLog('recovery', '✓ RECOVERED: Workflow automatically patched and re-routed. Execution uninterrupted.');
        setIsMutatedDom(false); // healed!
      } else {
        addLog('dom', 'Applied filter: Location [Bangalore, Remote], Min Stipend [₹10,000]');
        setCursorPos({ x: 540, y: 320, clicking: true });
        voice.playChime('click');
        await delay(400);
        setCursorPos(prev => ({ ...prev, clicking: false }));
      }
      await delay(1000);
      setCurrentPlan(p => p.map((st, i) => i === 3 ? { ...st, status: 'completed' } : st));

      // Step 5: Extract & Verify Sources
      setCurrentPlan(p => p.map((st, i) => i === 4 ? { ...st, status: 'in_progress' } : st));
      addLog('search', 'Extracted 5 live candidate opportunities from target portal.');
      addLog('network', '✓ Verified anti-hallucination source timestamps across official domains.');
      await delay(900);
      setCurrentPlan(p => p.map((st, i) => i === 4 ? { ...st, status: 'completed' } : st));

      // Step 6: 7-Factor Eligibility & Scoring
      setCurrentPlan(p => p.map((st, i) => i === 5 ? { ...st, status: 'in_progress' } : st));
      addLog('ai', '🎯 Calculated FormPilot Score (96/100) & verified eligibility across 7 vectors.');
      await delay(800);
      setCurrentPlan(p => p.map((st, i) => i === 5 ? { ...st, status: 'completed' } : st));

      // Step 7: Synthesize Workflow
      setCurrentPlan(p => p.map((st, i) => i === 6 ? { ...st, status: 'in_progress' } : st));
      if (!shouldReuse) {
        setAgentStatus('learning');
        const newWf: LearnedWorkflow = {
          id: `wf-${Date.now()}`,
          portalName: query.toLowerCase().includes('scholarship') ? 'National Scholarship Portal (NSP)' : 'Bangalore Tech Careers Hub',
          portalCategory: query.toLowerCase().includes('scholarship') ? 'Scholarships' : 'Internships',
          targetUrl,
          workflowName: `Autonomous Traversal — ${query.slice(0, 32)}...`,
          description: `Self-synthesized workflow generated on ${new Date().toLocaleTimeString()} with verified selectors.`,
          reliability: 94,
          healthStatus: 'HEALTHY',
          totalRuns: 1,
          successfulRuns: 1,
          failedRuns: 0,
          recoveredRuns: isMutate ? 1 : 0,
          lastVerified: 'Just now',
          averageExecutionSec: 22,
          steps: [
            { id: 'ns1', stepNumber: 1, action: 'open_url', targetSelector: 'body', description: 'Open portal entry URL', status: 'success' },
            { id: 'ns2', stepNumber: 2, action: 'type', targetSelector: 'input[name="q"]', value: 'CSE Engineering', description: 'Enter query keywords', status: 'success' },
            { id: 'ns3', stepNumber: 3, action: 'select', targetSelector: '#location-filter', value: 'Bangalore', description: 'Set city filter', status: 'success' },
            { id: 'ns4', stepNumber: 4, action: 'extract', targetSelector: '.listing-item', description: 'Extract verified listings', status: 'success' }
          ]
        };
        setLearnedWorkflows(prev => [newWf, ...prev]);
        setActiveNewlyLearnedWf(newWf);
        addLog('workflow', '🧠 NEW WORKFLOW LEARNED & SAVED', 'Stored to persistent local index for instant zero-shot reuse.');
        voice.playChime('success');
        await delay(1200);
      }
      setCurrentPlan(p => p.map((st, i) => i === 6 ? { ...st, status: 'completed' } : st));

      // Done
      setAgentStatus('completed');
      voice.playChime('success');
      triggerConfetti();
      addLog('success', '✓ Mission Complete: 5 high-match verified opportunities ready for review.');

      // Update metrics
      setMetrics(m => ({
        ...m,
        workflowsLearned: m.workflowsLearned + (shouldReuse ? 0 : 1),
        workflowsReused: m.workflowsReused + (shouldReuse ? 1 : 0),
        totalOpportunitiesDiscovered: m.totalOpportunitiesDiscovered + 3
      }));

    } catch (err: any) {
      setAgentStatus('error');
      voice.playChime('alert');
      addLog('warn', `Task halted with error: ${err.message || err}`);
    } finally {
      isExecutingRef.current = false;
    }
  };

  const cancelAgentTask = () => {
    isExecutingRef.current = false;
    setAgentStatus('idle');
    voice.stopSpeaking();
    addLog('warn', 'Agent task cancelled by user.');
  };

  const triggerChaosTest = async (scenarioId: string) => {
    const sc = chaosScenarios.find(s => s.id === scenarioId);
    if (!sc) return;

    setChaosScenarios(prev => prev.map(s => s.id === scenarioId ? { ...s, status: 'running' } : s));
    addLog('network', `🧪 Running Chaos Test: ${sc.name}`);
    voice.playChime('start');

    await new Promise(r => setTimeout(r, 1200));

    if (sc.id === 'sc-2') {
      setIsMutatedDom(true);
      await executeAgentTask('Find CSE internships in Bangalore', { forceMutate: true });
      setChaosScenarios(prev => prev.map(s => s.id === scenarioId ? { ...s, status: 'healed' } : s));
    } else if (sc.id === 'sc-4') {
      setHasPopupOverlay(true);
      await new Promise(r => setTimeout(r, 1000));
      setHasPopupOverlay(false);
      addLog('recovery', 'Dismissed blocking modal popup and restored DOM interaction stream.');
      setChaosScenarios(prev => prev.map(s => s.id === scenarioId ? { ...s, status: 'healed' } : s));
    } else {
      setChaosScenarios(prev => prev.map(s => s.id === scenarioId ? { ...s, status: 'passed' } : s));
      voice.playChime('success');
    }
  };

  const relearnWorkflow = async (workflowId: string) => {
    const wf = learnedWorkflows.find(w => w.id === workflowId);
    if (!wf) return;
    addLog('workflow', `Relearning workflow "${wf.workflowName}" with fresh DOM tree crawl...`);
    voice.playChime('start');
    await new Promise(r => setTimeout(r, 1500));
    setLearnedWorkflows(prev => prev.map(w => w.id === workflowId ? {
      ...w,
      healthStatus: 'HEALTHY',
      reliability: 98,
      lastVerified: 'Just now',
      successfulRuns: w.successfulRuns + 1
    } : w));
    voice.playChime('success');
    addLog('success', `✓ Workflow "${wf.workflowName}" refreshed with 98% reliability score.`);
  };

  const deleteWorkflow = (workflowId: string) => {
    setLearnedWorkflows(prev => prev.filter(w => w.id !== workflowId));
    addLog('warn', `Workflow ${workflowId} deleted from cache.`);
  };

  const updateUserDNA = (dna: Partial<UserCareerDNA>) => {
    setUserDNA(prev => ({ ...prev, ...dna }));
    addLog('ai', 'User Career DNA updated and synced to local opportunity memory.');
  };

  const updateDocument = (docId: string, updates: Partial<UserDocument>) => {
    setUserDocuments(prev => prev.map(d => d.id === docId ? { ...d, ...updates } : d));
    voice.playChime('success');
  };

  const approveApplication = (oppId: string) => {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return;
    voice.playChime('success');
    triggerConfetti();
    addLog('gate', `🛑 HUMAN SIGN-OFF GRANTED for "${opp.title}" at ${opp.organization}.`);
    setNotifications(prev => [
      {
        id: `app-${Date.now()}`,
        type: 'opportunity',
        title: '🚀 Application Submitted Successfully',
        message: `Your verified packet was transmitted to ${opp.organization}. Tracking ID: FP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: 'Just now',
        read: false,
        actionTab: 'copilot'
      },
      ...prev
    ]);
  };

  const toggleHumanTakeover = () => {
    setIsHumanTakeover(prev => {
      const next = !prev;
      if (next) {
        voice.playChime('alert');
        addLog('gate', '🖐 HUMAN TAKEOVER ACTIVATED: Agent paused. Direct user control enabled.');
      } else {
        voice.playChime('start');
        addLog('ai', '▶ AGENT RESUMED: Returning control to autonomous execution engine.');
      }
      return next;
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const clearMemory = () => {
    setUserDNA({ ...INITIAL_USER_DNA, skills: [], preferredLocations: [] });
    addLog('warn', 'Personal Opportunity Memory wiped clean.');
    voice.playChime('click');
  };

  const resetToDefaults = () => {
    setUserDNA(INITIAL_USER_DNA);
    setUserDocuments(INITIAL_DOCUMENTS);
    setLearnedWorkflows(INITIAL_LEARNED_WORKFLOWS);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setChaosScenarios(CHAOS_SCENARIOS);
    setMetrics(INITIAL_METRICS);
    setActionLogs([]);
    voice.playChime('success');
  };

  // Hackathon 13-Scene Winning Demo Runner
  const playDemoScene = useCallback((sceneIndex: number) => {
    const scene = DEMO_SCENES[sceneIndex - 1];
    if (!scene) {
      setIsDemoRunning(false);
      triggerConfetti();
      return;
    }

    setCurrentDemoScene(sceneIndex);
    if (scene.highlightTab) {
      setActiveTab(scene.highlightTab as NavTab);
    }
    if (scene.browserUrl) {
      setBrowserUrl(scene.browserUrl);
    }

    // Voice narration
    if (scene.voiceText) {
      voice.speak(scene.voiceText.text, scene.voiceText.lang);
    }

    addLog('ai', `🎬 [DEMO SCENE ${sceneIndex}/13] ${scene.title}: ${scene.subtitle}`);

    // Scene specific effects
    if (sceneIndex === 1) {
      setCurrentQuery('Find CSE internships in Bangalore with stipend above ₹10,000.');
    } else if (sceneIndex === 5) {
      setAgentStatus('learning');
    } else if (sceneIndex === 6) {
      setAgentStatus('reused');
      setActiveReusedWorkflowId('wf-tech-internships-blr');
    } else if (sceneIndex === 7) {
      setIsMutatedDom(true);
    } else if (sceneIndex === 8) {
      setIsMutatedDom(false);
      setActiveRecoveryLog('Recovered button:has-text("Start Application") | Confidence: 94%');
      voice.playChime('heal');
    } else if (sceneIndex === 10) {
      setSelectedLanguage('kn');
      setCurrentQuery('ನನಗೆ ಎಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಹುಡುಕಿ.');
    } else if (sceneIndex === 13) {
      setAgentStatus('completed');
      triggerConfetti();
    }

    // Schedule next scene
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    demoTimerRef.current = setTimeout(() => {
      if (sceneIndex < DEMO_SCENES.length) {
        playDemoScene(sceneIndex + 1);
      } else {
        setIsDemoRunning(false);
        voice.speak('Hackathon demo sequence completed successfully.', 'en');
      }
    }, scene.durationMs);
  }, [addLog, voice]);

  const startHackathonDemo = () => {
    setIsDemoRunning(true);
    playDemoScene(1);
  };

  const stopHackathonDemo = () => {
    setIsDemoRunning(false);
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    voice.stopSpeaking();
    addLog('warn', 'Hackathon Demo sequence stopped.');
  };

  const jumpToDemoScene = (sceneNum: number) => {
    setIsDemoRunning(true);
    playDemoScene(sceneNum);
  };

  const nextDemoScene = () => {
    if (currentDemoScene < DEMO_SCENES.length) {
      playDemoScene(currentDemoScene + 1);
    }
  };

  const prevDemoScene = () => {
    if (currentDemoScene > 1) {
      playDemoScene(currentDemoScene - 1);
    }
  };

  useEffect(() => {
    return () => {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    };
  }, []);

  return (
    <AgentContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedLanguage,
        setSelectedLanguage,
        currentQuery,
        setCurrentQuery,
        agentStatus,
        currentPlan,
        actionLogs,
        learnedWorkflows,
        opportunities,
        userDNA,
        userDocuments,
        chaosScenarios,
        metrics,
        notifications,
        browserUrl,
        setBrowserUrl,
        isMutatedDom,
        setIsMutatedDom,
        hasPopupOverlay,
        setHasPopupOverlay,
        activeElementSelector,
        cursorPos,
        isHumanTakeover,
        toggleHumanTakeover,
        activeRecoveryLog,
        activeReusedWorkflowId,
        activeNewlyLearnedWf,
        executeAgentTask,
        cancelAgentTask,
        triggerChaosTest,
        relearnWorkflow,
        deleteWorkflow,
        updateUserDNA,
        updateDocument,
        approveApplication,
        dismissNotification,
        clearNotifications,
        clearMemory,
        resetToDefaults,
        isDemoRunning,
        currentDemoScene,
        startHackathonDemo,
        stopHackathonDemo,
        jumpToDemoScene,
        nextDemoScene,
        prevDemoScene
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
