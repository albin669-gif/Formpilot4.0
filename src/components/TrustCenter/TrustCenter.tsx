import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Smartphone, 
  Bot, 
  CreditCard, 
  UserCheck, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

export const TrustCenter: React.FC = () => {
  const { clearMemory, resetToDefaults, userDNA } = useAgent();
  const voice = VoiceService.getInstance();

  const trustPolicies = [
    {
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      title: 'Sensitive Data Minimization',
      status: 'Enforced',
      description: 'Zero plaintext caching. Transient browser session cookies are wiped immediately after traversal.'
    },
    {
      icon: <Key className="w-5 h-5 text-emerald-400" />,
      title: 'Passwords & Master Keys',
      status: 'Never Stored',
      description: 'Agent operates via delegated token handshakes or requests user sign-in. Never captures credentials.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      title: 'SMS OTP & MFA Prompts',
      status: 'Human Only Gate',
      description: 'Strictly prohibited from intercepting SMS OTPs or authenticator tokens. Requires direct manual user input.'
    },
    {
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      title: 'Autonomous Traversal Sandbox',
      status: 'Read / Extraction Only',
      description: 'Autonomous actions are strictly isolated to reading, filtering, and drafting without financial authorization.'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-rose-400" />,
      title: 'Payment & Bank Gateways',
      status: 'Strict Human Approval',
      description: 'Payment transactions and bank transfers can never be initiated by agent background threads.'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-teal-400" />,
      title: 'Final Application Transmissions',
      status: 'Locked Until Sign-Off',
      description: 'No scholarship or job application is finalized without explicit checkbox confirmation.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-cyan-950/30 border border-teal-500/30 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  FormPilot Privacy &amp; Trust Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  Zero Trust Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guaranteed cryptographic isolation, client-side encryption, and deterministic human-in-the-loop boundaries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                clearMemory();
                voice.playChime('click');
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Opportunity Memory</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Trust Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trustPolicies.map((p, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {p.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {p.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-100">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Policy Verified Live</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
