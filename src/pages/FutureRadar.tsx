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
  ShieldAlert,
  Moon,
  Plus,
  BellRing
} from 'lucide-react';

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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-svayam-violet-light" />
            <span className="text-xs font-semibold tracking-wider uppercase text-svayam-violet-light">
              Proactive Foresight
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Future Radar
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Anticipates upcoming commitments and matches them with your current physiological state to suggest timely preparations.
          </p>
        </div>

        {/* Dynamic Wellbeing Forecast Banner */}
        <div className="px-4 py-2.5 rounded-xl bg-surface-100 border border-white/[0.06] flex items-center gap-3">
          <Moon className="w-4 h-4 text-svayam-violet-light" />
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Tonight's Target</span>
            <span className="text-slate-200 font-semibold">7.5h Rest for Cognitive Recovery</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'pending', 'accepted', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
              filter === tab
                ? 'bg-svayam-violet/20 text-svayam-violet-light border border-svayam-violet/30'
                : 'bg-surface-100 text-slate-400 hover:text-slate-200 border border-white/[0.04]'
            }`}
          >
            {tab} ({reminders.filter(r => tab === 'all' ? true : r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-surface-100/60 border border-white/[0.04] p-6 space-y-3">
          <Compass className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-400">No radar reminders found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReminders.map(rem => (
            <div
              key={rem.id}
              className={`p-6 rounded-2xl border transition space-y-4 ${
                rem.priority === 'high'
                  ? 'bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 border-svayam-violet/30 shadow-lg'
                  : 'bg-surface-100 border-white/[0.06]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    rem.status === 'completed' ? 'bg-svayam-emerald' : 
                    rem.priority === 'high' ? 'bg-amber-400 animate-pulse' : 'bg-svayam-violet'
                  }`} />
                  <h3 className="text-base font-semibold text-white">
                    {rem.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400">
                    {rem.dateLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    rem.status === 'accepted' ? 'bg-svayam-emerald/15 text-svayam-emerald border border-svayam-emerald/30' :
                    rem.status === 'completed' ? 'bg-slate-700 text-slate-300' :
                    'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}>
                    {rem.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {rem.description}
              </p>

              {/* Context Insight Pill */}
              {rem.contextInsight && (
                <div className="p-3 rounded-xl bg-surface-200/80 border border-white/[0.04] flex items-center gap-2 text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span><strong>Context:</strong> {rem.contextInsight}</span>
                </div>
              )}

              {/* Suggested Action Box */}
              {rem.suggestedAction && (
                <div className="p-3 rounded-xl bg-svayam-violet/10 border border-svayam-violet/20 flex items-start gap-2.5 text-xs text-slate-200">
                  <Sparkles className="w-4 h-4 text-svayam-violet-light shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-svayam-violet-light font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                      Recommended Action
                    </strong>
                    <span>{rem.suggestedAction}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.04]">
                <div className="text-[11px] text-slate-500">
                  {rem.snoozeUntil ? rem.snoozeUntil : `Scheduled: ${new Date(rem.scheduledFor).toLocaleDateString()}`}
                </div>

                <div className="flex items-center gap-2">
                  {rem.status !== 'completed' && (
                    <>
                      {rem.status !== 'accepted' && (
                        <button
                          onClick={() => updateReminderStatus(rem.id, 'accepted')}
                          className="px-3 py-1.5 rounded-lg bg-svayam-violet/20 hover:bg-svayam-violet/30 border border-svayam-violet/40 text-svayam-violet-light text-xs font-medium transition"
                        >
                          Accept
                        </button>
                      )}
                      <button
                        onClick={() => handleSnooze(rem.id)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition"
                      >
                        Snooze (+2h)
                      </button>
                      <button
                        onClick={() => updateReminderStatus(rem.id, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-svayam-emerald/15 hover:bg-svayam-emerald/25 border border-svayam-emerald/30 text-svayam-emerald text-xs font-medium transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </button>
                    </>
                  )}
                  {rem.status === 'completed' && (
                    <button
                      onClick={() => updateReminderStatus(rem.id, 'pending')}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-medium transition"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
