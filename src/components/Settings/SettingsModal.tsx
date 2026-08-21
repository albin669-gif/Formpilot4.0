import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  Save, 
  RotateCcw, 
  Check, 
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Coins
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

export const SettingsModal: React.FC = () => {
  const { userDNA, updateUserDNA, resetToDefaults } = useAgent();
  const [formData, setFormData] = useState({ ...userDNA });
  const [autonomyLevel, setAutonomyLevel] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [recoveryConfidence, setRecoveryConfidence] = useState(90);
  const [maxRetries, setMaxRetries] = useState(3);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const voice = VoiceService.getInstance();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDNA(formData);
    setSavedSuccess(true);
    voice.playChime('success');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Settings &amp; Personal Career DNA
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  Personalization Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure agent autonomy, recovery thresholds, and your verified career profile parameters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetToDefaults();
                setFormData({ ...userDNA });
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Career DNA Profile */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100">"My Career DNA" Profile</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Used for 7-Factor Match</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Degree &amp; Program</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Branch / Specialization</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Graduation Year &amp; Batch</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Cumulative CGPA / Percentage</label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">College / Institute</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Residence State (for Govt DBT)</label>
                <input
                  type="text"
                  value={formData.residenceState}
                  onChange={(e) => setFormData({ ...formData, residenceState: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-medium">Key Verified Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-medium">Minimum Monthly Stipend Expectation (₹)</label>
                <input
                  type="number"
                  value={formData.minStipend}
                  onChange={(e) => setFormData({ ...formData, minStipend: parseInt(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Agent Autonomy & Policies */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100">Agent Autonomy Settings</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Safe Guardrails</span>
            </div>

            {/* Autonomy Level */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold">Autonomy Level</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'conservative', label: 'Conservative' },
                  { id: 'balanced', label: 'Balanced (Default)' },
                  { id: 'aggressive', label: 'Aggressive' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setAutonomyLevel(lvl.id as any)}
                    className={`p-2 rounded-lg border text-center font-medium transition-all ${
                      autonomyLevel === lvl.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recovery Confidence Slider */}
            <div className="space-y-1.5 text-xs pt-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Recovery Confidence Threshold</label>
                <span className="font-mono text-cyan-400 font-bold">{recoveryConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={recoveryConfidence}
                onChange={(e) => setRecoveryConfidence(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                Minimum semantic vector similarity before auto-patching changed DOM buttons.
              </div>
            </div>

            {/* Max Retries */}
            <div className="space-y-1.5 text-xs pt-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Max Recovery Retries</label>
                <span className="font-mono text-cyan-400 font-bold">{maxRetries} attempts</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={maxRetries}
                onChange={(e) => setMaxRetries(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Strict Human Gate Checkbox */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Human Review Gate Enforcement</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Always require manual confirmation for sensitive actions (payments, OTP, submission).
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{savedSuccess ? 'Changes Saved Successfully!' : 'Save Settings & Sync DNA'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
