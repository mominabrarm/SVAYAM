import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RadarReminder } from '../types/radar';
import { 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  Moon,
  RotateCcw
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea
} from 'recharts';

export const FutureRadar: React.FC = () => {
  const { reminders, updateReminderStatus, health, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  const filteredReminders = reminders.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleSnooze = (id: string) => {
    const snoozeTime = new Date(Date.now() + 2 * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updateReminderStatus(id, 'snoozed', `Snoozed until ${snoozeTime}`);
  };

  const cardFills = [
    'bg-[#55A8F8]', // Sky Blue
    'bg-[#E8C6FF]', // Soft Lilac
    'bg-[#4DE59B]', // Mint Green
    'bg-white',     // Pure White
  ];

  // Actual vs. Projected Trajectory Data for upcoming presentation recovery
  const FORECAST_DATA = [
    { day: 'Sun', date: 'Nov 22', actual: 7.5, projected: null, note: 'Solid baseline sleep' },
    { day: 'Mon', date: 'Nov 23', actual: 6.2, projected: null, note: 'Mild deficit' },
    { day: 'Tue', date: 'Today (Nov 24)', actual: health.sleepHours, projected: health.sleepHours, note: 'Current 5.0h deficit dip' },
    { day: 'Wed', date: 'Tomorrow (Nov 25)', actual: null, projected: 7.5, note: 'Target: Presentation recovery' },
    { day: 'Thu', date: 'Nov 26', actual: null, projected: 7.2, note: 'Cognitive stabilization' },
    { day: 'Fri', date: 'Nov 27', actual: null, projected: 7.0, note: 'Nominal baseline return' },
  ];

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header */}
      <div className="pb-6 border-b-[1.5px] border-[#0A0A0A] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#55A8F8] px-3 py-0.5 text-xs font-black tracking-wider uppercase text-[#0A0A0A]">
              Proactive Foresight
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-tight text-[#0A0A0A] leading-none">
            FUTURE RADAR
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
            Anticipates upcoming commitments and matches them with your current physiological state to suggest timely preparations.
          </p>
        </div>

        {/* Dynamic Wellbeing Forecast Banner */}
        <div className="px-5 py-3 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-[#FCE354] shadow-hard-xs flex items-center gap-3">
          <Moon className="w-5 h-5 text-[#0A0A0A]" />
          <div className="text-xs font-bold text-[#0A0A0A]">
            <span className="block text-[10px] uppercase font-black">Tonight's Target</span>
            <span className="text-sm font-extrabold">7.5h Rest for Cognitive Recovery</span>
          </div>
        </div>
      </div>

      {/* Trajectory / Forecast Line Chart Card */}
      <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white p-6 shadow-hard space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-black text-2xl uppercase italic tracking-tight text-[#0A0A0A] flex items-center gap-2">
              <span>WELLBEING TRAJECTORY & RECOVERY FORECAST</span>
            </h2>
            <p className="text-xs font-bold text-[#525252]">
              Actual past rest vs. projected recovery sleep required for your scheduled commitments.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-[#0A0A0A]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#0A0A0A] bg-[#55A8F8]">
              <span>Recorded Rest</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#0A0A0A] bg-[#4DE59B]">
              <span className="border-t-2 border-dashed border-[#0A0A0A] w-3 inline-block" />
              <span>Projected Target</span>
            </div>
          </div>
        </div>

        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={FORECAST_DATA} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" vertical={false} />
              
              {/* Highlighted Risk Zone (4.0 - 6.0 hrs) */}
              <ReferenceArea y1={4.0} y2={6.0} fill="#FCE354" fillOpacity={0.25} />
              
              {/* Highlighted Optimal Recovery Zone (7.0 - 8.5 hrs) */}
              <ReferenceArea y1={7.0} y2={8.5} fill="#4DE59B" fillOpacity={0.15} />

              <XAxis 
                dataKey="day" 
                stroke="#0A0A0A" 
                fontSize={11} 
                fontWeight={700}
                tickLine={false}
                axisLine={{ stroke: '#0A0A0A', strokeWidth: 1.5 }}
              />
              <YAxis 
                domain={[3.5, 9]} 
                stroke="#0A0A0A" 
                fontSize={11} 
                fontWeight={700}
                tickLine={false}
                axisLine={{ stroke: '#0A0A0A', strokeWidth: 1.5 }}
                ticks={[4, 5, 6, 7, 7.5, 8.5]}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border-[1.5px] border-[#0A0A0A] p-3 rounded-2xl shadow-[3px_3px_0px_#0A0A0A] text-xs space-y-1">
                        <p className="font-extrabold text-[#0A0A0A]">{data.date}</p>
                        {data.actual !== null && (
                          <p className="font-black text-[#0A0A0A]">
                            Recorded: {data.actual} hrs
                          </p>
                        )}
                        {data.projected !== null && (
                          <p className="font-black text-[#0A0A0A]">
                            Projected Target: {data.projected} hrs
                          </p>
                        )}
                        <p className="text-[#525252] text-[10px] font-bold">
                          {data.note}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine 
                y={health.sleepBaseline} 
                stroke="#0A0A0A" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ value: `Baseline ${health.sleepBaseline}h`, fill: '#0A0A0A', fontSize: 10, fontWeight: 800, position: 'right' }} 
              />
              <ReferenceLine 
                y={7.5} 
                stroke="#0A0A0A" 
                strokeDasharray="2 2" 
                strokeWidth={1.5}
                label={{ value: 'Target 7.5h', fill: '#0A0A0A', fontSize: 10, fontWeight: 800, position: 'left' }} 
              />
              {/* Actual Recorded Rest Line */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0A0A0A" 
                strokeWidth={3} 
                dot={{ fill: '#55A8F8', stroke: '#0A0A0A', strokeWidth: 2, r: 5 }}
                connectNulls={false}
              />
              {/* Projected Recovery Trend Line */}
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#0A0A0A" 
                strokeWidth={2.5} 
                strokeDasharray="5 5"
                dot={{ fill: '#4DE59B', stroke: '#0A0A0A', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3.5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#0A0A0A]">
          <span>Yellow zone denotes fatigue risk; green zone highlights target recovery rest (7.0h–8.5h).</span>
          <span className="px-2.5 py-0.5 rounded-full border border-[#0A0A0A] bg-[#FCE354] text-[10px] uppercase font-black">
            Action: 7.5h Rest Tonight Recommended
          </span>
        </div>
      </div>

      {/* Filter Tabs (Outlined Pill Buttons) */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'pending', 'accepted', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-150 border-[1.5px] border-[#0A0A0A] active:scale-95 ${
              filter === tab
                ? 'bg-[#0A0A0A] text-white shadow-hard-xs'
                : 'bg-white text-[#0A0A0A] hover:bg-[#FCE354]'
            }`}
          >
            {tab} ({reminders.filter(r => tab === 'all' ? true : r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] p-8 space-y-3 shadow-hard">
          <Compass className="w-12 h-12 text-[#0A0A0A] mx-auto" />
          <p className="text-sm font-bold text-[#0A0A0A] uppercase">No radar reminders in this category.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredReminders.map((rem, idx) => {
            const fillClass = rem.priority === 'high' ? 'bg-[#FCE354]' : cardFills[idx % cardFills.length];

            return (
              <div
                key={rem.id}
                className={`p-6 sm:p-7 rounded-3xl border-[1.5px] border-[#0A0A0A] ${fillClass} shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg space-y-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full border border-[#0A0A0A] bg-[#0A0A0A]" />
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0A0A0A]">
                      {rem.title}
                    </h3>
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border border-[#0A0A0A] bg-white text-[#0A0A0A]">
                      {rem.dateLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border border-[#0A0A0A] ${
                      rem.status === 'accepted' ? 'bg-[#4DE59B] text-[#0A0A0A]' :
                      rem.status === 'completed' ? 'bg-white text-[#0A0A0A]' :
                      'bg-white text-[#0A0A0A]'
                    }`}>
                      {rem.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-semibold text-[#0A0A0A] leading-relaxed">
                  {rem.description}
                </p>

                {/* Context Insight Pill */}
                {rem.contextInsight && (
                  <div className="p-3.5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white flex items-center gap-2 text-xs font-bold text-[#0A0A0A] shadow-hard-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#0A0A0A]" />
                    <span><strong>Context:</strong> {rem.contextInsight}</span>
                  </div>
                )}

                {/* Suggested Action Box */}
                {rem.suggestedAction && (
                  <div className="p-4 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white flex items-start gap-3 text-xs font-semibold text-[#0A0A0A] shadow-hard-xs">
                    <Sparkles className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[10px] font-black uppercase tracking-wider block mb-0.5">
                        Recommended Action
                      </strong>
                      <span>{rem.suggestedAction}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-[#0A0A0A]">
                  <div className="text-[11px] font-bold text-[#0A0A0A]">
                    {rem.snoozeUntil ? rem.snoozeUntil : `Scheduled: ${new Date(rem.scheduledFor).toLocaleDateString()}`}
                  </div>

                  <div className="flex items-center gap-2">
                    {rem.status !== 'completed' && (
                      <>
                        {rem.status !== 'accepted' && (
                          <button
                            onClick={() => updateReminderStatus(rem.id, 'accepted')}
                            className="px-4 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-white text-white hover:text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95"
                          >
                            Accept
                          </button>
                        )}
                        <button
                          onClick={() => handleSnooze(rem.id)}
                          className="px-4 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95"
                        >
                          Snooze (+2h)
                        </button>
                        <button
                          onClick={() => updateReminderStatus(rem.id, 'completed')}
                          className="px-4 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Done</span>
                        </button>
                      </>
                    )}
                    {rem.status === 'completed' && (
                      <button
                        onClick={() => updateReminderStatus(rem.id, 'pending')}
                        className="px-4 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
