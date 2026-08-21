import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  RotateCcw, 
  Search, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  MousePointer, 
  RefreshCw 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

export const TimelineView: React.FC = () => {
  const { actionLogs } = useAgent();
  const [filterType, setFilterType] = useState<string>('all');
  const voice = VoiceService.getInstance();

  const getIcon = (type: string) => {
    switch (type) {
      case 'network': return <Globe className="w-4 h-4 text-blue-400" />;
      case 'search': return <Search className="w-4 h-4 text-cyan-400" />;
      case 'dom': return <MousePointer className="w-4 h-4 text-purple-400" />;
      case 'ai': return <Cpu className="w-4 h-4 text-teal-400" />;
      case 'workflow': return <RefreshCw className="w-4 h-4 text-emerald-400" />;
      case 'recovery': return <RotateCcw className="w-4 h-4 text-amber-400" />;
      case 'gate': return <ShieldCheck className="w-4 h-4 text-rose-400" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredLogs = filterType === 'all' 
    ? actionLogs 
    : actionLogs.filter(l => l.iconType === filterType);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Agent Action Timeline &amp; Replay Stream
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  Immutable Audit Trail
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Timestamped chronicle of every DOM extraction, selector recovery, and reasoning checkpoint.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Total Logged Events: <strong className="text-cyan-400">{actionLogs.length}</strong>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        {actionLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs space-y-2">
            <div>No events recorded yet in this session.</div>
            <div className="text-[11px] text-slate-600">Run a task from the Command Center to populate timeline logs.</div>
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {filteredLogs.map(log => (
              <div key={log.id} className="relative flex items-start gap-4 text-xs group">
                {/* Node icon */}
                <div className="absolute -left-6 p-1 rounded-full bg-slate-900 border border-slate-700 shadow shrink-0 mt-0.5">
                  {getIcon(log.iconType)}
                </div>

                <div className="flex-1 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 group-hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{log.message}</span>
                    <span className="font-mono text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                  {log.details && (
                    <p className="text-slate-400 text-[11px]">{log.details}</p>
                  )}
                  {log.highlightSelector && (
                    <div className="text-[10px] font-mono text-cyan-400">
                      Target: <code>{log.highlightSelector}</code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
