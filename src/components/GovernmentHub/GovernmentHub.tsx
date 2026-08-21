import React, { useState } from 'react';
import { 
  Flame, 
  GraduationCap, 
  Coins, 
  BookOpen, 
  Briefcase, 
  HeartHandshake, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Play,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

interface GovtScheme {
  id: string;
  name: string;
  department: string;
  portal: string;
  category: 'scholarship' | 'financial' | 'education' | 'employment' | 'welfare' | 'student';
  benefitAmount: string;
  eligibility: string[];
  documentsNeeded: string[];
  deadline: string;
  matchPercentage: number;
  portalUrl: string;
  isOfficial: boolean;
}

const GOVT_SCHEMES: GovtScheme[] = [
  {
    id: 'gov-1',
    name: 'Post-Matric Scholarship Scheme for Minorities & OBC (SSP Karnataka)',
    department: 'Social Welfare Dept, Govt of Karnataka',
    portal: 'State Scholarship Portal (ssp.karnataka.gov.in)',
    category: 'scholarship',
    benefitAmount: '₹ 50,000 / year + Full Fee Reimbursement',
    eligibility: ['Karnataka Domicile', 'Enrolled in B.Tech/Technical program', 'Family Income < ₹2.5 Lakh/yr', 'Min 60% in PUC / 12th'],
    documentsNeeded: ['Aadhaar', 'College Student ID', 'Income Certificate', 'Bank Passbook'],
    deadline: '15 September 2026',
    matchPercentage: 98,
    portalUrl: 'https://ssp.karnataka.gov.in',
    isOfficial: true
  },
  {
    id: 'gov-2',
    name: 'AICTE Pragati & Saksham Technical Degree Scholarship',
    department: 'Ministry of Education & AICTE, Govt of India',
    portal: 'National Scholarship Portal (scholarships.gov.in)',
    category: 'student',
    benefitAmount: '₹ 50,000 / annum (for all 4 years)',
    eligibility: ['Technical Degree Student (AICTE Approved)', 'Admitted through Central/State Counseling', 'Family Income < ₹8 Lakh'],
    documentsNeeded: ['Admission Proof', 'Aadhaar Card', 'College Bonafide', 'Bank Account Details'],
    deadline: '31 October 2026',
    matchPercentage: 95,
    portalUrl: 'https://scholarships.gov.in',
    isOfficial: true
  },
  {
    id: 'gov-3',
    name: 'Karnataka Yuva Nidhi Scheme (Unemployment & Skill Allowance)',
    department: 'Dept of Skill Development, Govt of Karnataka',
    portal: 'Seva Sindhu Portal (sevasindhu.karnataka.gov.in)',
    category: 'employment',
    benefitAmount: '₹ 3,000 / month + Free AI/Tech Upskilling',
    eligibility: ['Karnataka Domicile Graduate / Final Year', 'Not enrolled in higher education during internship gaps'],
    documentsNeeded: ['Degree/Marks Card', 'Aadhaar', 'Seva Sindhu ID'],
    deadline: 'Open Throughout 2026',
    matchPercentage: 91,
    portalUrl: 'https://sevasindhu.karnataka.gov.in',
    isOfficial: true
  },
  {
    id: 'gov-4',
    name: 'DRDO & MeitY National Quantum & AI Research Fellowship',
    department: 'Defence R&D Organisation / MeitY',
    portal: 'RAC Recruitment Portal (rac.gov.in)',
    category: 'education',
    benefitAmount: '₹ 37,000 / month + HRA + Contingency Grant',
    eligibility: ['B.Tech CSE/ECE with > 8.0 CGPA', 'GATE / National Qualifying Score or Campus Selection'],
    documentsNeeded: ['Curriculum Vitae', 'College NOC', 'Photo ID', 'GATE Scorecard'],
    deadline: '31 August 2026',
    matchPercentage: 89,
    portalUrl: 'https://rac.gov.in',
    isOfficial: true
  },
  {
    id: 'gov-5',
    name: 'PM Vidyalaxmi Scheme (Zero Collateral Education Financing)',
    department: 'Ministry of Finance & IBA',
    portal: 'Vidya Lakshmi Portal (vidyalakshmi.co.in)',
    category: 'financial',
    benefitAmount: 'Up to ₹ 10,00,000 at 0% Interest Subvention',
    eligibility: ['Admitted in NIRF Top 100 Institute', 'All Engineering & STEM streams'],
    documentsNeeded: ['Fee Structure', 'Admission Letter', 'PAN Card', 'Bank Statement'],
    deadline: 'Rolling 2026',
    matchPercentage: 94,
    portalUrl: 'https://vidyalakshmi.co.in',
    isOfficial: true
  }
];

export const GovernmentHub: React.FC = () => {
  const { userDNA, setActiveTab, executeAgentTask } = useAgent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const voice = VoiceService.getInstance();

  const categories = [
    { id: 'all', label: 'All Schemes', icon: <Flame className="w-4 h-4" /> },
    { id: 'scholarship', label: '🎓 Scholarships', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'student', label: '🧑‍🎓 Student Schemes', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'financial', label: '💰 Financial & DBT', icon: <Coins className="w-4 h-4" /> },
    { id: 'employment', label: '💼 Employment & Stipends', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: '📚 Research Fellowships', icon: <Building2 className="w-4 h-4" /> },
  ];

  const filtered = selectedCategory === 'all' 
    ? GOVT_SCHEMES 
    : GOVT_SCHEMES.filter(s => s.category === selectedCategory);

  const handleApplyThroughAgent = (scheme: GovtScheme) => {
    voice.playChime('start');
    executeAgentTask(`Apply for government scheme ${scheme.name} on ${scheme.portal}`);
    setActiveTab('copilot');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/30 border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Indian Government Services &amp; Citizen Welfare Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  myScheme &amp; NSP Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct integration with Central &amp; Karnataka State DBT Portals. FormPilot automatically matches your demographic profile.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <span className="text-slate-400">Profile: </span>
              <strong className="text-amber-400">{userDNA.residenceState} Domicile · {userDNA.category}</strong>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(scheme => (
          <div
            key={scheme.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                  {scheme.department}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {scheme.matchPercentage}% Match
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-100 leading-snug">
                {scheme.name}
              </h3>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Benefit / Grant</div>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{scheme.benefitAmount}</div>
              </div>

              {/* Eligibility Checklist */}
              <div className="space-y-1 text-xs">
                <div className="text-[11px] font-bold text-slate-300">Eligibility Criteria:</div>
                <div className="space-y-1">
                  {scheme.eligibility.map((e, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents needed */}
              <div className="pt-1 flex items-center gap-1 text-[11px] text-slate-400 flex-wrap">
                <span className="font-semibold text-slate-300">Required:</span>
                {scheme.documentsNeeded.map(d => (
                  <span key={d} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-slate-400">Deadline</div>
                <div className="font-semibold text-amber-400">{scheme.deadline}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApplyThroughAgent(scheme)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md transition-all"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Prepare Application</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
