import React from 'react';
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
  ShieldCheck, 
  Activity,
  Mic,
  Calendar,
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';

export const Overview: React.FC = () => {
  const { health, setHealth, setActiveTab, currentInsight, reminders } = useApp();

  const sleepDelta = Math.round((health.sleepHours - health.sleepBaseline) * 10) / 10;
  const stepsDelta = health.steps - health.stepsBaseline;
  const hrDelta = health.heartRateAvg - health.heartRateBaseline;

  const handleSetEnergy = (level: 'low' | 'moderate' | 'optimal') => {
    setHealth(prev => ({ ...prev, reportedEnergy: level }));
  };

  const pendingReminders = reminders.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Daily Briefing Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 border border-white/[0.08] p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-svayam-violet-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Daily Intelligence Briefing
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                Demo Health Connect Active
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Good evening, Alex.
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Your sleep last night was <strong className="text-amber-400 font-semibold">{health.sleepHours} hours</strong>, which is{' '}
              <span className="text-amber-400 font-medium">{Math.abs(sleepDelta)} hours shorter</span> than your {health.sleepBaseline}-hour baseline.
              {health.reportedEnergy === 'low' && (
                <span> You have self-reported <strong className="text-amber-300">low energy</strong> today.</span>
              )}
            </p>
          </div>

          {/* Quick Voice Launcher CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('voice')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-svayam-violet hover:bg-svayam-violet-dark text-white font-medium text-sm transition shadow-lg shadow-svayam-violet/25 group"
            >
              <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Talk to SVAYAM</span>
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-medium text-sm transition"
            >
              <span>Connect the Dots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-svayam-violet/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Core Health Metric Cards (Strictly as specified in Prompt Section 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Sleep */}
        <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex flex-col justify-between hover:border-white/10 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Moon className="w-4 h-4 text-svayam-violet-light" />
              <span>Sleep Duration</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
              Last Night
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white">{health.sleepHours}</span>
              <span className="text-xs text-slate-400 font-medium">hours</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{Math.abs(sleepDelta)}h below baseline ({health.sleepBaseline}h)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-500">
            <span>30-Day Avg: {DEMO_BASELINES.sleep.average}h</span>
            <span className="text-amber-400/80 font-medium">Rest deficit</span>
          </div>
        </div>

        {/* Metric 2: Steps */}
        <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex flex-col justify-between hover:border-white/10 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Footprints className="w-4 h-4 text-svayam-emerald" />
              <span>Daily Steps</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
              Today
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white">
                {health.steps.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium">steps</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>Goal: {health.stepsBaseline.toLocaleString()}</span>
              <span className="text-slate-500 font-mono">({Math.round((health.steps / health.stepsBaseline) * 100)}%)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-500">
            <span>Target: 8,500</span>
            <span className="text-slate-400">{Math.abs(stepsDelta).toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Metric 3: Heart Rate */}
        <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex flex-col justify-between hover:border-white/10 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Heart className="w-4 h-4 text-svayam-rose" />
              <span>Average Heart Rate</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
              Daytime
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white">{health.heartRateAvg}</span>
              <span className="text-xs text-slate-400 font-medium">BPM</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{hrDelta} BPM over baseline ({health.heartRateBaseline})</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-500">
            <span>Resting Baseline: {health.heartRateBaseline} BPM</span>
            <span className="text-amber-400/80">Mild elevation</span>
          </div>
        </div>

        {/* Metric 4: Reported Energy */}
        <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex flex-col justify-between hover:border-white/10 transition">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Reported Energy</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Subjective
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold capitalize text-white font-mono">
                {health.reportedEnergy}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {health.reportedEnergy === 'low' 
                ? 'Coincides with 5h sleep deficit' 
                : 'Balanced with physiological metrics'}
            </p>
          </div>

          {/* Quick Energy Selector */}
          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center gap-1 text-[11px]">
            {(['low', 'moderate', 'optimal'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleSetEnergy(lvl)}
                className={`flex-1 py-1 rounded text-center capitalize transition ${
                  health.reportedEnergy === lvl
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Trend Chart & Active Insights / Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 7-Day Sleep Trend vs 7.0h Personal Baseline Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-100 border border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                <Moon className="w-4 h-4 text-svayam-violet-light" />
                <span>Sleep Duration vs 7.0h Personal Baseline</span>
              </h2>
              <p className="text-xs text-slate-400">
                Visualizing recent nights against your consistent 30-day baseline.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-svayam-violet" />
                <span>Actual Sleep (hrs)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-svayam-emerald" />
                <span>Baseline (7.0h)</span>
              </div>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMO_7DAY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="dayLabel" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  domain={[3, 9]} 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  ticks={[4, 5, 6, 7, 8]}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const diff = Math.round((data.sleepHours - 7.0) * 10) / 10;
                      return (
                        <div className="bg-surface-200 border border-white/10 p-3 rounded-lg shadow-xl text-xs space-y-1">
                          <p className="font-semibold text-white">{data.dayLabel} ({data.date})</p>
                          <p className="text-svayam-violet-light font-mono font-medium">
                            Sleep: {data.sleepHours} hrs
                          </p>
                          <p className={`font-mono ${diff < 0 ? 'text-amber-400' : 'text-svayam-emerald'}`}>
                            {diff >= 0 ? `+${diff}` : diff}h vs 7.0h baseline
                          </p>
                          <p className="text-slate-400 text-[10px]">Steps: {data.steps.toLocaleString()} • HR: {data.heartRateAvg} BPM</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine 
                  y={7.0} 
                  stroke="#10B981" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  label={{ value: 'Baseline (7.0h)', fill: '#10B981', fontSize: 10, position: 'right' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sleepHours" 
                  stroke="#8B5CF6" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#sleepGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-surface-200/60 border border-white/[0.04] flex items-center justify-between text-xs">
            <span className="text-slate-400">Noticeable dip on Nov 24: Sleep dropped to 5.0h (-2.0h deficit)</span>
            <button 
              onClick={() => setActiveTab('insights')}
              className="text-svayam-violet-light hover:underline font-medium flex items-center gap-1"
            >
              <span>Examine Correlation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: Latest Connected Dot & Proactive Reminders */}
        <div className="space-y-4">
          {/* Connected Dots Card Preview */}
          <div className="p-5 rounded-2xl bg-surface-100 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-svayam-emerald flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Connected Observation
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Live</span>
            </div>

            <h3 className="text-sm font-semibold text-white leading-snug">
              {currentInsight.title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
              {currentInsight.observation}
            </p>

            <button
              onClick={() => setActiveTab('insights')}
              className="w-full py-2 px-3 rounded-lg bg-svayam-violet/15 hover:bg-svayam-violet/25 border border-svayam-violet/30 text-svayam-violet-light text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <span>Inspect Full Evidence & Reasoning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Future Radar Quick Alert Card */}
          <div className="p-5 rounded-2xl bg-surface-100 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-svayam-violet-light flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Future Radar
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-svayam-violet/20 text-svayam-violet-light">
                {pendingReminders.length} Pending
              </span>
            </div>

            {pendingReminders.length > 0 ? (
              <div className="space-y-2">
                {pendingReminders.slice(0, 2).map(rem => (
                  <div key={rem.id} className="p-3 rounded-xl bg-surface-200/80 border border-white/[0.04] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{rem.title}</span>
                      <span className="text-[10px] text-amber-400 font-mono">{rem.dateLabel}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {rem.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No upcoming reminders on the radar.</p>
            )}

            <button
              onClick={() => setActiveTab('radar')}
              className="w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <span>Open Future Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
