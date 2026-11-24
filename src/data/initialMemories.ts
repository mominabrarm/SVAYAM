import { PersonalMemory } from '../types/memory';
import { RadarReminder } from '../types/radar';

export const INITIAL_MEMORIES: PersonalMemory[] = [
  {
    id: 'mem-1',
    category: 'habit',
    content: 'Prefers light stretching or unwinding walks before evening presentations.',
    createdAt: '2026-11-20T10:00:00Z',
    tags: ['routine', 'presentation'],
    contextNote: 'Logged during self-reflection',
  },
  {
    id: 'mem-2',
    category: 'reflection',
    content: 'Noticed cognitive fog sets in when sleep is under 6 hours for consecutive days.',
    createdAt: '2026-11-22T19:30:00Z',
    tags: ['sleep', 'cognition'],
  },
  {
    id: 'mem-3',
    category: 'habit',
    content: 'Hydration goal: 2.5L daily, especially on busy meeting days.',
    createdAt: '2026-11-23T08:15:00Z',
    tags: ['wellness', 'habit'],
  }
];

export const INITIAL_REMINDERS: RadarReminder[] = [
  {
    id: 'rem-1',
    title: 'Wind-down prep routine',
    description: 'Keep evening cognitive strain minimal prior to major milestones.',
    scheduledFor: '2026-11-24T21:00:00Z',
    dateLabel: 'Tonight, 9:00 PM',
    category: 'recovery',
    status: 'pending',
    priority: 'medium',
    suggestedAction: 'Dim screen brightness and begin winding down 1 hour earlier.',
    createdAt: '2026-11-24T08:00:00Z'
  }
];
