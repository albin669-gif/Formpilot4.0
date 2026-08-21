export type LanguageCode = 'en' | 'hi' | 'kn' | 'ml' | 'ta' | 'te';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  speechCode: string;
  placeholder: string;
}

export interface UserCareerDNA {
  name: string;
  email: string;
  phone: string;
  degree: string;
  branch: string;
  year: string;
  cgpa: string;
  college: string;
  location: string;
  preferredLocations: string[];
  skills: string[];
  interests: string[];
  minStipend: number;
  openToRemote: boolean;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  annualFamilyIncome: string;
  residenceState: string;
  gender: string;
}

export interface UserDocument {
  id: string;
  name: string;
  category: 'identity' | 'academic' | 'income' | 'resume' | 'bank';
  status: 'verified' | 'missing' | 'expired' | 'optional';
  fileName?: string;
  fileSize?: string;
  lastUpdated?: string;
  issuer?: string;
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  action: 'open_url' | 'click' | 'type' | 'select' | 'extract' | 'wait' | 'verify';
  targetSelector: string;
  fallbackSelectors?: string[];
  description: string;
  value?: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'recovered';
  recoveryNote?: string;
}

export interface LearnedWorkflow {
  id: string;
  portalName: string;
  portalCategory: 'Internships' | 'Scholarships' | 'Government' | 'Jobs' | 'Hackathons';
  targetUrl: string;
  workflowName: string;
  description: string;
  steps: WorkflowStep[];
  reliability: number; // 0-100%
  healthStatus: 'HEALTHY' | 'DEGRADED' | 'BROKEN';
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  recoveredRuns: number;
  lastVerified: string;
  averageExecutionSec: number;
  isCustom?: boolean;
}

export interface OpportunityMatchBreakdown {
  degree: boolean;
  branch: boolean;
  year: boolean;
  location: boolean;
  skills: boolean;
  stipend: boolean;
  experience: 'ok' | 'warning' | 'none';
}

export interface OpportunityScore {
  overall: number; // 0-100
  eligibility: number;
  skillMatch: number;
  location: number;
  stipend: number;
  deadlineScore: number;
  competition: number;
}

export interface OpportunitySource {
  name: string;
  url: string;
  type: 'official' | 'aggregator' | 'government' | 'university';
  isOfficial: boolean;
  lastChecked: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: 'internship' | 'scholarship' | 'government' | 'job' | 'hackathon';
  location: string;
  isRemote: boolean;
  stipendOrAmount: string;
  numericValue: number;
  deadline: string;
  verified: boolean;
  verifiedSource: string;
  lastCheckedTime: string;
  sources: OpportunitySource[];
  duplicateCount: number;
  tags: string[];
  summary: string;
  whyRecommended: string[];
  eligibilityBreakdown: OpportunityMatchBreakdown;
  score: OpportunityScore;
  requiredDocuments: string[];
  applicationUrl: string;
  portalName: string;
  applicationQuestions?: {
    id: string;
    question: string;
    aiAnswer: string;
    approved: boolean;
  }[];
}

export interface AgentActionLog {
  id: string;
  timestamp: string;
  timeOffsetMs: number;
  iconType: 'network' | 'search' | 'dom' | 'mouse' | 'keyboard' | 'ai' | 'workflow' | 'recovery' | 'gate' | 'success' | 'warn';
  message: string;
  details?: string;
  highlightSelector?: string;
  screenshotSnippet?: string;
}

export interface AgentPlanStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedSeconds: number;
}

export interface ChaosScenario {
  id: string;
  name: string;
  description: string;
  expectedBehavior: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'idle' | 'running' | 'passed' | 'failed' | 'healed';
  reliabilityScore: number;
  healingLog?: string;
}

export interface AgentMetrics {
  overallHealthScore: number;
  successRate: number;
  recoveryRate: number;
  avgExecutionSeconds: number;
  workflowsLearned: number;
  workflowsReused: number;
  totalOpportunitiesDiscovered: number;
  verifiedSourcesCount: number;
}

export interface DemoScene {
  id: number;
  title: string;
  subtitle: string;
  voiceText?: {
    lang: LanguageCode;
    text: string;
    speaker: 'user' | 'agent';
  };
  durationMs: number;
  highlightTab?: string;
  browserUrl?: string;
  browserDomState?: string;
  actionSummary: string;
}
