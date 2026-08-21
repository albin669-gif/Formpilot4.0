import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ExternalLink, 
  Flame, 
  GraduationCap, 
  Briefcase, 
  Trophy 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

export const DeadlineCalendar: React.FC = () => {
  const { opportunities, setActiveTab } = useAgent();

  const daysInAugust = Array.from({ length: 31 }, (_, i) => i + 1);

  // Map deadlines to calendar days
  const events = [
    { day: 24, title: 'Zepto AI Intern Priority', category: 'internship', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { day: 26, title: 'SSP Scholarship Draft', category: 'scholarship', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { day: 28, title: 'MeitY AI Agents Hackathon', category: 'hackathon', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { day: 31, title: 'DRDO Fellowship Cutoff', category: 'government', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { day: 31, title: 'Zepto Official Portal Closes', category: 'internship', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  Smart Deadline &amp; Opportunity Calendar
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  August – September 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Synchronized countdowns, automatic portal status verification, and urgency warnings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-sm text-slate-100">August 2026 Deadlines</h3>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Internship</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Scholarship</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Hackathon</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Govt Scheme</span>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center font-bold text-xs text-slate-500 py-1 font-mono">
              {d}
            </div>
          ))}

          {/* Empty lead days for August 1, 2026 (Saturday) */}
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />
          <div className="h-24 bg-slate-950/20 rounded-xl border border-slate-800/30" />

          {daysInAugust.map(day => {
            const dayEvents = events.filter(e => e.day === day);
            const isToday = day === 21;
            return (
              <div
                key={day}
                className={`min-h-24 p-2 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-cyan-950/30 border-cyan-500/60 ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono">
                  <span className={`font-bold ${isToday ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500 text-slate-950 font-bold uppercase">
                      Today
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-1">
                  {dayEvents.map((ev, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveTab('command-center')}
                      className={`p-1 rounded text-[10px] font-medium border truncate cursor-pointer hover:opacity-80 transition-opacity ${ev.color}`}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>

                <div />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
