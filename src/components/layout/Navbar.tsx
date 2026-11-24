import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  Volume2, 
  Database,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setActiveTab, isSpeaking, ttsStatus } = useApp();

  return (
    <header className="h-16 border-b border-white/[0.06] bg-surface-200/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile Title & Journey Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-svayam-violet flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-base">SVAYAM</span>
        </div>

        {/* Core Journey Pipeline Indicator (Prominently visible per Section 2) */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-slate-400 bg-surface-100/80 px-3 py-1.5 rounded-full border border-white/[0.06]">
          <span className="text-svayam-violet-light font-semibold">LISTEN</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300">UNDERSTAND</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="text-svayam-emerald font-semibold">CONNECT THE DOTS</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300">EXPLAIN</span>
          <ArrowRight className="w-3 h-3 text-slate-600" />
          <span className="text-svayam-violet-light font-semibold">GUIDE</span>
        </div>
      </div>

      {/* Right Badges & Quick Action */}
      <div className="flex items-center gap-2.5">
        {/* Demo Mode Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
          <Database className="w-3 h-3" />
          <span>DEMO DATA</span>
        </div>

        {/* Privacy Guard Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-svayam-emerald/10 border border-svayam-emerald/20 text-svayam-emerald text-xs font-medium">
          <ShieldCheck className="w-3 h-3" />
          <span>Local-First</span>
        </div>

        {/* Audio Output Badge */}
        {isSpeaking && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-svayam-violet/20 border border-svayam-violet/40 text-svayam-violet-light text-xs font-medium animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span>{ttsStatus === 'elevenlabs' ? 'ElevenLabs HD Voice' : 'Spoken Guidance'}</span>
          </div>
        )}

        {/* Direct Companion Launcher Button */}
        <button
          onClick={() => setActiveTab('voice')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-svayam-violet hover:bg-svayam-violet-dark text-white text-xs font-medium transition shadow-md shadow-svayam-violet/20"
        >
          <Mic className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Open Companion</span>
        </button>
      </div>
    </header>
  );
};
