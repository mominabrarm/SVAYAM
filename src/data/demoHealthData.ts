import { DailyHealthSummary, DailyTrendPoint, PersonalBaseline, HealthRecord } from '../types/health';

// Personal historical baselines (e.g. 30-day moving window)
export const DEMO_BASELINES: Record<string, PersonalBaseline> = {
  sleep: {
    metricType: 'sleep',
    average: 7.0,
    unit: 'hours',
    period: '30-day baseline',
    sampleCount: 30,
    stdDev: 0.6,
  },
  steps: {
    metricType: 'steps',
    average: 8500,
    unit: 'steps',
    period: '30-day baseline',
    sampleCount: 30,
  },
  heart_rate: {
    metricType: 'heart_rate',
    average: 72,
    unit: 'BPM',
    period: 'Resting daytime baseline',
    sampleCount: 30,
  },
  active_minutes: {
    metricType: 'active_minutes',
    average: 45,
    unit: 'mins',
    period: '30-day baseline',
    sampleCount: 30,
  }
};

// Current day snapshot matching the prompt requirement exactly:
// - Sleep: 5 hours.
// - Personal sleep baseline: 7 hours.
// - Steps: 6,240.
// - Average heart rate: 78 BPM.
// - Reported energy: Low.
export const DEMO_CURRENT_HEALTH: DailyHealthSummary = {
  date: new Date().toISOString().split('T')[0],
  sleepHours: 5.0,
  sleepBaseline: 7.0,
  sleepDifference: -2.0,
  steps: 6240,
  stepsBaseline: 8500,
  heartRateAvg: 78,
  heartRateBaseline: 72,
  activeMinutes: 34,
  reportedEnergy: 'low',
  recordedAt: new Date().toISOString(),
  isDemo: true,
};

// 7-day trend records for charts and multi-day pattern recognition
export const DEMO_7DAY_TRENDS: DailyTrendPoint[] = [
  {
    date: '2026-11-18',
    dayLabel: 'Wed',
    sleepHours: 7.4,
    sleepBaseline: 7.0,
    steps: 9200,
    heartRateAvg: 69,
    energyLevel: 'optimal',
  },
  {
    date: '2026-11-19',
    dayLabel: 'Thu',
    sleepHours: 7.1,
    sleepBaseline: 7.0,
    steps: 8640,
    heartRateAvg: 71,
    energyLevel: 'optimal',
  },
  {
    date: '2026-11-20',
    dayLabel: 'Fri',
    sleepHours: 6.8,
    sleepBaseline: 7.0,
    steps: 10150,
    heartRateAvg: 73,
    energyLevel: 'moderate',
  },
  {
    date: '2026-11-21',
    dayLabel: 'Sat',
    sleepHours: 8.2,
    sleepBaseline: 7.0,
    steps: 7300,
    heartRateAvg: 68,
    energyLevel: 'optimal',
  },
  {
    date: '2026-11-22',
    dayLabel: 'Sun',
    sleepHours: 7.5,
    sleepBaseline: 7.0,
    steps: 6800,
    heartRateAvg: 70,
    energyLevel: 'moderate',
  },
  {
    date: '2026-11-23',
    dayLabel: 'Mon',
    sleepHours: 6.2,
    sleepBaseline: 7.0,
    steps: 7890,
    heartRateAvg: 74,
    energyLevel: 'moderate',
  },
  {
    date: '2026-11-24',
    dayLabel: 'Today (Tue)',
    sleepHours: 5.0,
    sleepBaseline: 7.0,
    steps: 6240,
    heartRateAvg: 78,
    energyLevel: 'low',
  },
];

export const DEMO_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'hr-sleep-today',
    metricType: 'sleep',
    value: 5.0,
    unit: 'hours',
    recordedAt: `${new Date().toISOString().split('T')[0]}T07:15:00Z`,
    source: 'Health Connect (Demo)',
    isDemo: true,
    notes: 'Sleep duration was 2.0h below 30-day baseline of 7.0h',
  },
  {
    id: 'hr-steps-today',
    metricType: 'steps',
    value: 6240,
    unit: 'steps',
    recordedAt: `${new Date().toISOString().split('T')[0]}T16:30:00Z`,
    source: 'Health Connect (Demo)',
    isDemo: true,
  },
  {
    id: 'hr-heartrate-today',
    metricType: 'heart_rate',
    value: 78,
    unit: 'BPM',
    recordedAt: `${new Date().toISOString().split('T')[0]}T17:00:00Z`,
    source: 'Health Connect (Demo)',
    isDemo: true,
    notes: 'Slightly elevated daytime average (+6 BPM over baseline)',
  },
  {
    id: 'hr-active-today',
    metricType: 'active_minutes',
    value: 34,
    unit: 'mins',
    recordedAt: `${new Date().toISOString().split('T')[0]}T16:30:00Z`,
    source: 'Health Connect (Demo)',
    isDemo: true,
  }
];
