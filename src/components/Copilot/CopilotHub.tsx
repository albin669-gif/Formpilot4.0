import React, { useState } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Upload, 
  FileText, 
  Lock, 
  Send, 
  Sparkles, 
  Check, 
  Edit3, 
  Eye, 
  UserCheck, 
  Info,
  Clock
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

export const CopilotHub: React.FC = () => {
  const {
    userDocuments,
    updateDocument,
    opportunities,
    approveApplication,
    userDNA
  } = useAgent();

  const [selectedOppId, setSelectedOppId] = useState<string>('opp-1');
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const [hasConfirmedHuman, setHasConfirmedHuman] = useState(false);
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>({});

  const voice = VoiceService.getInstance();
  const activeOpp = opportunities.find(o => o.id === selectedOppId) || opportunities[0];

  // Calculate readiness percentage
  const verifiedDocsCount = userDocuments.filter(d => d.status === 'verified').length;
  const totalDocsCount = userDocuments.length;
  const readinessPercent = Math.round((verifiedDocsCount / totalDocsCount) * 100);

  const missingDoc = userDocuments.find(d => d.status === 'missing');

  const handleUploadMissingDoc = (docId: string) => {
    updateDocument(docId, {
      status: 'verified',
      fileName: 'Income_Certificate_Verified_2026.pdf',
      fileSize: '620 KB',
      lastUpdated: 'Just now'
    });
    voice.playChime('success');
  };

  const handleSignOff = () => {
    approveApplication(activeOpp.id);
    setIsSignOffModalOpen(false);
    setHasConfirmedHuman(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30 border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Document Intelligence &amp; AI Application Copilot
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                  🛑 Human-in-the-Loop Gate
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Verifies official document packets, auto-drafts technical essay answers, and enforces human review before submission.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
              Readiness: <strong className="text-emerald-400">{readinessPercent}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Interface: Document Readiness Gauge + Application Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Document Intelligence */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100">Application Readiness</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {readinessPercent}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
              {missingDoc ? (
                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">You're missing 1 document: </span>
                    <span>{missingDoc.name}. Required for government DBT and state scholarships.</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All core documents 100% verified &amp; ready!</span>
                </div>
              )}
            </div>

            {/* Document Checklist */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verified Document Vault
              </div>
              <div className="space-y-2">
                {userDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      doc.status === 'verified'
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                        : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {doc.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-200">{doc.name}</div>
                        {doc.fileName ? (
                          <div className="text-[10px] text-slate-400 font-mono">
                            {doc.fileName} · {doc.fileSize}
                          </div>
                        ) : (
                          <div className="text-[10px] text-amber-400 font-medium">
                            Action required: upload to unlock 100%
                          </div>
                        )}
                      </div>
                    </div>

                    {doc.status === 'missing' ? (
                      <button
                        onClick={() => handleUploadMissingDoc(doc.id)}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">
                        Verified
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Application Copilot & Human Sign-Off Gate */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            {/* Header with target selection */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-slate-100">Application Copilot Review</h3>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Target: <strong className="text-cyan-300">{activeOpp.title}</strong> at <strong>{activeOpp.organization}</strong>
                </div>
              </div>

              {/* Selector */}
              <select
                value={selectedOppId}
                onChange={(e) => setSelectedOppId(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              >
                {opportunities.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Autofill Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Personal Details</div>
                <div className="text-emerald-400 font-bold mt-0.5">✓ Verified</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Education (B.Tech)</div>
                <div className="text-emerald-400 font-bold mt-0.5">✓ NITK (8.85 CGPA)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Technical Skills</div>
                <div className="text-emerald-400 font-bold mt-0.5">✓ 8 Verified</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">ATS Resume</div>
                <div className="text-emerald-400 font-bold mt-0.5">✓ Score 98/100</div>
              </div>
            </div>

            {/* AI Suggested Answers to Complex Application Questions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Portal Questions Detected ({activeOpp.applicationQuestions?.length || 0})
                </div>
                <span className="text-[11px] text-cyan-400 font-mono">
                  ✓ AI Suggested Answers Ready for Review
                </span>
              </div>

              <div className="space-y-3">
                {activeOpp.applicationQuestions?.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="font-semibold text-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <span>{q.question}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-cyan-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Proposed Answer (Derived from Career DNA &amp; Projects)</span>
                      </div>
                      <textarea
                        rows={2}
                        value={editedAnswers[q.id] !== undefined ? editedAnswers[q.id] : q.aiAnswer}
                        onChange={(e) => setEditedAnswers({ ...editedAnswers, [q.id]: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-700/60 rounded-md p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strict Human Sign-Off Gate Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-slate-400">
                <span className="text-rose-400 font-bold">🛑 Safety Policy: </span>
                FormPilot never submits applications without explicit human sign-off.
              </div>

              <button
                onClick={() => setIsSignOffModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-700 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Lock className="w-4 h-4" />
                <span>Review &amp; Sign Off Application</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Human Approval Modal Gate */}
      {isSignOffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100">
                  🛑 Human Review &amp; Approval Gate
                </h3>
                <p className="text-xs text-slate-400">
                  Final authorization for transmission to {activeOpp.organization}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Target Role:</span>
                <strong className="text-slate-100">{activeOpp.title}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Applicant:</span>
                <strong className="text-slate-100">{userDNA.name} ({userDNA.email})</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Verified Documents:</span>
                <strong className="text-emerald-400">5 Encrypted Attachments</strong>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasConfirmedHuman}
                onChange={(e) => setHasConfirmedHuman(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-700 text-rose-500 focus:ring-0"
              />
              <span>
                I have inspected the application details and AI suggested answers. I authorize FormPilot Agent to submit this packet on my behalf.
              </span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSignOffModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!hasConfirmedHuman}
                onClick={handleSignOff}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Authorize &amp; Transmit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
