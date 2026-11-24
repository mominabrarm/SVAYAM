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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t-[1.5px] border-[#0A0A0A] px-2 flex items-center justify-around z-40 select-none">
      {MOBILE_TABS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded-full transition-all duration-150 active:scale-95 ${
              isActive 
                ? 'bg-[#0A0A0A] text-white px-3 py-1.5 border-[1.5px] border-[#0A0A0A]' 
                : 'text-[#0A0A0A] hover:bg-[#FAFAFA]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
