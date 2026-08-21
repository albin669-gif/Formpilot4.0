import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  Flame, 
  Cpu 
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { DEMO_SCENES } from '../../data/mockData';

export const DemoOverlay: React.FC = () => {
  const {
    isDemoRunning,
    currentDemoScene,
    stopHackathonDemo,
    jumpToDemoScene,
    nextDemoScene,
    prevDemoScene
  } = useAgent();

  if (!isDemoRunning) return null;

  const currentSceneObj = DEMO_SCENES[currentDemoScene - 1] || DEMO_SCENES[0];
  const progressPercent = Math.round((currentDemoScene / DEMO_SCENES.length) * 100);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-fadeIn">
      <div className="rounded-2xl bg-[#090e1c]/95 border-2 border-cyan-500/80 p-4 shadow-[0_0_35px_rgba(6,182,212,0.45)] backdrop-blur-xl space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🎬 13-SCENE HACKATHON DEMO RUNNER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-cyan-300">
              SCENE {currentDemoScene} / 13
            </span>
            <button
              onClick={stopHackathonDemo}
              className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5"
            >
              EXIT
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Scene Info */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <span>{currentSceneObj.title}</span>
            <span className="text-[10px] font-mono text-emerald-400 font-normal">
              ({currentSceneObj.durationMs / 1000}s)
            </span>
          </div>
          <div className="text-xs text-slate-400">{currentSceneObj.subtitle}</div>
          {currentSceneObj.voiceText && (
            <div className="text-xs font-serif text-cyan-300 italic pt-1 flex items-start gap-1.5 border-t border-slate-800/60 mt-1">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>"{currentSceneObj.voiceText.text}"</span>
            </div>
          )}
        </div>

        {/* Playback Controls & Scene Scrubber */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevDemoScene}
              disabled={currentDemoScene <= 1}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800"
              title="Previous Scene"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextDemoScene}
              disabled={currentDemoScene >= DEMO_SCENES.length}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800"
              title="Next Scene"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Scene Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[320px] py-0.5">
            {DEMO_SCENES.map(sc => (
              <button
                key={sc.id}
                onClick={() => jumpToDemoScene(sc.id)}
                className={`w-6 h-6 rounded-md text-[10px] font-mono font-bold flex items-center justify-center shrink-0 transition-all ${
                  currentDemoScene === sc.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold ring-2 ring-cyan-300 scale-110'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {sc.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
