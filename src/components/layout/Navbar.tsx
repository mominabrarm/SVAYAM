import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Mic, 
  GitMerge, 
  Brain, 
  Compass, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'insights', label: 'Connect Dots', icon: GitMerge },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'radar', label: 'Future Radar', icon: Compass },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
];

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, memories, reminders, resetDemoData } = useApp();

  const pendingRemindersCount = reminders.filter(r => r.status === 'pending').length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-[1.5px] border-[#0A0A0A] h-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-4">
        {/* Left: Brand + MVP Badge */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <span className="font-display font-black text-3xl sm:text-4xl uppercase italic tracking-tight text-[#0A0A0A]">
            SVAYAM
          </span>
          <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] px-2.5 py-0.5 text-[11px] font-black uppercase text-[#0A0A0A] shadow-hard-xs">
            MVP
          </span>
        </div>

        {/* Center / Right: Nav Pills (Single-Line Horizontal Row) */}
        <nav className="hidden md:flex items-center gap-2 overflow-x-auto py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 flex items-center gap-2 rounded-full border-[1.5px] border-[#0A0A0A] px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 shadow-hard-xs ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>

                {/* Memory count badge (Lilac #E8C6FF) */}
                {item.id === 'memory' && memories.length > 0 && (
                  <span
                    className={`w-5 h-5 rounded-full border border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold font-mono ${
                      isActive ? 'bg-white text-[#0A0A0A]' : 'bg-[#E8C6FF] text-[#0A0A0A]'
                    }`}
                  >
                    {memories.length}
                  </span>
                )}

                {/* Future Radar pending reminders badge (Yellow #FCE354) */}
                {item.id === 'radar' && pendingRemindersCount > 0 && (
                  <span
                    className={`w-5 h-5 rounded-full border border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold font-mono ${
                      isActive ? 'bg-white text-[#0A0A0A]' : 'bg-[#FCE354] text-[#0A0A0A]'
                    }`}
                  >
                    {pendingRemindersCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Demo Reset Action Pill */}
          <button
            onClick={resetDemoData}
            title="Reset Demo Scenario"
            className="whitespace-nowrap shrink-0 flex items-center gap-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FCE354] text-[#0A0A0A] px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 shadow-hard-xs ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </nav>

        {/* Mobile Quick Launcher */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setActiveTab('voice')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Companion</span>
          </button>
        </div>
      </div>
    </header>
  );
};
