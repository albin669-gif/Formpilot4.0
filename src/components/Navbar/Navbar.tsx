import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Globe, 
  Play, 
  Square, 
  Bell, 
  ShieldCheck, 
  Settings, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Volume2
} from 'lucide-react';
import { useAgent, NavTab } from '../../context/AgentContext';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types/agent';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedLanguage,
    setSelectedLanguage,
    agentStatus,
    metrics,
    notifications,
    clearNotifications,
    isDemoRunning,
    startHackathonDemo,
    stopHackathonDemo,
    currentDemoScene
  } = useAgent();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'command-center', label: 'Command Center', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'browser-agent', label: 'Live Browser Agent', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'LIVE' },
    { id: 'government-hub', label: '🇮🇳 Government Hub', icon: <Flame className="w-4 h-4 text-amber-400" /> },
    { id: 'workflows', label: 'Self-Learning Workflows', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
    { id: 'copilot', label: 'Copilot & Documents', icon: <CheckCircle2 className="w-4 h-4 text-purple-400" /> },
    { id: 'test-lab', label: 'Agent Test Lab', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
    { id: 'analytics', label: 'Analytics & Health', icon: <Activity className="w-4 h-4 text-blue-400" /> },
    { id: 'trust-center', label: 'Trust Center', icon: <ShieldCheck className="w-4 h-4 text-teal-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#080d1a]/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                agentStatus === 'running' || agentStatus === 'recovering' ? 'bg-amber-400' : 'bg-emerald-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                agentStatus === 'running' || agentStatus === 'recovering' ? 'bg-amber-500' : 'bg-emerald-500'
              }`}></span>
            </span>
            <span className="font-mono text-slate-300 font-medium">
              STATUS: <span className="text-cyan-400 uppercase font-semibold">{agentStatus}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 pl-3 border-l border-slate-800 font-mono">
            <span>Health: <strong className="text-emerald-400">{metrics.overallHealthScore}/100</strong></span>
            <span>Success: <strong className="text-emerald-400">{metrics.successRate}%</strong></span>
            <span>Recovery: <strong className="text-cyan-400">{metrics.recoveryRate}%</strong></span>
            <span>Learned: <strong className="text-purple-400">{metrics.workflowsLearned}</strong></span>
            <span>Reused: <strong className="text-amber-400">{metrics.workflowsReused}</strong></span>
          </div>
        </div>

        {/* Right side controls: Language, Notifications, Demo Trigger */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 transition-colors"
              title="Select Language (Voice & Text)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentLangObj.flag}</span>
              <span className="font-medium">{currentLangObj.label}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1 z-50">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Multilingual Engine
                </div>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code as LanguageCode);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      selectedLanguage === lang.code ? 'text-cyan-400 bg-cyan-950/30 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-serif">{lang.nativeLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-md bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">Smart Alerts ({notifications.length})</span>
                  <button
                    onClick={clearNotifications}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="text-center py-4 text-xs text-slate-500">No active alerts</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.actionTab) setActiveTab(n.actionTab);
                          setShowNotifications(false);
                        }}
                        className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 cursor-pointer transition-colors text-xs"
                      >
                        <div className="font-semibold text-slate-200">{n.title}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{n.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Winning Hackathon Demo Trigger Button */}
          {!isDemoRunning ? (
            <button
              onClick={startHackathonDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>🎬 HACKATHON DEMO</span>
            </button>
          ) : (
            <button
              onClick={stopHackathonDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30 animate-pulse hover:bg-rose-500 transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>STOP DEMO ({currentDemoScene}/13)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('command-center')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                FORMPILOT
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/40">
                4.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide font-medium">
              Self-Learning Autonomous Browser Agent
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1 py-0.2 text-[9px] font-bold bg-emerald-500 text-slate-950 rounded uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Settings & Tools */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-lg border transition-colors ${
              activeTab === 'settings'
                ? 'bg-slate-800 border-cyan-500/40 text-cyan-400'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200'
            }`}
            title="Settings & Career DNA"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
