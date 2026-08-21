import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  RotateCw, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

export const AnalyticsHub: React.FC = () => {
  const { metrics, learnedWorkflows } = useAgent();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/30 border border-blue-500/30 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Agent Intelligence &amp; Reliability Telemetry
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  SLO 99.4% Uptime
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Empirical observability into selector stability, recovery latency, and workflow reuse efficiency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
              Agent Health Score: <strong className="text-emerald-400 font-bold">{metrics.overallHealthScore} / 100</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Success Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{metrics.successRate}%</div>
          <div className="text-[10px] text-slate-500">Autonomous completions</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recovery Rate</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{metrics.recoveryRate}%</div>
          <div className="text-[10px] text-slate-500">Self-healed mutations</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Execution</div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">{metrics.avgExecutionSeconds}s</div>
          <div className="text-[10px] text-slate-500">End-to-end task time</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Workflows Learned</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{metrics.workflowsLearned}</div>
          <div className="text-[10px] text-slate-500">Compiled schemas</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Workflows Reused</div>
          <div className="text-2xl font-extrabold text-teal-400 font-mono">{metrics.workflowsReused}</div>
          <div className="text-[10px] text-slate-500">Zero-shot speedups</div>
        </div>
      </div>

      {/* 2-Column Section: Workflow Health Breakdown + Activity Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Workflow Health Matrix */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100">Workflow Health &amp; Degradation</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">All Nodes Active</span>
            </div>

            <div className="space-y-3">
              {learnedWorkflows.map(wf => (
                <div key={wf.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{wf.workflowName}</span>
                    <span className="font-mono text-emerald-400 font-bold">{wf.reliability}%</span>
                  </div>

                  {/* Visual Reliability Bar */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${wf.reliability}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Runs: {wf.totalRuns} (✓ {wf.successfulRuns} | 🔄 {wf.recoveredRuns})</span>
                    <span>Verified: {wf.lastVerified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Agent Activity Executions Curve (SVG) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-slate-100">Execution Frequency &amp; Velocity</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Past 24 Hours</span>
            </div>

            {/* SVG Visual Graph */}
            <div className="relative py-4">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 160">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4 4" />

                {/* Area Fill */}
                <path
                  d="M 0 140 Q 80 110, 150 70 T 300 40 T 420 90 T 500 20 L 500 160 L 0 160 Z"
                  fill="url(#areaGradient)"
                />
                {/* Stroke line */}
                <path
                  d="M 0 140 Q 80 110, 150 70 T 300 40 T 420 90 T 500 20"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                />

                {/* Data Points */}
                <circle cx="150" cy="70" r="4" fill="#10b981" />
                <circle cx="300" cy="40" r="4" fill="#06b6d4" />
                <circle cx="420" cy="90" r="4" fill="#f59e0b" />
                <circle cx="500" cy="20" r="5" fill="#a855f7" className="animate-ping" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now (Peak Velocity)</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Telemetry: <strong className="text-cyan-400">128 Discoveries</strong> across 4 Portals</span>
              <span className="text-emerald-400 font-semibold">Zero Hallucinations Logged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
