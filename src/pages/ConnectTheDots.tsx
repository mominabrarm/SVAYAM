import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GitMerge, 
  Moon, 
  Zap, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  ArrowUpRight
} from 'lucide-react';

export const ConnectTheDots: React.FC = () => {
  const { currentInsight, health, setActiveTab } = useApp();

  const nodeColors = [
    'bg-[#55A8F8]', // Sky Blue
    'bg-[#4DE59B]', // Mint Green
    'bg-[#E8C6FF]', // Soft Lilac
    'bg-[#FCE354]', // Sunshine Yellow
  ];

  return (
    <div className="w-full space-y-8 select-none">
      {/* Editorial Page Header */}
      <div className="pb-6 border-b-[1.5px] border-[#0A0A0A] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] px-3 py-0.5 text-xs font-black tracking-wider uppercase text-[#0A0A0A]">
              Core Intelligence Differentiator
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-tight text-[#0A0A0A] leading-none">
            CONNECT THE DOTS
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
            SVAYAM connects objective health measurements with your reported feelings and upcoming commitments to surface evidence-backed personal patterns.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('voice')}
          className="self-start md:self-auto px-6 py-3 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A] text-xs font-extrabold uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center gap-2 active:scale-95"
        >
          <span>Share New Check-in</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Connected Insight Banner */}
      <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] p-6 sm:p-10 shadow-hard space-y-8 relative overflow-hidden">
        {/* Top Tag & Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] text-[#0A0A0A] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-hard-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pattern Correlation Identified</span>
            </span>
            <span className="text-[#0A0A0A] font-bold text-xs uppercase px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-white">
              {new Date(currentInsight.createdAt).toLocaleDateString()} at{' '}
              {new Date(currentInsight.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A]">
            DEMO DATA RECORD
          </span>
        </div>

        {/* Main Title & Qualified Observation */}
        <div className="space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#0A0A0A] leading-tight">
            {currentInsight.title}
          </h2>

          <div className="p-5 sm:p-6 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard text-sm sm:text-base font-semibold text-[#0A0A0A] leading-relaxed">
            <strong className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] block mb-2 bg-[#FCE354] w-fit px-2 py-0.5 rounded border border-[#0A0A0A]">
              Qualified Observation
            </strong>
            {currentInsight.observation}
          </div>
        </div>

        {/* Visual Multi-Layer Connected Dots Nodes Diagram */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]">
            Connected Context Nodes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {currentInsight.connections.map((node, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border-[1.5px] border-[#0A0A0A] ${nodeColors[i % nodeColors.length]} shadow-hard-xs hover:-translate-y-1 transition-all duration-150 space-y-2 overflow-hidden min-w-0`}
              >
                <div className="flex items-center justify-between text-xs font-black uppercase text-[#0A0A0A] gap-2 min-w-0">
                  <span className="truncate">{node.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#0A0A0A] shrink-0">
                    {node.badge}
                  </span>
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0A0A0A] truncate">
                  {node.value}
                </div>
                <p className="text-[11px] font-bold text-[#262626] leading-snug">
                  {node.significance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Breakdown Grid */}
        <div className="space-y-4 pt-4 border-t-[1.5px] border-[#0A0A0A]">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]">
            Objective Baseline Evidence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {currentInsight.evidence.map((ev, i) => (
              <div key={i} className="p-5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard-xs space-y-3 overflow-hidden min-w-0">
                <div className="flex items-center justify-between text-xs font-black uppercase text-[#0A0A0A] gap-2 min-w-0">
                  <span className="truncate">{ev.label}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-[#FAFAFA] shrink-0">{ev.source}</span>
                </div>

                <div className="flex items-baseline justify-between pt-1 gap-2 min-w-0">
                  <div className="min-w-0">
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#0A0A0A] truncate block">{ev.currentValue}</span>
                    <span className="text-[11px] font-bold text-[#525252] block uppercase">Current</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] block">{ev.baselineValue}</span>
                    <span className="text-[11px] font-bold text-[#525252] block uppercase">Baseline</span>
                  </div>
                </div>

                <div className="pt-2 border-t-[1.5px] border-[#0A0A0A] flex items-center justify-between text-xs font-black uppercase min-w-0">
                  <span className="truncate">Difference:</span>
                  <span className="px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A] shrink-0">
                    {ev.difference}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning & Actionable Suggestion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-4 border-t-[1.5px] border-[#0A0A0A]">
          <div className="p-5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard-xs space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
              Contextual Explanation
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
              {currentInsight.explanation}
            </p>
          </div>

          <div className="p-5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] shadow-hard-xs space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
              Actionable Guidance
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-[#0A0A0A] leading-relaxed">
              {currentInsight.suggestion}
            </p>
          </div>
        </div>

        {/* Qualified Medical & Intelligence Disclaimer */}
        <div className="p-4 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white flex items-start gap-3 text-xs font-semibold text-[#262626]">
          <Info className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-black text-[#0A0A0A] uppercase">Important Notice: </strong>
            {currentInsight.qualifiedDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
