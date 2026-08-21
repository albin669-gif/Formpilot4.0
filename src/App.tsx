import React from 'react';
import { AgentProvider, useAgent } from './context/AgentContext';
import { Navbar } from './components/Navbar/Navbar';
import { CommandCenter } from './components/CommandCenter/CommandCenter';
import { BrowserAgent } from './components/BrowserAgent/BrowserAgent';
import { GovernmentHub } from './components/GovernmentHub/GovernmentHub';
import { WorkflowHub } from './components/Workflows/WorkflowHub';
import { CopilotHub } from './components/Copilot/CopilotHub';
import { TestLab } from './components/TestLab/TestLab';
import { AnalyticsHub } from './components/Analytics/AnalyticsHub';
import { TrustCenter } from './components/TrustCenter/TrustCenter';
import { SettingsModal } from './components/Settings/SettingsModal';
import { TimelineView } from './components/Timeline/TimelineView';
import { DeadlineCalendar } from './components/Calendar/DeadlineCalendar';
import { DemoOverlay } from './components/DemoMode/DemoOverlay';
import { Mic, Bot, Sparkles, Shield, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useAgent();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenter />;
      case 'browser-agent':
        return <BrowserAgent />;
      case 'government-hub':
        return <GovernmentHub />;
      case 'workflows':
        return <WorkflowHub />;
      case 'copilot':
        return <CopilotHub />;
      case 'test-lab':
        return <TestLab />;
      case 'analytics':
        return <AnalyticsHub />;
      case 'trust-center':
        return <TrustCenter />;
      case 'settings':
        return <SettingsModal />;
      case 'timeline':
        return <TimelineView />;
      case 'calendar':
        return <DeadlineCalendar />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between">
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 pt-6 flex-1">
        {renderActiveView()}
      </main>

      {/* Demo Floating HUD Overlay */}
      <DemoOverlay />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080d1a] py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-slate-200 flex items-center justify-center sm:justify-start gap-1.5">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>FORMPILOT 4.0 — ULTIMATE HACKATHON EDITION</span>
            </div>
            <p className="text-[11px] text-slate-500 font-serif italic">
              "Explore once. Learn the workflow. Reuse it reliably. Keep humans in control."
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <button onClick={() => setActiveTab('timeline')} className="hover:text-cyan-400 transition-colors">
              Action Timeline
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('calendar')} className="hover:text-cyan-400 transition-colors">
              Deadlines Calendar
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('trust-center')} className="hover:text-cyan-400 transition-colors">
              Zero Trust Security
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AgentProvider>
      <MainContent />
    </AgentProvider>
  );
}
