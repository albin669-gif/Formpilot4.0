import { 
  LearnedWorkflow, 
  Opportunity, 
  UserCareerDNA, 
  UserDocument, 
  ChaosScenario, 
  AgentMetrics, 
  DemoScene,
  LanguageOption 
} from '../types/agent';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English (IN)',
    flag: '🇬🇧',
    speechCode: 'en-IN',
    placeholder: 'e.g. Find CSE internships in Bangalore with stipend above ₹10,000'
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
    speechCode: 'hi-IN',
    placeholder: 'उदा. बैंगलोर में ₹10,000 से अधिक वजीफे वाली CSE इंटर्नशिप खोजें'
  },
  {
    code: 'kn',
    label: 'Kannada',
    nativeLabel: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    speechCode: 'kn-IN',
    placeholder: 'ಉದಾ. ನನಗೆ ಎಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಮತ್ತು ಇಂಟರ್ನ್‌ಶಿಪ್ ಹುಡುಕಿ'
  },
  {
    code: 'ml',
    label: 'Malayalam',
    nativeLabel: 'മലയാളം',
    flag: '🇮🇳',
    speechCode: 'ml-IN',
    placeholder: 'ഉദാ. എനിക്ക് അനുയോജ്യമായ സ്കോളർഷിപ്പുകളും ജോലികളും കണ്ടെത്തുക'
  },
  {
    code: 'ta',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    flag: '🇮🇳',
    speechCode: 'ta-IN',
    placeholder: 'எ.கா. பெங்களூரில் ₹10,000-க்கு மேல் உதவித்தொகை கொண்ட இன்டர்ன்ஷிப்'
  },
  {
    code: 'te',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    flag: '🇮🇳',
    speechCode: 'te-IN',
    placeholder: 'ఉదా. ఇంజనీరింగ్ విద్యార్థుల కోసం స్కాలర్‌షిప్‌లు వెతకండి'
  }
];

export const INITIAL_USER_DNA: UserCareerDNA = {
  name: 'Albin Biju',
  email: 'albin.biju@student.college.edu',
  phone: '+91 98765 43210',
  degree: 'B.Tech / B.E.',
  branch: 'Computer Science & Engineering',
  year: '3rd Year (2026 Batch)',
  cgpa: '8.85 / 10.0',
  college: 'National Institute of Technology Karnataka',
  location: 'Bangalore, Karnataka',
  preferredLocations: ['Bangalore', 'Remote', 'Hyderabad', 'Mysore'],
  skills: ['Python', 'C++', 'React', 'TypeScript', 'Node.js', 'Machine Learning', 'SQL', 'FastAPI'],
  interests: ['Artificial Intelligence', 'Full-Stack Development', 'Autonomous Agents', 'Distributed Systems'],
  minStipend: 10000,
  openToRemote: true,
  category: 'OBC',
  annualFamilyIncome: '₹ 2,40,000 / annum',
  residenceState: 'Karnataka',
  gender: 'Male'
};

export const INITIAL_DOCUMENTS: UserDocument[] = [
  {
    id: 'doc-1',
    name: 'College Student ID Card',
    category: 'academic',
    status: 'verified',
    fileName: 'NITK_Student_ID_2026.pdf',
    fileSize: '1.2 MB',
    lastUpdated: '12 Aug 2026',
    issuer: 'NITK Registrar'
  },
  {
    id: 'doc-2',
    name: 'Aadhaar Identity Card',
    category: 'identity',
    status: 'verified',
    fileName: 'Aadhaar_UIDAI_Masked.pdf',
    fileSize: '840 KB',
    lastUpdated: '15 Jul 2026',
    issuer: 'UIDAI'
  },
  {
    id: 'doc-3',
    name: 'Bank Passbook / Cancelled Cheque',
    category: 'bank',
    status: 'verified',
    fileName: 'SBI_Passbook_Verified.pdf',
    fileSize: '1.8 MB',
    lastUpdated: '01 Aug 2026',
    issuer: 'State Bank of India'
  },
  {
    id: 'doc-4',
    name: 'Income Certificate (< ₹2.5L)',
    category: 'income',
    status: 'missing',
    fileName: undefined,
    lastUpdated: undefined,
    issuer: 'Tahsildar / Revenue Dept'
  },
  {
    id: 'doc-5',
    name: 'Verified Technical Resume (ATS-98)',
    category: 'resume',
    status: 'verified',
    fileName: 'Albin_Biju_CSE_Resume_v4.pdf',
    fileSize: '450 KB',
    lastUpdated: '20 Aug 2026',
    issuer: 'FormPilot ATS Engine'
  }
];

export const INITIAL_LEARNED_WORKFLOWS: LearnedWorkflow[] = [
  {
    id: 'wf-scholarship-nsp',
    portalName: 'National Scholarship Portal (NSP)',
    portalCategory: 'Scholarships',
    targetUrl: 'https://scholarships.gov.in/schemes',
    workflowName: 'Find Engineering Merit-cum-Means Scholarships',
    description: 'Autonomous multi-step traversal through state quotas, ministry filters, and merit threshold matrices.',
    reliability: 94,
    healthStatus: 'HEALTHY',
    totalRuns: 52,
    successfulRuns: 48,
    failedRuns: 2,
    recoveredRuns: 2,
    lastVerified: '2 hours ago',
    averageExecutionSec: 24,
    steps: [
      { id: 's1', stepNumber: 1, action: 'open_url', targetSelector: 'body', description: 'Open National Scholarship Portal', status: 'success' },
      { id: 's2', stepNumber: 2, action: 'click', targetSelector: '#nav-schemes-dropdown', fallbackSelectors: ['.menu-item[data-target="schemes"]', 'a:has-text("Schemes")'], description: 'Navigate to Higher Education Department', status: 'success' },
      { id: 's3', stepNumber: 3, action: 'select', targetSelector: 'select#state-filter', value: 'Karnataka', description: 'Filter by Domicile State: Karnataka', status: 'success' },
      { id: 's4', stepNumber: 4, action: 'type', targetSelector: 'input#search-keywords', value: 'Engineering Technical Degree', description: 'Enter keywords "Engineering Technical Degree"', status: 'success' },
      { id: 's5', stepNumber: 5, action: 'extract', targetSelector: '.scheme-card-item', description: 'Extract verified grant amounts, deadlines, and eligibility matrices', status: 'success' }
    ]
  },
  {
    id: 'wf-tech-internships-blr',
    portalName: 'Bangalore Tech Careers & Startup Hub',
    portalCategory: 'Internships',
    targetUrl: 'https://bangalore.techjobs.internal/internships',
    workflowName: 'CSE Bangalore Internship Hunter',
    description: 'Bypasses aggregators, handles dynamic JS pagination, filters stipend >= ₹10k, verifies direct employer contacts.',
    reliability: 96,
    healthStatus: 'HEALTHY',
    totalRuns: 68,
    successfulRuns: 64,
    failedRuns: 1,
    recoveredRuns: 3,
    lastVerified: '35 minutes ago',
    averageExecutionSec: 18,
    steps: [
      { id: 'i1', stepNumber: 1, action: 'open_url', targetSelector: 'body', description: 'Open Bangalore Tech Internship Portal', status: 'success' },
      { id: 'i2', stepNumber: 2, action: 'type', targetSelector: 'input[name="q"]', fallbackSelectors: ['#search-box', 'input.role-search'], value: 'Software Engineer Intern', description: 'Search "Software Engineer Intern"', status: 'success' },
      { id: 'i3', stepNumber: 3, action: 'click', targetSelector: 'button[data-filter="location-bangalore"]', description: 'Select Location: Bangalore / Hybrid', status: 'success' },
      { id: 'i4', stepNumber: 4, action: 'select', targetSelector: 'select#min-stipend', value: '10000', description: 'Set minimum stipend threshold ₹10,000/mo', status: 'success' },
      { id: 'i5', stepNumber: 5, action: 'extract', targetSelector: '.internship-listing-card', description: 'Extract job descriptions, tech stack, recruiter contact, and apply buttons', status: 'success' }
    ]
  },
  {
    id: 'wf-myscheme-gov',
    portalName: 'myScheme National Citizen Hub',
    portalCategory: 'Government',
    targetUrl: 'https://www.myscheme.gov.in/schemes',
    workflowName: 'Karnataka Student Financial Assistance Discovery',
    description: 'Navigates central + Karnataka state DBT (Direct Benefit Transfer) welfare schemes for STEM students.',
    reliability: 98,
    healthStatus: 'HEALTHY',
    totalRuns: 39,
    successfulRuns: 38,
    failedRuns: 0,
    recoveredRuns: 1,
    lastVerified: 'Today at 09:15 AM',
    averageExecutionSec: 29,
    steps: [
      { id: 'm1', stepNumber: 1, action: 'open_url', targetSelector: 'body', description: 'Open myScheme portal', status: 'success' },
      { id: 'm2', stepNumber: 2, action: 'click', targetSelector: 'button[data-cat="education"]', description: 'Select Category "Education & Learning"', status: 'success' },
      { id: 'm3', stepNumber: 3, action: 'click', targetSelector: 'input[value="Karnataka"]', description: 'Filter Karnataka State Schemes', status: 'success' },
      { id: 'm4', stepNumber: 4, action: 'extract', targetSelector: '.scheme-result-box', description: 'Parse eligibility criteria and direct apply portal links', status: 'success' }
    ]
  },
  {
    id: 'wf-drdo-isro',
    portalName: 'DRDO & ISRO Apprentice Portal',
    portalCategory: 'Government',
    targetUrl: 'https://rac.gov.in/fellowships',
    workflowName: 'Research Graduate Apprentice Discovery',
    description: 'Specialized workflow for Indian defense & space autonomous research labs.',
    reliability: 91,
    healthStatus: 'DEGRADED',
    totalRuns: 19,
    successfulRuns: 15,
    failedRuns: 2,
    recoveredRuns: 2,
    lastVerified: 'Yesterday',
    averageExecutionSec: 36,
    steps: [
      { id: 'd1', stepNumber: 1, action: 'open_url', targetSelector: 'body', description: 'Open Defense Research Apprentice Board', status: 'success' },
      { id: 'd2', stepNumber: 2, action: 'click', targetSelector: 'a.notice-board-link', description: 'Access Latest Recruitment Circulars', status: 'success' },
      { id: 'd3', stepNumber: 3, action: 'extract', targetSelector: 'table.announcement-table tr', description: 'Extract PDF notices, stipend charts, and cutoff branches', status: 'success' }
    ]
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'AI Systems & Backend Engineering Intern',
    organization: 'Zepto Labs Bangalore',
    category: 'internship',
    location: 'Koramangala, Bangalore (Hybrid)',
    isRemote: false,
    stipendOrAmount: '₹ 35,000 / month',
    numericValue: 35000,
    deadline: '31 August 2026',
    verified: true,
    verifiedSource: 'Zepto Careers Official Portal (HTTP 200 Live)',
    lastCheckedTime: '21 Aug 2026, 12:30 PM',
    duplicateCount: 4,
    tags: ['Python', 'FastAPI', 'Distributed Systems', 'PostgreSQL', 'High Match'],
    summary: 'Build high-throughput microservices for real-time inventory and delivery dispatch algorithms. Direct mentorship with staff engineers.',
    whyRecommended: [
      'Matches your B.Tech CSE 3rd Year profile perfectly',
      'Preferred location Bangalore matches your Career DNA (100% loc fit)',
      'Required skills (Python, Distributed Systems, SQL) match your verified GitHub projects',
      'Stipend (₹35k/mo) exceeds your minimum threshold of ₹10k by 3.5x'
    ],
    eligibilityBreakdown: {
      degree: true,
      branch: true,
      year: true,
      location: true,
      skills: true,
      stipend: true,
      experience: 'ok'
    },
    score: {
      overall: 96,
      eligibility: 98,
      skillMatch: 95,
      location: 100,
      stipend: 96,
      deadlineScore: 92,
      competition: 82
    },
    requiredDocuments: ['College Student ID Card', 'Verified Technical Resume (ATS-98)'],
    applicationUrl: 'https://careers.zepto.internal/apply/ai-backend-intern-blr',
    portalName: 'Zepto Engineering Careers',
    sources: [
      { name: 'Zepto Careers Portal', url: 'https://careers.zepto.internal/jobs/8912', type: 'official', isOfficial: true, lastChecked: '10 mins ago' },
      { name: 'LinkedIn India Job Feed', url: 'https://linkedin.com/jobs/view/zepto-backend', type: 'aggregator', isOfficial: false, lastChecked: '1 hour ago' },
      { name: 'Bangalore Tech Board', url: 'https://bangalore.tech/jobs/zepto', type: 'aggregator', isOfficial: false, lastChecked: '2 hours ago' },
      { name: 'FoundIt India', url: 'https://foundit.in/opp/zepto-intern', type: 'aggregator', isOfficial: false, lastChecked: '5 hours ago' }
    ],
    applicationQuestions: [
      {
        id: 'q1',
        question: 'Explain your experience with asynchronous Python (FastAPI/AsyncIO) or multi-threading.',
        aiAnswer: 'Developed an asynchronous microservice using FastAPI and Redis Pub/Sub for live order status fan-out, achieving sub-15ms p99 latency under 2,000 simulated concurrent requests.',
        approved: true
      },
      {
        id: 'q2',
        question: 'Are you available for a 6-month in-office / hybrid internship starting September 2026 in Bangalore?',
        aiAnswer: 'Yes, I am fully available for an in-person / hybrid 6-month commitment in Bangalore and have college NOC clearance.',
        approved: true
      },
      {
        id: 'q3',
        question: 'Share a link to your most technically challenging open-source project or repository.',
        aiAnswer: 'https://github.com/albinbiju/distributed-agent-runtime — A fault-tolerant task orchestration engine with live selector recovery.',
        approved: true
      }
    ]
  },
  {
    id: 'opp-2',
    title: 'Post-Matric Scholarship for Technical Higher Education',
    organization: 'Karnataka Social Welfare Department (SSP)',
    category: 'scholarship',
    location: 'Karnataka State (All Institutes)',
    isRemote: true,
    stipendOrAmount: '₹ 50,000 / year + Tuition Waiver',
    numericValue: 50000,
    deadline: '15 September 2026',
    verified: true,
    verifiedSource: 'State Scholarship Portal Karnataka (ssp.karnataka.gov.in)',
    lastCheckedTime: '21 Aug 2026, 11:15 AM',
    duplicateCount: 2,
    tags: ['Government DBT', 'Karnataka', 'OBC/EWS', 'Tuition Waiver', 'Verified Direct'],
    summary: 'Direct Benefit Transfer grant covering full annual college tuition fees and maintenance allowance for engineering undergraduates in Karnataka.',
    whyRecommended: [
      'Karnataka Domicile verified in your Career DNA profile',
      'Enrolled in recognized B.Tech program with CGPA 8.85 (well above 6.0 cutoff)',
      'Direct Bank Transfer verified against your linked State Bank of India account',
      'Missing only 1 document: Income Certificate to complete application'
    ],
    eligibilityBreakdown: {
      degree: true,
      branch: true,
      year: true,
      location: true,
      skills: true,
      stipend: true,
      experience: 'ok'
    },
    score: {
      overall: 94,
      eligibility: 98,
      skillMatch: 90,
      location: 100,
      stipend: 94,
      deadlineScore: 96,
      competition: 88
    },
    requiredDocuments: ['College Student ID Card', 'Aadhaar Identity Card', 'Bank Passbook / Cancelled Cheque', 'Income Certificate (< ₹2.5L)'],
    applicationUrl: 'https://ssp.karnataka.gov.in/application/tech-grant',
    portalName: 'Karnataka SSP Portal',
    sources: [
      { name: 'Karnataka SSP Portal', url: 'https://ssp.karnataka.gov.in', type: 'government', isOfficial: true, lastChecked: '1 hour ago' },
      { name: 'myScheme National Portal', url: 'https://myscheme.gov.in/schemes/karn-ssp', type: 'government', isOfficial: true, lastChecked: '3 hours ago' }
    ],
    applicationQuestions: [
      {
        id: 'sq1',
        question: 'Enter your 15-digit SSP Student Unified ID or College Enrollment Reg No.',
        aiAnswer: 'NITK2023CSE042 (Auto-populated from Verified College ID card)',
        approved: true
      },
      {
        id: 'sq2',
        question: 'Confirm whether you are receiving any other Central Government DBT fellowship simultaneously.',
        aiAnswer: 'No, I am not currently drawing any parallel central DBT scholarship for the academic year 2026-27.',
        approved: true
      }
    ]
  },
  {
    id: 'opp-3',
    title: 'Research & Development Intern — Edge AI & Robotics',
    organization: 'Bosch Global Software Technologies',
    category: 'internship',
    location: 'Adugodi, Bangalore',
    isRemote: false,
    stipendOrAmount: '₹ 28,000 / month',
    numericValue: 28000,
    deadline: '05 September 2026',
    verified: true,
    verifiedSource: 'Bosch India Official Campus Recruitment Portal',
    lastCheckedTime: '21 Aug 2026, 10:00 AM',
    duplicateCount: 3,
    tags: ['C++', 'Computer Vision', 'Embedded Linux', 'Bangalore', 'Verified'],
    summary: 'Develop optimized inference engines on ARM Cortex and Jetson micro-architectures for intelligent perception pipelines.',
    whyRecommended: [
      'Your verified C++ and Python technical profile matches core team requirements',
      'Prime location in Central Bangalore',
      'Clear path to Pre-Placement Offer (PPO) for 2026 batch'
    ],
    eligibilityBreakdown: {
      degree: true,
      branch: true,
      year: true,
      location: true,
      skills: true,
      stipend: true,
      experience: 'ok'
    },
    score: {
      overall: 91,
      eligibility: 95,
      skillMatch: 92,
      location: 98,
      stipend: 88,
      deadlineScore: 90,
      competition: 79
    },
    requiredDocuments: ['College Student ID Card', 'Verified Technical Resume (ATS-98)'],
    applicationUrl: 'https://careers.bosch.in/jobs/edge-ai-intern-blr',
    portalName: 'Bosch Careers Hub',
    sources: [
      { name: 'Bosch Smart Campus Portal', url: 'https://careers.bosch.in', type: 'official', isOfficial: true, lastChecked: '2 hours ago' },
      { name: 'Naukri.com Tech Feed', url: 'https://naukri.com/bosch-intern', type: 'aggregator', isOfficial: false, lastChecked: '4 hours ago' }
    ]
  },
  {
    id: 'opp-4',
    title: 'AI for India Autonomous Agent Hackathon 2026',
    organization: 'Ministry of Electronics & IT (MeitY) + NASSCOM',
    category: 'hackathon',
    location: 'IISc Bangalore & Online',
    isRemote: true,
    stipendOrAmount: '₹ 15,00,000 Prize Pool + Fast-Track Incubation',
    numericValue: 1500000,
    deadline: '28 August 2026',
    verified: true,
    verifiedSource: 'NASSCOM Open Innovation Portal',
    lastCheckedTime: '21 Aug 2026, 09:40 AM',
    duplicateCount: 2,
    tags: ['AI Agents', 'Open Innovation', 'Cash Prizes', 'Grand Finale', 'Verified'],
    summary: 'Build next-generation self-learning autonomous browser and citizen service agents for multilingual Indian demographics.',
    whyRecommended: [
      'Directly matches your project work on FormPilot autonomous browser agents',
      'Grand finale venue at IISc Bangalore with live VC & Gov jury panel'
    ],
    eligibilityBreakdown: {
      degree: true,
      branch: true,
      year: true,
      location: true,
      skills: true,
      stipend: true,
      experience: 'ok'
    },
    score: {
      overall: 98,
      eligibility: 100,
      skillMatch: 99,
      location: 100,
      stipend: 98,
      deadlineScore: 95,
      competition: 92
    },
    requiredDocuments: ['College Student ID Card', 'Verified Technical Resume (ATS-98)'],
    applicationUrl: 'https://hackathon.meity.gov.in/ai-agents-2026',
    portalName: 'MeitY Hackathon Portal',
    sources: [
      { name: 'MeitY Official Hackathon', url: 'https://hackathon.meity.gov.in', type: 'government', isOfficial: true, lastChecked: '30 mins ago' },
      { name: 'HackerEarth Innovation Challenge', url: 'https://hackerearth.com/challenges/meity-ai', type: 'aggregator', isOfficial: true, lastChecked: '1 hour ago' }
    ]
  },
  {
    id: 'opp-5',
    title: 'DRDO Center for AI & Robotics (CAIR) Junior Research Fellowship',
    organization: 'DRDO - Ministry of Defence',
    category: 'government',
    location: 'CV Raman Nagar, Bangalore',
    isRemote: false,
    stipendOrAmount: '₹ 37,000 / month + HRA',
    numericValue: 37000,
    deadline: '31 August 2026',
    verified: true,
    verifiedSource: 'DRDO RAC Recruitment Portal (rac.gov.in)',
    lastCheckedTime: '21 Aug 2026, 08:30 AM',
    duplicateCount: 1,
    tags: ['Government Research', 'Defence AI', 'CAIR Bangalore', 'Fellowship'],
    summary: 'Autonomous mission planning, natural language command interfaces, and multi-robot swarms for national defense technology.',
    whyRecommended: [
      'First-class B.Tech degree with valid GATE or National level test eligibility',
      'Premier defense laboratory in Bangalore with full stipend & research credit'
    ],
    eligibilityBreakdown: {
      degree: true,
      branch: true,
      year: true,
      location: true,
      skills: true,
      stipend: true,
      experience: 'warning'
    },
    score: {
      overall: 89,
      eligibility: 90,
      skillMatch: 92,
      location: 100,
      stipend: 95,
      deadlineScore: 88,
      competition: 74
    },
    requiredDocuments: ['College Student ID Card', 'Aadhaar Identity Card', 'Verified Technical Resume (ATS-98)'],
    applicationUrl: 'https://rac.gov.in/cair-fellowship-2026',
    portalName: 'DRDO RAC Board',
    sources: [
      { name: 'DRDO RAC Official', url: 'https://rac.gov.in', type: 'government', isOfficial: true, lastChecked: '4 hours ago' }
    ]
  }
];

export const CHAOS_SCENARIOS: ChaosScenario[] = [
  {
    id: 'sc-1',
    name: 'Normal Page Layout',
    description: 'Standard baseline execution with pristine static DOM selectors and no mutation.',
    expectedBehavior: 'Instant deterministic execution through cached selector pathway.',
    severity: 'low',
    status: 'passed',
    reliabilityScore: 99
  },
  {
    id: 'sc-2',
    name: 'Button Renamed & DOM Hierarchy Shifted',
    description: 'Target portal changed button from "Apply Now" (id="#btn-apply") to "Start Application" (class=".cta-begin-flow").',
    expectedBehavior: 'Self-Healing Engine detects selector mismatch, computes fuzzy semantic vector match (94% confidence), and re-routes click action automatically.',
    severity: 'high',
    status: 'healed',
    reliabilityScore: 94,
    healingLog: 'Recovered selector: button:has-text("Start Application") via Semantic Tree Embedding. Workflow patched & saved.'
  },
  {
    id: 'sc-3',
    name: 'Slow Latency & Network Jitter (3000ms delay)',
    description: 'Server returns sluggish dynamic content with skeleton loaders.',
    expectedBehavior: 'Adaptive wait policy activates exponential backoff polling without timing out.',
    severity: 'medium',
    status: 'passed',
    reliabilityScore: 96,
    healingLog: 'DOM mutation observer resolved target container at +2.4s without crashing.'
  },
  {
    id: 'sc-4',
    name: 'Modal Popup & Consent Overlay Obscuring View',
    description: 'A modal dialog or cookie banner obscures the interactive form inputs.',
    expectedBehavior: 'Agent identifies topmost modal z-index layer, locates dismiss/accept button, clears obstruction, and resumes main task.',
    severity: 'medium',
    status: 'healed',
    reliabilityScore: 92,
    healingLog: 'Dismissed overlay "#cookie-consent-modal > .btn-accept". Resumed step 3.'
  },
  {
    id: 'sc-5',
    name: 'Missing Non-Critical Form Field',
    description: 'Optional "Middle Name" or "Referral Code" field was deprecated by portal.',
    expectedBehavior: 'Gracefully marks step as optional, logs warning, and completes mandatory submissions.',
    severity: 'low',
    status: 'passed',
    reliabilityScore: 98
  },
  {
    id: 'sc-6',
    name: 'Session Expiration / Auth Challenge',
    description: 'Portal displays CAPTCHA or requires multi-factor SMS OTP.',
    expectedBehavior: '🛑 Pauses autonomous execution, triggers Human Takeover modal with audible alert, and resumes immediately after user signs in.',
    severity: 'critical',
    status: 'passed',
    reliabilityScore: 100,
    healingLog: 'Human Gate triggered. Safe handover completed with zero credential leak.'
  }
];

export const INITIAL_METRICS: AgentMetrics = {
  overallHealthScore: 96,
  successRate: 96.4,
  recoveryRate: 91.8,
  avgExecutionSeconds: 38,
  workflowsLearned: 14,
  workflowsReused: 47,
  totalOpportunitiesDiscovered: 128,
  verifiedSourcesCount: 116
};

export const DEMO_SCENES: DemoScene[] = [
  {
    id: 1,
    title: 'Scene 1: Natural Voice Command',
    subtitle: 'Voice Assistant receives spoken request in English',
    voiceText: {
      lang: 'en',
      speaker: 'user',
      text: 'Find CSE internships in Bangalore with stipend above ten thousand rupees.'
    },
    durationMs: 4500,
    highlightTab: 'command-center',
    actionSummary: 'User speaks intent. Speech-to-text decodes voice audio and creates an executable plan.'
  },
  {
    id: 2,
    title: 'Scene 2: Real Browser Agent Opens Portal',
    subtitle: 'Live Webcmd agent launches interactive browser sandbox',
    voiceText: {
      lang: 'en',
      speaker: 'agent',
      text: 'Launching autonomous browser session to scan verified Bangalore technical portals.'
    },
    durationMs: 4000,
    highlightTab: 'browser-agent',
    browserUrl: 'https://bangalore.techjobs.internal/internships',
    actionSummary: 'Browser loads Bangalore Tech Hub with live DOM tree and cursor interaction.'
  },
  {
    id: 3,
    title: 'Scene 3: Autonomous Exploration & Filtering',
    subtitle: 'Agent types search terms, selects Bangalore filter & stipend',
    durationMs: 4000,
    highlightTab: 'browser-agent',
    browserUrl: 'https://bangalore.techjobs.internal/internships?q=CSE&stipend=10000',
    actionSummary: 'Agent applies filters, parses DOM elements, and extracts opportunities.'
  },
  {
    id: 4,
    title: 'Scene 4: Smart Eligibility & Score Calculation',
    subtitle: '7-factor eligibility and FormPilot Score (96/100) generated',
    durationMs: 4000,
    highlightTab: 'command-center',
    actionSummary: 'Matches Career DNA against requirements with source verification timestamp.'
  },
  {
    id: 5,
    title: 'Scene 5: Self-Learning Workflow Synthesized',
    subtitle: 'Agent records navigation path into reusable schema',
    durationMs: 4000,
    highlightTab: 'workflows',
    actionSummary: 'Workflow "CSE Bangalore Internship Hunter" saved with 96% reliability score.'
  },
  {
    id: 6,
    title: 'Scene 6: Workflow Reuse Speedup',
    subtitle: 'Subsequent search reuses cached workflow in 4x faster execution',
    voiceText: {
      lang: 'en',
      speaker: 'agent',
      text: 'Cached workflow identified. Reusing learned path with 4x execution speedup.'
    },
    durationMs: 4000,
    highlightTab: 'workflows',
    actionSummary: '⚡ Workflow reused seamlessly. Skipping redundant exploration phase.'
  },
  {
    id: 7,
    title: 'Scene 7: Deliberate Portal DOM Mutation',
    subtitle: 'Website changes button from "Apply Now" to "Start Application"',
    durationMs: 4000,
    highlightTab: 'browser-agent',
    browserUrl: 'https://bangalore.techjobs.internal/portal/mutated',
    actionSummary: '⚠️ Selector mismatch triggered: #btn-apply not found on page.'
  },
  {
    id: 8,
    title: 'Scene 8: Self-Healing & Instant Recovery',
    subtitle: 'Semantic Vector Analysis recovers broken step with 94% confidence',
    voiceText: {
      lang: 'en',
      speaker: 'agent',
      text: 'Workflow change detected. Recovering alternative selector with 94% confidence.'
    },
    durationMs: 4500,
    highlightTab: 'browser-agent',
    actionSummary: '🔄 Recovered! Updated workflow definition without human intervention.'
  },
  {
    id: 9,
    title: 'Scene 9: Government Services Hub (myScheme & NSP)',
    subtitle: 'Direct Benefit Transfer discovery for Karnataka students',
    durationMs: 4000,
    highlightTab: 'government-hub',
    actionSummary: 'Scanned 120+ schemes, matched Post-Matric Tech Scholarship (₹50k/year).'
  },
  {
    id: 10,
    title: 'Scene 10: Multilingual Indian Voice Command',
    subtitle: 'Kannada Voice input: "ನನಗೆ ಎಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಹುಡುಕಿ"',
    voiceText: {
      lang: 'kn',
      speaker: 'user',
      text: 'ನನಗೆ ಎಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಹುಡುಕಿ.'
    },
    durationMs: 4500,
    highlightTab: 'command-center',
    actionSummary: 'Agent seamlessly understands regional voice input and executes matching query.'
  },
  {
    id: 11,
    title: 'Scene 11: Document Intelligence Readiness Check',
    subtitle: 'Readiness at 80% — Missing Income Certificate flagged',
    durationMs: 4000,
    highlightTab: 'copilot',
    actionSummary: 'Document scanner verifies 4 files, provides instant guidance on missing doc.'
  },
  {
    id: 12,
    title: 'Scene 12: AI Application Copilot & Smart Answers',
    subtitle: 'AI prepares responses for technical questions from user profile',
    durationMs: 4000,
    highlightTab: 'copilot',
    actionSummary: 'Autofills 3 complex technical responses for user review.'
  },
  {
    id: 13,
    title: 'Scene 13: Human Review Gate & Grand Summary',
    subtitle: '🛑 Strict Human Approval Gate ensures zero unauthorized submissions',
    voiceText: {
      lang: 'en',
      speaker: 'agent',
      text: 'FormPilot 4.0: Explore once. Learn the workflow. Reuse it reliably. Keep humans in control.'
    },
    durationMs: 5000,
    highlightTab: 'copilot',
    actionSummary: 'Final human sign-off completed. Full mission accomplished!'
  }
];
