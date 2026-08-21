import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Shield, 
  MousePointer, 
  Hand, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  Activity, 
  Search, 
  ExternalLink,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { VoiceService } from '../../services/voiceService';

export const BrowserAgent: React.FC = () => {
  const {
    browserUrl,
    setBrowserUrl,
    agentStatus,
    isMutatedDom,
    setIsMutatedDom,
    hasPopupOverlay,
    setHasPopupOverlay,
    cursorPos,
    isHumanTakeover,
    toggleHumanTakeover,
    activeRecoveryLog,
    executeAgentTask,
    userDNA
  } = useAgent();

  const [activeInspectorTab, setActiveInspectorTab] = useState<'dom' | 'network' | 'console'>('dom');
  const [filterCity, setFilterCity] = useState('Bangalore');
  const [filterStipend, setFilterStipend] = useState('10000');
  const [searchKeywords, setSearchKeywords] = useState('Software Engineering Intern');
  const [hasAppliedPortal1, setHasAppliedPortal1] = useState(false);

  const voice = VoiceService.getInstance();

  const handleMutateButtonToggle = () => {
    setIsMutatedDom(!isMutatedDom);
    voice.playChime('alert');
  };

  const handlePopupToggle = () => {
    setHasPopupOverlay(!hasPopupOverlay);
    voice.playChime('alert');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Browser Viewport Header & Controls */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Browser Top Chrome / URL Bar */}
        <div className="px-4 py-3 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap">
          {/* Window dots & Nav */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-1 text-slate-400 pl-2">
              <button className="p-1 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => voice.playChime('click')}
                className="p-1 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* URL Bar */}
          <div className="flex-1 min-w-[280px] max-w-2xl flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 text-xs font-mono text-slate-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-500">https://</span>
            <input 
              type="text" 
              value={browserUrl.replace('https://', '')}
              onChange={(e) => setBrowserUrl(`https://${e.target.value}`)}
              className="w-full bg-transparent text-slate-200 focus:outline-none"
            />
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold uppercase">
              SECURE 200 OK
            </span>
          </div>

          {/* Status & Take Control */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold">🟢 LIVE AGENT VIEW</span>
            </div>

            {/* Human Takeover Button */}
            <button
              onClick={toggleHumanTakeover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isHumanTakeover
                  ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
              }`}
            >
              {isHumanTakeover ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>▶ Resume Agent</span>
                </>
              ) : (
                <>
                  <Hand className="w-3.5 h-3.5 text-amber-400" />
                  <span>🖐 Take Control</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chaos Injection Bar (For Hackathon Demo Judges) */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Demo Chaos Injection:
            </span>
            <button
              onClick={handleMutateButtonToggle}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                isMutatedDom
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 ring-2 ring-amber-500/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              ⚠️ Mutate Button ({isMutatedDom ? 'Renamed to "Start Application"' : 'Default "Apply Now"'})
            </button>
            <button
              onClick={handlePopupToggle}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                hasPopupOverlay
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              🛑 Inject Blocking Modal ({hasPopupOverlay ? 'Active' : 'None'})
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Cursor: <span className="text-cyan-400">X:{cursorPos.x} Y:{cursorPos.y}</span> · Active Selector: <span className="text-purple-400">.internship-listing-card &gt; button</span>
          </div>
        </div>

        {/* Live Interactive Browser Portal Viewport */}
        <div className="relative min-h-[520px] bg-slate-950 p-6 overflow-hidden select-none">
          {/* Laser scanning line overlay */}
          {agentStatus === 'running' && <div className="scanline-overlay" />}

          {/* Visual Agent Cursor */}
          {!isHumanTakeover && (
            <div 
              className="absolute z-40 transition-all duration-300 pointer-events-none"
              style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
            >
              <div className="relative">
                <MousePointer className="w-6 h-6 text-cyan-400 fill-cyan-400/80 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="absolute left-5 top-2 px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] whitespace-nowrap shadow">
                  FormPilot Agent
                </span>
                {cursorPos.clicking && <div className="agent-click-ripple -left-3 -top-3 w-12 h-12" />}
              </div>
            </div>
          )}

          {/* Modal Popup Overlay (if injected) */}
          {hasPopupOverlay && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
              <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 max-w-md space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Portal Notification: Session Verification Required</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Third-party cookie consent and campus authentication handshake. FormPilot Agent automatically detects this topmost z-index overlay and dismisses it safely.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setHasPopupOverlay(false)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Accept &amp; Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Simulated Web Application DOM Layout */}
          <div className="max-w-4xl mx-auto rounded-xl bg-[#0e1628] border border-slate-800 p-6 space-y-6 shadow-inner">
            {/* Portal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  BLR
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">
                    Bangalore Tech Career &amp; Student Hub
                  </h2>
                  <p className="text-xs text-slate-400">
                    Karnataka State Verified Technical Opportunities Portal
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30">
                ● Live API Feed
              </span>
            </div>

            {/* Portal Filters & Search Bar */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchKeywords}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                    placeholder="Search keywords (e.g. CSE Intern)..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Bangalore">Bangalore (All Hubs)</option>
                    <option value="Remote">Remote Only</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>

                  <select
                    value={filterStipend}
                    onChange={(e) => setFilterStipend(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="10000">Stipend &gt;= ₹10,000</option>
                    <option value="25000">Stipend &gt;= ₹25,000</option>
                    <option value="50000">Stipend &gt;= ₹50,000</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Opportunity Listing inside Browser */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase">
                      Featured
                    </span>
                    <h3 className="font-bold text-sm text-slate-100">
                      Zepto Labs — AI Systems &amp; Backend Engineering Intern
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Koramangala, Bangalore · Stipend: <strong className="text-emerald-400">₹35,000/mo</strong> · B.Tech CSE 2026 Batch
                  </p>
                  <p className="text-xs text-slate-300">
                    High throughput Python/FastAPI microservices and real-time distributed routing algorithms.
                  </p>
                </div>

                {/* The Target Button (Can be mutated during demo) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setHasAppliedPortal1(true);
                      voice.playChime('success');
                    }}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-md ${
                      isMutatedDom
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 ring-2 ring-amber-400'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                    }`}
                  >
                    {hasAppliedPortal1
                      ? '✓ Form Ready'
                      : isMutatedDom
                      ? 'Start Application (Mutated .cta-begin)'
                      : 'Apply Now (#btn-apply)'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase">
                      Scholarship
                    </span>
                    <h3 className="font-bold text-sm text-slate-100">
                      Karnataka SSP — Post-Matric Merit-cum-Means Scheme
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    State Domicile · Grant: <strong className="text-emerald-400">₹50,000/yr + Tuition Waiver</strong>
                  </p>
                  <p className="text-xs text-slate-300">
                    Direct Benefit Transfer directly linked to Aadhaar &amp; College Student ID.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => voice.playChime('click')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Inspector Tabs: DOM Inspector & Network Waterfall */}
        <div className="p-4 bg-[#0a0f1d] border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveInspectorTab('dom')}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeInspectorTab === 'dom' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                &lt;/&gt; DOM Tree Inspector
              </button>
              <button
                onClick={() => setActiveInspectorTab('network')}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeInspectorTab === 'network' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚡ Network Waterfall
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              FormPilot Webcmd Engine v4.0 · Sandboxed DOM
            </span>
          </div>

          {activeInspectorTab === 'dom' ? (
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
              <div className="text-slate-500">&lt;html lang="en"&gt;</div>
              <div className="pl-4 text-slate-500">&lt;body class="bg-portal-theme"&gt;</div>
              <div className="pl-8 text-cyan-300">
                &lt;div id="portal-container" class="max-w-4xl mx-auto"&gt;
              </div>
              <div className="pl-12 text-slate-300">
                &lt;input id="search-box" name="q" value="{searchKeywords}" /&gt;
              </div>
              <div className="pl-12 text-amber-300 bg-amber-950/30 px-1 py-0.5 rounded">
                &lt;button class="{isMutatedDom ? 'cta-begin-flow' : 'btn-apply'}" id="{isMutatedDom ? 'btn-start-app' : 'btn-apply'}"&gt;
                {isMutatedDom ? '"Start Application"' : '"Apply Now"'}
                &lt;/button&gt; <span className="text-[10px] text-emerald-400 font-bold">← Target Node</span>
              </div>
              <div className="pl-8 text-slate-500">&lt;/div&gt;</div>
              <div className="pl-4 text-slate-500">&lt;/body&gt;</div>
              <div className="text-slate-500">&lt;/html&gt;</div>
            </div>
          ) : (
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400">
                <span>GET https://bangalore.techjobs.internal/internships</span>
                <span>200 OK · 42ms</span>
              </div>
              <div className="flex items-center justify-between text-cyan-400">
                <span>GET /api/v1/opportunities?location=Bangalore&amp;stipend=10000</span>
                <span>200 OK · 68ms</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>POST /api/v1/telemetry/agent-heartbeat</span>
                <span>204 No Content · 12ms</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
