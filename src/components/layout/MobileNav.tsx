import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Mic, 
  GitMerge, 
  Brain, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';

const MOBILE_TABS: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'insights', label: 'Connect', icon: GitMerge },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'radar', label: 'Radar', icon: Compass },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
];

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-200/95 backdrop-blur-lg border-t border-white/[0.08] px-2 flex items-center justify-around z-40">
      {MOBILE_TABS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-all ${
              isActive 
                ? 'text-svayam-violet-light' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-svayam-violet-light' : ''}`} />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
