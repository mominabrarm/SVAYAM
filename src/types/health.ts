export type MetricType = 'sleep' | 'steps' | 'heart_rate' | 'active_minutes' | 'energy';

export interface HealthRecord {
  id: string;
  metricType: MetricType;
  value: number;
  unit: string;
  recordedAt: string; // ISO date string
  source: string; // e.g. 'Health Connect (Demo)'
  isDemo: true;
  notes?: string;
}

export interface PersonalBaseline {
  metricType: MetricType;
  average: number;
  unit: string;
  period: string; // e.g. '30-day average'
  sampleCount: number;
  stdDev?: number;
}

export interface DailyHealthSummary {
  date: string; // YYYY-MM-DD
  sleepHours: number;
  sleepBaseline: number;
  sleepDifference: number; // e.g. -2.0
  steps: number;
  stepsBaseline: number;
  heartRateAvg: number;
  heartRateBaseline: number;
  activeMinutes: number;
  reportedEnergy: 'low' | 'moderate' | 'optimal';
  recordedAt: string;
  isDemo: boolean;
}

export interface DailyTrendPoint {
  date: string;
  dayLabel: string;
  sleepHours: number;
  sleepBaseline: number;
  steps: number;
  heartRateAvg: number;
  energyLevel: 'low' | 'moderate' | 'optimal';
}
