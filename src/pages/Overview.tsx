import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_7DAY_TRENDS, DEMO_BASELINES } from '../data/demoHealthData';
import { 
  Moon, 
  Footprints, 
  Heart, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  Calendar,
  Mic,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  CartesianGrid
} from 'recharts';

export const Overview: React.FC = () => {
  const { health, setHealth, setActiveTab, currentInsight, reminders } = useApp();
  const [activeChartMetric, setActiveChartMetric] = useState<'sleep' | 'steps'>('sleep');

  const sleepDelta = Math.round((health.sleepHours - health.sleepBaseline) * 10) / 10;
  const stepsDelta = health.steps - health.stepsBaseline;
  const hrDelta = health.heartRateAvg - health.heartRateBaseline;

  const handleSetEnergy = (level: 'low' | 'moderate' | 'optimal') => {
    setHealth(prev => ({ ...prev, reportedEnergy: level }));
  };

  const pendingReminders = reminders.filter(r => r.status === 'pending');

  return (
    <div className="w-full space-y-8 select-none">
      {/* Editorial Hero Header */}
      <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white p-6 sm:p-10 shadow-hard relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            {/* Top pill badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Intelligence Briefing</span>
              </span>
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                Demo Health Connect
              </span>
            </div>

            {/* High-impact condensed heading */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-tight text-[#0A0A0A] leading-none">
              DON'T GUESS.<br />
              KNOW YOUR STATE.
            </h1>

            <p className="text-sm sm:text-base font-medium text-[#262626] leading-relaxed max-w-2xl">
              Sleep last night was <strong className="font-bold underline decoration-[#FCE354] decoration-4 underline-offset-2">{health.sleepHours} hours</strong>, which is{' '}
              <strong className="font-bold">{Math.abs(sleepDelta)} hours below</strong> your {health.sleepBaseline}h baseline.
              {health.reportedEnergy === 'low' && (
                <span> Self-reported energy is currently <strong className="bg-[#FCE354] px-1.5 py-0.5 rounded border border-[#0A0A0A] font-bold">low</strong>.</span>
              )}
            </p>
          </div>

          {/* Action CTAs: Solid Black Pill & Outlined Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('voice')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A] text-xs font-extrabold uppercase tracking-wider transition-all duration-150 shadow-hard-xs active:scale-95 group"
            >
              <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Talk to SVAYAM</span>
              <ArrowUpRight className="w-4 h-4 ml-0.5" />
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-150 shadow-hard-xs active:scale-95"
            >
              <span>Connect the Dots</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Health Metric Cards (Color-Blocked Pop Minimalist Palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {/* Metric 1: Sleep Duration (Pure White Card) */}
        <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white p-6 shadow-hard transition-all duration-200 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-hard-lg flex flex-col justify-between space-y-4 overflow-hidden min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] truncate">
              <Moon className="w-4 h-4 shrink-0" />
              <span>Sleep</span>
            </span>
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0A0A0A] shrink-0">
              Last Night
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-black text-[clamp(1.75rem,2.4vw,2.75rem)] text-[#0A0A0A] leading-none tracking-tight max-w-full truncate">
                {health.sleepHours}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] shrink-0">HOURS</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A] text-[11px] font-black uppercase max-w-full truncate">
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{Math.abs(sleepDelta)}h vs {health.sleepBaseline}h baseline</span>
            </div>
          </div>

          <div className="pt-3 border-t-[1.5px] border-[#0A0A0A] flex items-center justify-between text-[11px] font-bold text-[#525252] min-w-0">
            <span className="truncate">30-Day Avg: {DEMO_BASELINES.sleep.average}h</span>
            <span className="text-[#0A0A0A] font-black uppercase shrink-0">Deficit</span>
          </div>
        </div>

        {/* Metric 2: Steps (Sky Blue Card #55A8F8) */}
        <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#55A8F8] p-6 shadow-hard transition-all duration-200 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-hard-lg flex flex-col justify-between space-y-4 overflow-hidden min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] truncate">
              <Footprints className="w-4 h-4 shrink-0" />
              <span>Daily Steps</span>
            </span>
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0A0A0A] shrink-0">
              Today
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-black text-[clamp(1.75rem,2.4vw,2.75rem)] text-[#0A0A0A] leading-none tracking-tight max-w-full truncate">
                {health.steps.toLocaleString()}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] shrink-0">STEPS</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white text-[#0A0A0A] text-[11px] font-black uppercase max-w-full truncate">
              <span className="truncate">Goal: {health.stepsBaseline.toLocaleString()}</span>
              <span className="shrink-0">({Math.round((health.steps / health.stepsBaseline) * 100)}%)</span>
            </div>
          </div>

          <div className="pt-3 border-t-[1.5px] border-[#0A0A0A] flex items-center justify-between text-[11px] font-bold text-[#0A0A0A] min-w-0">
            <span className="truncate">Target: 8,500</span>
            <span className="font-black shrink-0">{Math.abs(stepsDelta).toLocaleString()} left</span>
          </div>
        </div>

        {/* Metric 3: Heart Rate (Soft Lilac Card #E8C6FF) */}
        <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] p-6 shadow-hard transition-all duration-200 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-hard-lg flex flex-col justify-between space-y-4 overflow-hidden min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] truncate">
              <Heart className="w-4 h-4 shrink-0" />
              <span>Heart Rate</span>
            </span>
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0A0A0A] shrink-0">
              Daytime
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-black text-[clamp(1.75rem,2.4vw,2.75rem)] text-[#0A0A0A] leading-none tracking-tight max-w-full truncate">
                {health.heartRateAvg}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] shrink-0">BPM</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white text-[#0A0A0A] text-[11px] font-black uppercase max-w-full truncate">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">+{hrDelta} BPM over {health.heartRateBaseline}</span>
            </div>
          </div>

          <div className="pt-3 border-t-[1.5px] border-[#0A0A0A] flex items-center justify-between text-[11px] font-bold text-[#0A0A0A] min-w-0">
            <span className="truncate">Baseline: {health.heartRateBaseline} BPM</span>
            <span className="font-black uppercase shrink-0">Mild Elevation</span>
          </div>
        </div>

        {/* Metric 4: Reported Energy (Mint Green Card #4DE59B) */}
        <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] p-6 shadow-hard transition-all duration-200 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-hard-lg flex flex-col justify-between space-y-4 overflow-hidden min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] truncate">
              <Zap className="w-4 h-4 shrink-0" />
              <span>Energy</span>
            </span>
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0A0A0A] shrink-0">
              Subjective
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-black text-[clamp(1.75rem,2.4vw,2.75rem)] text-[#0A0A0A] leading-none uppercase tracking-tight max-w-full truncate">
                {health.reportedEnergy}
              </span>
            </div>
            <p className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
              {health.reportedEnergy === 'low' 
                ? 'Coincides with 5h sleep deficit' 
                : 'Balanced with metrics'}
            </p>
          </div>

          {/* Quick Pill Energy Selector - 3-column grid for clean fit */}
          <div className="pt-3 border-t-[1.5px] border-[#0A0A0A] grid grid-cols-3 gap-1.5 w-full min-w-0">
            {(['low', 'moderate', 'optimal'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleSetEnergy(lvl)}
                className={`py-1.5 px-2 rounded-full text-center capitalize text-xs font-black transition-all border-[1.5px] border-[#0A0A0A] truncate active:scale-95 ${
                  health.reportedEnergy === lvl
                    ? 'bg-[#0A0A0A] text-white shadow-hard-xs'
                    : 'bg-white text-[#0A0A0A] hover:bg-[#FCE354]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Interactive Trend Chart & Connected Dots / Radar Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 7-Day Activity & Sleep Trend Chart with interactive switch */}
        <div className="lg:col-span-2 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white p-6 sm:p-8 shadow-hard space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-black text-2xl uppercase italic tracking-tight text-[#0A0A0A] flex items-center gap-2">
                <span>HEALTH & ROUTINE TRENDS</span>
              </h2>
              <p className="text-xs font-bold text-[#525252] mt-0.5">
                Past 7 days compared against your personalized 30-day baseline.
              </p>
            </div>

            {/* Interactive Metric Switcher Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveChartMetric('sleep')}
                className={`px-3 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all duration-150 active:scale-95 ${
                  activeChartMetric === 'sleep'
                    ? 'bg-[#0A0A0A] text-white shadow-hard-xs'
                    : 'bg-white text-[#0A0A0A] hover:bg-[#55A8F8]'
                }`}
              >
                Sleep (hrs)
              </button>
              <button
                onClick={() => setActiveChartMetric('steps')}
                className={`px-3 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all duration-150 active:scale-95 ${
                  activeChartMetric === 'steps'
                    ? 'bg-[#0A0A0A] text-white shadow-hard-xs'
                    : 'bg-white text-[#0A0A0A] hover:bg-[#4DE59B]'
                }`}
              >
                Daily Steps
              </button>
            </div>
          </div>

          {/* Recharts Bar / Trend Chart */}
          <div className="h-[260px] w-full pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DEMO_7DAY_TRENDS} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="dayLabel" 
                  stroke="#0A0A0A" 
                  fontSize={11} 
                  fontWeight={700}
                  tickLine={false}
                  axisLine={{ stroke: '#0A0A0A', strokeWidth: 1.5 }}
                />
                {activeChartMetric === 'sleep' ? (
                  <YAxis 
                    domain={[3, 9]} 
                    stroke="#0A0A0A" 
                    fontSize={11} 
                    fontWeight={700}
                    tickLine={false}
                    axisLine={{ stroke: '#0A0A0A', strokeWidth: 1.5 }}
                    ticks={[4, 5, 6, 7, 8]}
                  />
                ) : (
                  <YAxis 
                    domain={[0, 12000]} 
                    stroke="#0A0A0A" 
                    fontSize={11} 
                    fontWeight={700}
                    tickLine={false}
                    axisLine={{ stroke: '#0A0A0A', strokeWidth: 1.5 }}
                    ticks={[3000, 6000, 8500, 11000]}
                  />
                )}
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const isSleep = activeChartMetric === 'sleep';
                      const diff = isSleep 
                        ? Math.round((data.sleepHours - health.sleepBaseline) * 10) / 10
                        : data.steps - health.stepsBaseline;

                      return (
                        <div className="bg-white border-[1.5px] border-[#0A0A0A] p-3 rounded-2xl shadow-[3px_3px_0px_#0A0A0A] text-xs space-y-1">
                          <p className="font-extrabold text-[#0A0A0A]">{data.dayLabel} ({data.date})</p>
                          <p className="font-black text-sm text-[#0A0A0A]">
                            {isSleep ? `Sleep: ${data.sleepHours} hrs` : `Steps: ${data.steps.toLocaleString()}`}
                          </p>
                          <p className="font-bold text-[#262626]">
                            {isSleep 
                              ? `${diff >= 0 ? `+${diff}` : diff}h vs ${health.sleepBaseline}h baseline`
                              : `${diff >= 0 ? `+${diff}` : diff} steps vs ${health.stepsBaseline.toLocaleString()} goal`
                            }
                          </p>
                          <p className="text-[#525252] text-[10px] font-bold">
                            HR: {data.heartRateAvg} BPM • Energy: {data.energyLevel}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {activeChartMetric === 'sleep' ? (
                  <>
                    <ReferenceLine 
                      y={health.sleepBaseline} 
                      stroke="#0A0A0A" 
                      strokeDasharray="4 4" 
                      strokeWidth={2}
                      label={{ value: `Baseline ${health.sleepBaseline}h`, fill: '#0A0A0A', fontSize: 11, fontWeight: 800, position: 'right' }} 
                    />
                    <Bar 
                      dataKey="sleepHours" 
                      fill="#55A8F8" 
                      stroke="#0A0A0A" 
                      strokeWidth={1.5}
                      radius={[8, 8, 0, 0]}
                    />
                  </>
                ) : (
                  <>
                    <ReferenceLine 
                      y={health.stepsBaseline} 
                      stroke="#0A0A0A" 
                      strokeDasharray="4 4" 
                      strokeWidth={2}
                      label={{ value: `Goal ${health.stepsBaseline.toLocaleString()}`, fill: '#0A0A0A', fontSize: 11, fontWeight: 800, position: 'right' }} 
                    />
                    <Bar 
                      dataKey="steps" 
                      fill="#4DE59B" 
                      stroke="#0A0A0A" 
                      strokeWidth={1.5}
                      radius={[8, 8, 0, 0]}
                    />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-[#0A0A0A]">
            <span>Noticeable dip on Nov 24: Sleep dropped to 5.0h (-2.0h deficit) with 6,240 steps</span>
            <button 
              onClick={() => setActiveTab('insights')}
              className="text-[#0A0A0A] hover:bg-[#FCE354] px-3 py-1 rounded-full border border-[#0A0A0A] inline-flex items-center gap-1 transition uppercase text-[11px] font-extrabold w-fit"
            >
              <span>Examine Correlation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: Latest Connected Dot & Proactive Reminders */}
        <div className="space-y-6">
          {/* Connected Dots Card Preview (Soft Lilac #E8C6FF) */}
          <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] p-6 shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Connected Dot</span>
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-[#4DE59B] text-[#0A0A0A]">
                Live
              </span>
            </div>

            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#0A0A0A] leading-tight">
              {currentInsight.title}
            </h3>

            <p className="text-xs font-semibold text-[#262626] leading-relaxed line-clamp-3">
              {currentInsight.observation}
            </p>

            <button
              onClick={() => setActiveTab('insights')}
              className="w-full py-2.5 px-4 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-white text-white hover:text-[#0A0A0A] text-xs font-extrabold uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Inspect Reasoning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Future Radar Quick Alert Card (Mint Green #4DE59B) */}
          <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] p-6 shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Future Radar</span>
              </span>
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0A0A0A]">
                {pendingReminders.length} Pending
              </span>
            </div>

            {pendingReminders.length > 0 ? (
              <div className="space-y-2.5">
                {pendingReminders.slice(0, 2).map(rem => (
                  <div key={rem.id} className="p-3.5 rounded-2xl bg-white border-[1.5px] border-[#0A0A0A] space-y-1 shadow-hard-xs">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#0A0A0A]">
                      <span>{rem.title}</span>
                      <span className="rounded-full border border-[#0A0A0A] bg-[#FCE354] px-2 py-0.2 text-[10px] uppercase">{rem.dateLabel}</span>
                    </div>
                    <p className="text-[11px] font-medium text-[#262626] line-clamp-2">
                      {rem.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-medium text-[#262626] italic">No upcoming reminders on radar.</p>
            )}

            <button
              onClick={() => setActiveTab('radar')}
              className="w-full py-2.5 px-4 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Open Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
