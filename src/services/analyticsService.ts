import { DailyHealthSummary, PersonalBaseline, MetricType } from '../types/health';
import { Insight, EvidenceItem, DotConnection } from '../types/insights';
import { ExtractedContext } from '../types/conversation';
import { DEMO_BASELINES, DEMO_CURRENT_HEALTH } from '../data/demoHealthData';

export interface AnalyticsCalculation {
  metric: MetricType;
  current: number;
  baseline: number;
  delta: number;
  percentDiff: number;
  status: 'significantly_below' | 'below' | 'nominal' | 'above' | 'significantly_above';
  descriptor: string;
}

/**
 * Deterministic baseline comparison calculations
 */
export function calculateBaselineComparison(
  current: number,
  baseline: PersonalBaseline
): AnalyticsCalculation {
  const delta = Math.round((current - baseline.average) * 10) / 10;
  const percentDiff = baseline.average > 0 
    ? Math.round(((current - baseline.average) / baseline.average) * 100) 
    : 0;

  let status: AnalyticsCalculation['status'] = 'nominal';
  let descriptor = 'consistent with typical range';

  if (delta <= -1.5) {
    status = 'significantly_below';
    descriptor = `substantially lower than ${baseline.period} (${Math.abs(delta)} ${baseline.unit} below)`;
  } else if (delta < -0.4) {
    status = 'below';
    descriptor = `slightly below ${baseline.period} (${Math.abs(delta)} ${baseline.unit} lower)`;
  } else if (delta >= 1.5) {
    status = 'significantly_above';
    descriptor = `substantially higher than ${baseline.period} (+${delta} ${baseline.unit})`;
  } else if (delta > 0.4) {
    status = 'above';
    descriptor = `above typical baseline (+${delta} ${baseline.unit})`;
  }

  return {
    metric: baseline.metricType,
    current,
    baseline: baseline.average,
    delta,
    percentDiff,
    status,
    descriptor
  };
}

/**
 * Summarises all available metrics against their personal baselines
 */
export function analyseHealthMetrics(
  health: DailyHealthSummary = DEMO_CURRENT_HEALTH,
  baselines: Record<string, PersonalBaseline> = DEMO_BASELINES
) {
  const sleepCalc = calculateBaselineComparison(health.sleepHours, baselines.sleep);
  const stepsCalc = calculateBaselineComparison(health.steps, baselines.steps);
  const hrCalc = calculateBaselineComparison(health.heartRateAvg, baselines.heart_rate);
  const activeCalc = calculateBaselineComparison(health.activeMinutes, baselines.active_minutes);

  return {
    sleep: sleepCalc,
    steps: stepsCalc,
    heartRate: hrCalc,
    activeMinutes: activeCalc,
    reportedEnergy: health.reportedEnergy,
  };
}

/**
 * Connect the Dots Engine: Combines deterministic measurements with reported feelings & commitments.
 * Strict Rule: Use qualified language, never declare causation, cite concrete evidence.
 */
export function generateConnectedInsight(
  context?: ExtractedContext,
  health: DailyHealthSummary = DEMO_CURRENT_HEALTH,
  baselines: Record<string, PersonalBaseline> = DEMO_BASELINES
): Insight {
  const analysis = analyseHealthMetrics(health, baselines);
  const feelingReported = context?.feeling || (health.reportedEnergy === 'low' ? 'tiredness' : 'neutral');
  const commitmentReported = context?.commitment || null;
  const commitmentDate = context?.eventDateLabel || 'in the coming days';

  const evidence: EvidenceItem[] = [
    {
      metricType: 'sleep',
      label: 'Sleep Duration',
      currentValue: `${health.sleepHours} hrs`,
      baselineValue: `${baselines.sleep.average} hrs`,
      difference: `${analysis.sleep.delta > 0 ? '+' : ''}${analysis.sleep.delta} hrs`,
      direction: analysis.sleep.delta < 0 ? 'below' : analysis.sleep.delta > 0 ? 'above' : 'nominal',
      unit: 'hours',
      recordedAt: health.recordedAt,
      source: 'Demo Health Connect'
    },
    {
      metricType: 'steps',
      label: 'Daily Steps',
      currentValue: health.steps.toLocaleString(),
      baselineValue: baselines.steps.average.toLocaleString(),
      difference: `${analysis.steps.delta > 0 ? '+' : ''}${analysis.steps.delta.toLocaleString()} steps`,
      direction: analysis.steps.delta < 0 ? 'below' : 'above',
      unit: 'steps',
      recordedAt: health.recordedAt,
      source: 'Demo Health Connect'
    },
    {
      metricType: 'heart_rate',
      label: 'Average Heart Rate',
      currentValue: `${health.heartRateAvg} BPM`,
      baselineValue: `${baselines.heart_rate.average} BPM`,
      difference: `+${analysis.heartRate.delta} BPM`,
      direction: analysis.heartRate.delta > 0 ? 'above' : 'nominal',
      unit: 'BPM',
      recordedAt: health.recordedAt,
      source: 'Demo Wearable'
    }
  ];

  const connections: DotConnection[] = [
    {
      category: 'sleep',
      title: 'Rest Deficit',
      value: `${health.sleepHours} hrs recorded`,
      badge: `${analysis.sleep.delta}h vs baseline`,
      significance: 'Recorded 2.0 hours below your 7.0-hour 30-day baseline.'
    },
    {
      category: 'feeling',
      title: 'Reported Energy',
      value: feelingReported ? `Reported: ${feelingReported}` : 'Energy: Low',
      badge: 'Subjective input',
      significance: 'Reported feeling tired and low energy today.'
    },
    {
      category: 'activity',
      title: 'Physiological Load',
      value: `${health.heartRateAvg} BPM avg`,
      badge: '+6 BPM elevation',
      significance: 'Mildly elevated daytime average compared to 72 BPM resting baseline.'
    }
  ];

  if (commitmentReported) {
    connections.push({
      category: 'commitment',
      title: 'Upcoming Commitment',
      value: commitmentReported,
      badge: commitmentDate,
      significance: `Requires cognitive clarity and focus ${commitmentDate}.`
    });
  }

  // Construct qualified explanation
  const observation = `Your reported ${feelingReported} coincides with shorter-than-usual sleep (${health.sleepHours} hours recorded versus your ${baselines.sleep.average}-hour baseline).`;

  let explanation = `Your sleep last night was ${Math.abs(analysis.sleep.delta)} hours below your typical average. In addition, your average heart rate is mildly elevated at ${health.heartRateAvg} BPM (+${analysis.heartRate.delta} BPM over baseline). While individual days fluctuate and correlation does not imply direct causation, self-reported low energy frequently coincides with periods of accumulated rest deficit.`;

  let suggestion = `To support your wellbeing today, consider taking short 5-minute screen breaks and keeping evening physical demand light.`;

  if (commitmentReported) {
    suggestion = `Given that you have a ${commitmentReported} ${commitmentDate}, prioritizing an early wind-down tonight could help restore cognitive sharpness. Consider preparing any remaining materials earlier in the evening so you can protect your sleep window.`;
  }

  return {
    id: `insight-${Date.now()}`,
    title: commitmentReported 
      ? `Rest deficit coinciding with reported fatigue before ${commitmentReported}`
      : 'Rest deficit coinciding with reported fatigue',
    observation,
    evidence,
    explanation,
    suggestion,
    connections,
    createdAt: new Date().toISOString(),
    qualifiedDisclaimer: 'SVAYAM provides pattern observations and personal intelligence, not medical diagnoses or clinical advice.',
    isDemoData: true
  };
}
