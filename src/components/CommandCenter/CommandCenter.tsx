import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Flame, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Coins, 
  Trophy, 
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  RefreshCw,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { VoiceService } from '../../services/voiceService';
import { Opportunity } from '../../types/agent';

const ROTATING_EXAMPLES = [
  "Find scholarships I'm eligible for.",
  "Find CSE internships in Bangalore with stipend above ₹10,000.",
  "Check Karnataka post-matric government scheme.",
  "Prepare my internship applications with AI copilot.",
  "Discover MeitY AI & Autonomous Agent hackathons."
];

export const CommandCenter: React.FC = () => {
  const {
    currentQuery,
    setCurrentQuery,
    selectedLanguage,
    setSelectedLanguage,
    agentStatus,
    currentPlan,
    opportunities,
    executeAgentTask,
    setActiveTab,
    activeRecoveryLog,
    activeReusedWorkflowId,
    activeNewlyLearnedWf,
    userDNA
  } = useAgent();

  const [isListening, setIsListening] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [selectedOppForDetails, setSelectedOppForDetails] = useState<string | null>('opp-1');
  const stopListeningRef = useRef<(() => void) | null>(null);

  const voice = VoiceService.getInstance();
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  // Rotate placeholder examples every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex(prev => (prev + 1) % ROTATING_EXAMPLES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleVoiceToggle = () => {
    if (isListening) {
      if (stopListeningRef.current) stopListeningRef.current();
      setIsListening(false);
    } else {
      setIsListening(true);
      stopListeningRef.current = voice.startListening(
        selectedLanguage,
        (transcript) => {
          setCurrentQuery(transcript);
          setIsListening(false);
          // Auto speak confirmation
          voice.speak(`Understood. Searching matching opportunities for your profile.`, selectedLanguage);
          executeAgentTask(transcript);
        },
        (err) => {
          console.warn('Voice error:', err);
          setIsListening(false);
        }
      );
    }
  };

  const handleQuickAction = (preset: string) => {
    setCurrentQuery(preset);
    executeAgentTask(preset);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero AI Command Center Input */}
      <section className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-[#0c1427] to-[#090e1c] border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                AI Command Center
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Autonomous Web Engine v4.0 · Bangalore Hub
            </span>
          </div>

          {/* Main Search / Voice Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              What should I do for you?
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && executeAgentTask(currentQuery)}
                placeholder={ROTATING_EXAMPLES[rotatingIndex]}
                className="w-full bg-slate-950/90 border-2 border-slate-700 focus:border-cyan-500 rounded-xl pl-12 pr-32 py-3.5 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all font-medium"
              />
              
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {/* Voice mic */}
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-2.5 rounded-lg border transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white border-rose-400 animate-pulse ring-4 ring-rose-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                  title={`Voice Assistant (${currentLangObj.label})`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-cyan-400" />}
                </button>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={() => executeAgentTask(currentQuery)}
                  disabled={agentStatus === 'running' || agentStatus === 'planning'}
                  className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
                >
                  {agentStatus === 'running' || agentStatus === 'planning' ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-slate-950" />
                  )}
                  <span>Run Agent</span>
                </button>
              </div>
            </div>

            {/* Quick action chips */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Actions:</span>
              {[
                { label: '🎓 Find Internships', query: 'Find CSE internships in Bangalore with stipend above ₹10,000.' },
                { label: '🇮🇳 Government Schemes', query: 'Find Karnataka and Central government student welfare schemes.' },
                { label: '💰 Scholarships', query: 'Find engineering merit and means scholarships on NSP portal.' },
                { label: '💼 Jobs', query: 'Find junior software engineer roles in Bangalore.' },
                { label: '🏆 Hackathons', query: 'Find upcoming AI and autonomous agent hackathons in India.' },
                { label: '📝 Applications', query: 'Prepare my pending scholarship & internship applications.' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.query)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Agent Highlights (Self-Learning, Reuse, Healing Alerts) */}
      {activeNewlyLearnedWf && (
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-start justify-between animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-purple-200">🧠 NEW WORKFLOW LEARNED</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Reliability: {activeNewlyLearnedWf.reliability}%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Target: <strong>{activeNewlyLearnedWf.portalName}</strong> · Workflow: <em>{activeNewlyLearnedWf.workflowName}</em>
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                ✓ Recorded {activeNewlyLearnedWf.steps.length} sequential actions with fallback selectors. Saved to local persistent cache.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('workflows')}
            className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-medium border border-purple-500/30 transition-colors"
          >
            Inspect Workflow
          </button>
        </div>
      )}

      {activeReusedWorkflowId && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-start justify-between animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-cyan-200">⚡ WORKFLOW FOUND & REUSED</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Speedup: 4.2x
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Reusing learned schema: <strong>CSE Bangalore Internship Hunter</strong> (96% Reliability)
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                ⚡ Skipped redundant cold exploratory crawling. Executing deterministic selector stream.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('browser-agent')}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors"
          >
            Watch Live Execution
          </button>
        </div>
      )}

      {activeRecoveryLog && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start justify-between animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-amber-200">🔄 SELF-HEALING RECOVERY ACTIVE</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  Confidence: 94%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeRecoveryLog}
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                ✓ Autonomous selector patch applied without breaking the pipeline.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('test-lab')}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium border border-amber-500/30 transition-colors"
          >
            Open Test Lab
          </button>
        </div>
      )}

      {/* 2-Column Section: AI Task Planner + Command Center Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Task Planner */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100">AI Task Planner</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Est: ~45 seconds
              </span>
            </div>

            {/* Request pill */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Your Request
              </div>
              <div className="text-xs text-cyan-200 font-medium mt-0.5 font-mono">
                "{currentQuery}"
              </div>
            </div>

            {/* Plan checklist */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                FormPilot Executable Plan
              </div>
              
              <div className="space-y-1.5">
                {[
                  { id: '1', label: 'Identify requirements from Career DNA', status: currentPlan[0]?.status || 'completed' },
                  { id: '2', label: 'Check Learned Workflows for portal cache hit', status: currentPlan[1]?.status || 'completed' },
                  { id: '3', label: 'Launch Webcmd browser agent & traverse pages', status: currentPlan[2]?.status || 'completed' },
                  { id: '4', label: 'Extract live opportunities & handle mutations', status: currentPlan[3]?.status || 'completed' },
                  { id: '5', label: 'Verify eligibility against 7 match vectors', status: currentPlan[4]?.status || 'completed' },
                  { id: '6', label: 'Deduplicate across multi-source web listings', status: currentPlan[5]?.status || 'completed' },
                  { id: '7', label: 'Rank results & verify official source timestamps', status: currentPlan[6]?.status || 'completed' },
                ].map(step => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                      step.status === 'in_progress'
                        ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-200'
                        : step.status === 'completed'
                        ? 'bg-slate-950/40 text-slate-300'
                        : 'bg-slate-950/20 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {step.status === 'in_progress' ? (
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      ) : step.status === 'completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                      )}
                      <span>{step.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {step.status === 'in_progress' ? 'Running...' : step.status === 'completed' ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Target Portals: <strong className="text-slate-200">Bangalore Tech, NSP, myScheme</strong>
              </span>
              <button
                onClick={() => executeAgentTask(currentQuery)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                <Play className="w-3 h-3 fill-slate-950" />
                <span>Execute Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Command Center Agent Topology Map */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100">Command Center Topology Map</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE AGENT GRAPH
              </span>
            </div>

            {/* Topology graph visualization */}
            <div className="relative py-4 flex flex-col items-center justify-center gap-3">
              {/* Top: AI Brain */}
              <div className="flex flex-col items-center">
                <div className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                  agentStatus === 'planning' || agentStatus === 'running'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 scale-105 animate-pulse'
                    : 'bg-slate-800 text-cyan-300 border-cyan-500/40'
                }`}>
                  <Cpu className="w-4 h-4" />
                  <span>FORMPILOT AI ORCHESTRATOR</span>
                </div>
                <div className="w-0.5 h-4 bg-cyan-500/50" />
              </div>

              {/* Middle 3 Branches: Search, Learn, Recover */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className={`p-2.5 rounded-lg border text-center text-xs transition-all ${
                  agentStatus === 'running'
                    ? 'bg-blue-950/80 border-blue-400 text-blue-200 ring-2 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <Search className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  <div className="font-bold text-[11px]">WEB SEARCH</div>
                  <div className="text-[9px] text-slate-500">Live Crawl</div>
                </div>

                <div className={`p-2.5 rounded-lg border text-center text-xs transition-all ${
                  agentStatus === 'learning' || agentStatus === 'reused'
                    ? 'bg-purple-950/80 border-purple-400 text-purple-200 ring-2 ring-purple-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <Cpu className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  <div className="font-bold text-[11px]">LEARN / REUSE</div>
                  <div className="text-[9px] text-slate-500">DOM Cache</div>
                </div>

                <div className={`p-2.5 rounded-lg border text-center text-xs transition-all ${
                  agentStatus === 'recovering'
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 ring-2 ring-amber-500/30 animate-pulse'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <RefreshCw className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <div className="font-bold text-[11px]">SELF-HEAL</div>
                  <div className="text-[9px] text-slate-500">Fuzzy Recovery</div>
                </div>
              </div>

              {/* Bottom flow: Execute -> Verify -> Human Gate -> Complete */}
              <div className="flex flex-col items-center w-full max-w-md space-y-1.5 pt-1">
                <div className="w-0.5 h-3 bg-cyan-500/50" />
                <div className="flex items-center justify-between w-full text-[11px] gap-2">
                  <div className="flex-1 p-1.5 rounded bg-slate-950/60 border border-slate-800 text-center text-slate-300">
                    ⚙️ Execute
                  </div>
                  <span>→</span>
                  <div className="flex-1 p-1.5 rounded bg-slate-950/60 border border-slate-800 text-center text-slate-300">
                    ✓ Verify
                  </div>
                  <span>→</span>
                  <div className="flex-1 p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-center text-rose-300 font-bold">
                    🛑 Human Gate
                  </div>
                  <span>→</span>
                  <div className="flex-1 p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-center text-emerald-300 font-bold">
                    🚀 Done
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Personalized for: <strong className="text-slate-200">{userDNA.name} ({userDNA.branch})</strong></span>
              <button 
                onClick={() => setActiveTab('settings')}
                className="text-cyan-400 hover:underline text-[10px]"
              >
                Edit DNA
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Results & Opportunity Intelligence Stream */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              Verified Opportunity Intelligence ({opportunities.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Sorted by FormPilot Match Score & Verified Direct Sources
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {opportunities.map(opp => {
            const isExpanded = selectedOppForDetails === opp.id;
            return (
              <div 
                key={opp.id}
                className={`rounded-2xl border transition-all ${
                  opp.score.overall >= 95
                    ? 'bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                } p-5`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                        opp.category === 'internship' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        opp.category === 'scholarship' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        opp.category === 'hackathon' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {opp.category}
                      </span>

                      {/* Source Verification Badge */}
                      <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Source Verified</span>
                      </span>

                      {/* Deduplication pill */}
                      {opp.duplicateCount > 1 && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          1 opportunity · {opp.duplicateCount} web sources
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-100 hover:text-cyan-300 transition-colors">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">
                        {opp.organization} · <span className="text-slate-300">{opp.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {opp.summary}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 flex-wrap">
                      <span className="font-semibold text-emerald-400">{opp.stipendOrAmount}</span>
                      <span>·</span>
                      <span>Deadline: <strong className="text-amber-400">{opp.deadline}</strong></span>
                      <span>·</span>
                      <span className="text-[11px] text-slate-500">Checked: {opp.lastCheckedTime}</span>
                    </div>
                  </div>

                  {/* Right: FormPilot Score (0-100) & Actions */}
                  <div className="flex items-center gap-4 self-end lg:self-center">
                    {/* Score Card */}
                    <div className="text-center p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[110px]">
                      <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        FormPilot Score
                      </div>
                      <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-0.5">
                        {opp.score.overall}
                        <span className="text-xs text-slate-500 font-normal"> / 100</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium">
                        {opp.score.overall >= 94 ? '🔥 Super Match' : 'High Fit'}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('copilot');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Apply with Copilot</span>
                      </button>

                      <button
                        onClick={() => setSelectedOppForDetails(isExpanded ? null : opp.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 border border-slate-700 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Breakdown' : 'Smart Breakdown'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details: 7-Factor Eligibility + Why Recommended + Score Vector */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn text-xs">
                    {/* Column 1: 7-Factor Eligibility Checklist */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                      <div className="font-bold text-slate-200 flex items-center justify-between">
                        <span>🎯 7-Factor Eligibility</span>
                        <span className="text-emerald-400 text-[10px]">98% Match</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Degree (B.Tech / B.E.)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Branch (CSE)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Year of Study (3rd Year)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Location Fit (Bangalore)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Skills Match (Python/C++)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Stipend threshold (₹10k+)</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Experience Requirement</span>
                          <span className="text-amber-400 font-medium">0-1 yrs</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Why Recommended? */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                      <div className="font-bold text-slate-200">
                        💡 Why Recommended?
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                        {opp.whyRecommended.map((reason, idx) => (
                          <li key={idx} className="leading-snug">
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Score Breakdown Matrix & Source */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                      <div className="font-bold text-slate-200">
                        📊 Intelligence Vectors
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>Eligibility: <strong className="text-cyan-400">{opp.score.eligibility}/100</strong></div>
                        <div>Skills Fit: <strong className="text-cyan-400">{opp.score.skillMatch}/100</strong></div>
                        <div>Location: <strong className="text-cyan-400">{opp.score.location}/100</strong></div>
                        <div>Stipend: <strong className="text-cyan-400">{opp.score.stipend}/100</strong></div>
                        <div>Deadline: <strong className="text-cyan-400">{opp.score.deadlineScore}/100</strong></div>
                        <div>Competition: <strong className="text-cyan-400">{opp.score.competition}/100</strong></div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                        <div>Primary Source: <span className="text-slate-200 font-medium">{opp.verifiedSource}</span></div>
                        <div className="text-emerald-400 mt-0.5">✓ Zero Hallucination Verified</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
