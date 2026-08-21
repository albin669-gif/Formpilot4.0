import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  RefreshCw, 
  Play, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Code2, 
  Plus, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { LearnedWorkflow, WorkflowStep } from '../../types/agent';
import { VoiceService } from '../../services/voiceService';

export const WorkflowHub: React.FC = () => {
  const {
    learnedWorkflows,
    relearnWorkflow,
    deleteWorkflow,
    executeAgentTask,
    setActiveTab
  } = useAgent();

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(learnedWorkflows[0]?.id || '');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const voice = VoiceService.getInstance();

  const selectedWf = learnedWorkflows.find(w => w.id === selectedWorkflowId) || learnedWorkflows[0];

  const handleTestWorkflow = (wf: LearnedWorkflow) => {
    voice.playChime('start');
    executeAgentTask(`Run learned workflow: ${wf.workflowName}`, { forceReuse: true });
    setActiveTab('browser-agent');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/30 border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Self-Learning Workflow Registry &amp; Synthesizer
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  Zero-Shot Replay
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Every successful portal traversal compiles into a fault-tolerant deterministic execution graph.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
              Cached Workflows: <strong className="text-purple-400">{learnedWorkflows.length}</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
              Avg Health: <strong className="text-emerald-400">95.2%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Interface: Workflow List + Inspector / Step Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Workflow Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Learned Portals ({learnedWorkflows.length})
          </div>

          <div className="space-y-3">
            {learnedWorkflows.map(wf => {
              const isSelected = wf.id === selectedWorkflowId;
              return (
                <div
                  key={wf.id}
                  onClick={() => setSelectedWorkflowId(wf.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-purple-950/30 border-purple-500/60 shadow-lg shadow-purple-950/30 ring-1 ring-purple-500/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {wf.portalCategory}
                    </span>
                    
                    {/* Health badge */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        wf.healthStatus === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        wf.healthStatus === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {wf.healthStatus === 'HEALTHY' ? '🟢 HEALTHY' : wf.healthStatus === 'DEGRADED' ? '🟡 DEGRADED' : '🔴 BROKEN'} {wf.reliability}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{wf.workflowName}</h3>
                    <p className="text-xs text-slate-400">{wf.portalName}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span>Runs: <strong className="text-slate-200">{wf.totalRuns}</strong></span>
                    <span>Reused: <strong className="text-emerald-400">{wf.successfulRuns}</strong></span>
                    <span>Recovered: <strong className="text-amber-400">{wf.recoveredRuns}</strong></span>
                    <span>Speed: <strong className="text-cyan-400">{wf.averageExecutionSec}s</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Workflow Step Inspector */}
        <div className="lg:col-span-7 space-y-4">
          {selectedWf ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800 flex-wrap gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-100">{selectedWf.workflowName}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs">
                      {selectedWf.steps.length} Steps
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedWf.description}</p>
                  <p className="text-[11px] font-mono text-cyan-400">Target: {selectedWf.targetUrl}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTestWorkflow(selectedWf)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>⚡ Replay Workflow</span>
                  </button>

                  <button
                    onClick={() => relearnWorkflow(selectedWf.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Relearn</span>
                  </button>

                  <button
                    onClick={() => deleteWorkflow(selectedWf.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                    title="Delete workflow"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Sequence Visual Graph */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Step Sequence
                </div>

                <div className="space-y-2">
                  {selectedWf.steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold font-mono flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                          0{step.stepNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-200 flex items-center gap-2">
                            <span>{step.description}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                              {step.action}
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-cyan-300">
                            Selector: <code className="bg-slate-900 px-1 py-0.5 rounded">{step.targetSelector}</code>
                          </div>
                          {step.fallbackSelectors && step.fallbackSelectors.length > 0 && (
                            <div className="text-[10px] text-slate-500 font-mono">
                              Fallbacks: {step.fallbackSelectors.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px] shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Self-Healing Diff Visualizer Demo Moment */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <RefreshCw className="w-4 h-4 text-amber-400" />
                    <span>Self-Healing Engine Signature</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    Auto-Heal: Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Expected DOM Element</div>
                    <div className="font-mono text-slate-300 mt-1 text-[11px]">button#btn-apply ("Apply Now")</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-bold text-amber-400 uppercase">Fuzzy Vector Recovery</div>
                    <div className="font-mono text-emerald-300 mt-1 text-[11px]">.cta-begin-flow ("Start Application")</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">Select a workflow to inspect</div>
          )}
        </div>
      </div>
    </div>
  );
};
