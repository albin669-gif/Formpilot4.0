import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Flame, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  Sparkles, 
  Clock, 
  RotateCw 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { ChaosScenario } from '../../types/agent';
import { VoiceService } from '../../services/voiceService';

export const TestLab: React.FC = () => {
  const { chaosScenarios, triggerChaosTest } = useAgent();
  const [isRunningAll, setIsRunningAll] = useState(false);
  const voice = VoiceService.getInstance();

  const passedCount = chaosScenarios.filter(s => s.status === 'passed' || s.status === 'healed').length;
  const totalCount = chaosScenarios.length;
  const overallTestScore = Math.round(
    chaosScenarios.reduce((acc, s) => acc + s.reliabilityScore, 0) / totalCount
  );

  const handleRunAll = async () => {
    setIsRunningAll(true);
    voice.playChime('start');
    for (const sc of chaosScenarios) {
      await triggerChaosTest(sc.id);
    }
    setIsRunningAll(false);
    voice.playChime('success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-500/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Agent Chaos Test Lab &amp; Resilience Bench
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                  Fault Tolerance Benchmark
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Subject autonomous browser workflows to adversarial DOM mutations, jitter, popups, and layout deprecations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
              Chaos Score: <strong className="text-emerald-400">{overallTestScore}%</strong>
            </div>

            <button
              onClick={handleRunAll}
              disabled={isRunningAll}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/25 transition-all disabled:opacity-50"
            >
              {isRunningAll ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
              <span>Run All 6 Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chaosScenarios.map(sc => (
          <div
            key={sc.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                  sc.severity === 'low' ? 'bg-blue-500/20 text-blue-300' :
                  sc.severity === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300'
                }`}>
                  {sc.severity} severity
                </span>

                <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                  sc.status === 'healed' ? 'text-amber-400' :
                  sc.status === 'passed' ? 'text-emerald-400' :
                  sc.status === 'running' ? 'text-cyan-400 animate-pulse' :
                  'text-slate-400'
                }`}>
                  {sc.status === 'healed' ? '🔄 AUTO-HEALED (94%)' :
                   sc.status === 'passed' ? '✓ PASSED (99%)' :
                   sc.status === 'running' ? '⚡ RUNNING...' :
                   'IDLE'}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-100">{sc.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{sc.description}</p>
              
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-slate-300">Expected Agent Behavior: </strong>
                {sc.expectedBehavior}
              </div>

              {sc.healingLog && (
                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                  ⚡ Healing Telemetry: {sc.healingLog}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Reliability: <strong className="text-emerald-400">{sc.reliabilityScore}%</strong>
              </span>

              <button
                onClick={() => triggerChaosTest(sc.id)}
                disabled={sc.status === 'running'}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 transition-colors"
              >
                <Play className="w-3 h-3" />
                <span>Test Scenario</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
