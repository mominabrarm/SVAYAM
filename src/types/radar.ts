export type ReminderStatus = 'pending' | 'accepted' | 'snoozed' | 'dismissed' | 'completed';

export type ReminderCategory = 'preparation' | 'recovery' | 'commitment' | 'wellbeing';

export interface RadarReminder {
  id: string;
  title: string;
  description: string;
  scheduledFor: string; // ISO or date string
  dateLabel: string; // e.g. "Tomorrow, 2:00 PM"
  category: ReminderCategory;
  status: ReminderStatus;
  priority: 'low' | 'medium' | 'high';
  relatedMemoryId?: string;
  contextInsight?: string;
  suggestedAction?: string;
  snoozeUntil?: string;
  createdAt: string;
}
