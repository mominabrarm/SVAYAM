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
  Info
} from 'lucide-react';

export const ConnectTheDots: React.FC = () => {
  const { currentInsight, health, setActiveTab } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-svayam-emerald" />
            <span className="text-xs font-semibold tracking-wider uppercase text-svayam-emerald">
              Core Intelligence Differentiator
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Connect the Dots
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            SVAYAM connects your objective health measurements with your reported feelings and upcoming commitments to surface evidence-backed personal patterns.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('voice')}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-svayam-violet hover:bg-svayam-violet-dark text-white text-xs font-medium transition shadow-md shadow-svayam-violet/20 flex items-center gap-2"
        >
          <span>Share New Check-in</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Connected Insight Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-surface-100 via-surface-200 to-surface-100 border border-white/[0.08] shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Tag & Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-svayam-emerald/15 border border-svayam-emerald/30 text-svayam-emerald font-semibold text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pattern Correlation Identified</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {new Date(currentInsight.createdAt).toLocaleDateString()} at{' '}
              {new Date(currentInsight.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            DEMO DATA RECORD
          </span>
        </div>

        {/* Main Title & Observation */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {currentInsight.title}
          </h2>

          <div className="p-4 rounded-xl bg-surface-300/80 border border-white/[0.06] text-sm text-slate-200 leading-relaxed font-sans">
            <strong className="text-svayam-violet-light font-semibold block text-xs uppercase tracking-wider mb-1">
              Qualified Observation
            </strong>
            {currentInsight.observation}
          </div>
        </div>

        {/* Visual Multi-Layer Connected Dots Nodes Diagram */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Connected Context Nodes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentInsight.connections.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-surface-100/90 border border-white/[0.06] space-y-2 relative group hover:border-svayam-violet/40 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{node.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-svayam-violet-light font-mono font-medium">
                    {node.badge}
                  </span>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {node.value}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {node.significance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Breakdown Grid */}
        <div className="space-y-3 pt-4 border-t border-white/[0.06]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Objective Baseline Evidence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentInsight.evidence.map((ev, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-200 border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{ev.label}</span>
                  <span className="text-[10px] font-mono text-slate-500">{ev.source}</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-bold font-mono text-white">{ev.currentValue}</span>
                    <span className="text-[11px] text-slate-400 block">Current recorded</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold font-mono text-slate-300">{ev.baselineValue}</span>
                    <span className="text-[11px] text-slate-500 block">Personal baseline</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-slate-400">Difference:</span>
                  <span className={`font-mono font-semibold ${
                    ev.direction === 'below' ? 'text-amber-400' : ev.direction === 'above' ? 'text-svayam-violet-light' : 'text-slate-300'
                  }`}>
                    {ev.difference}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning & Actionable Suggestion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
          <div className="p-4 rounded-xl bg-surface-200/60 border border-white/[0.04] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Contextual Explanation
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentInsight.explanation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-svayam-violet/10 border border-svayam-violet/25 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-svayam-violet-light block">
              Actionable Guidance
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentInsight.suggestion}
            </p>
          </div>
        </div>

        {/* Qualified Medical & Intelligence Disclaimer */}
        <div className="p-3 rounded-lg bg-surface-300/60 border border-white/[0.04] flex items-start gap-2.5 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300 font-medium">Important: </strong>
            {currentInsight.qualifiedDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
