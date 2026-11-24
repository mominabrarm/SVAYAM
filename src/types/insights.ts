import { MetricType } from './health';

export interface EvidenceItem {
  metricType: MetricType;
  label: string;
  currentValue: string | number;
  baselineValue: string | number;
  difference: string;
  direction: 'below' | 'above' | 'nominal';
  unit: string;
  recordedAt: string;
  source: string;
}

export interface DotConnection {
  category: 'sleep' | 'activity' | 'feeling' | 'commitment';
  title: string;
  value: string;
  badge: string;
  significance: string;
}

export interface Insight {
  id: string;
  title: string;
  observation: string;
  evidence: EvidenceItem[];
  explanation: string;
  suggestion: string;
  connections: DotConnection[];
  createdAt: string;
  qualifiedDisclaimer: string;
  isDemoData: boolean;
}
