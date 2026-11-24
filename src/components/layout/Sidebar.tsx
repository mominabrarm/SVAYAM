import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Mic, 
  GitMerge, 
  Brain, 
  Compass, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'voice', label: 'Voice Companion', icon: Mic, badge: 'Active' },
  { id: 'insights', label: 'Connect the Dots', icon: GitMerge, badge: 'Core' },
  { id: 'memory', label: 'Personal Memory', icon: Brain },
  { id: 'radar', label: 'Future Radar', icon: Compass },
  { id: 'privacy', label: 'Privacy Centre', icon: ShieldCheck },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, resetDemoData, memories, reminders } = useApp();

  return (
    <aside className="w-64 bg-surface-200/90 border-r border-white/[0.06] flex flex-col justify-between hidden md:flex shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-svayam-violet to-svayam-violet-dark flex items-center justify-center shadow-lg shadow-svayam-violet/20 border border-svayam-violet-light/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-lg">SVAYAM</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-svayam-emerald/15 text-svayam-emerald border border-svayam-emerald/30">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Your data. Your intelligence.</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Intelligence Suite
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-svayam-violet/15 text-white border border-svayam-violet/30 shadow-sm shadow-svayam-violet/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-svayam-violet-light' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.id === 'memory' && memories.length > 0 && (
                  <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400">
                    {memories.length}
                  </span>
                )}
                {item.id === 'radar' && reminders.filter(r => r.status === 'pending').length > 0 && (
                  <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-svayam-violet/20 text-svayam-violet-light font-semibold">
                    {reminders.filter(r => r.status === 'pending').length}
                  </span>
                )}
                {item.badge && item.id !== 'memory' && item.id !== 'radar' && (
                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-svayam-violet text-white' 
                      : 'bg-white/[0.05] text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Demo Status Card */}
      <div className="p-4 border-t border-white/[0.06] space-y-3">
        <div className="p-3 rounded-lg bg-surface-100/60 border border-white/[0.05]">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
            <Lock className="w-3.5 h-3.5 text-svayam-emerald" />
            <span>Local Privacy Guard</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Data persists only in your browser storage. Zero raw health records sent to external servers.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Scenario</span>
        </button>
      </div>
    </aside>
  );
};
