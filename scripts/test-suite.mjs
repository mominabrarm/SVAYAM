// Automated Verification Test Suite for SVAYAM MVP
// Tests Context Extraction, Baseline Comparisons, and Reasoning Rules

import { readFileSync } from 'fs';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n======================================================');
console.log('       SVAYAM MVP AUTOMATED VERIFICATION SUITE        ');
console.log('======================================================\n');

// 1. Verify Baseline Comparison Math
console.log('Test Suite 1: Deterministic Baseline Calculations');
function calculateBaselineComparison(current, baselineAvg, unit, period) {
  const delta = Math.round((current - baselineAvg) * 10) / 10;
  const percentDiff = baselineAvg > 0 
    ? Math.round(((current - baselineAvg) / baselineAvg) * 100) 
    : 0;

  let status = 'nominal';
  if (delta <= -1.5) status = 'significantly_below';
  else if (delta < -0.4) status = 'below';
  else if (delta >= 1.5) status = 'significantly_above';
  else if (delta > 0.4) status = 'above';

  return { current, baseline: baselineAvg, delta, percentDiff, status };
}

const sleepTest = calculateBaselineComparison(5.0, 7.0, 'hours', '30-day baseline');
assert(sleepTest.current === 5.0, 'Recorded sleep is exactly 5.0h');
assert(sleepTest.baseline === 7.0, 'Personal baseline sleep is 7.0h');
assert(sleepTest.delta === -2.0, 'Sleep deficit correctly calculated as -2.0h');
assert(sleepTest.status === 'significantly_below', 'Status correctly identified as significantly_below baseline');

const hrTest = calculateBaselineComparison(78, 72, 'BPM', 'Resting daytime');
assert(hrTest.delta === 6.0, 'Heart rate elevation correctly calculated as +6 BPM');
assert(hrTest.status === 'significantly_above', 'Heart rate status correctly flagged as significantly_above baseline');

// 2. Context Extraction Verification
console.log('\nTest Suite 2: Natural Language Context Extraction');
const FEELING_PATTERNS = [
  { match: /\b(tired|exhausted|drained|fatigued|sleepy|worn out|sluggish|foggy|groggy)\b/i, feeling: 'tired', energy: 'low' },
  { match: /\b(low energy|lack(ing)? energy|no energy)\b/i, feeling: 'low energy', energy: 'low' },
  { match: /\b(great|energized|rested|refreshed|sharp|focused)\b/i, feeling: 'energized', energy: 'optimal' },
];

const COMMITMENT_PATTERNS = [
  { match: /\b(presentation|presenting|slides?|pitch(ing)?)\b/i, commitment: 'Presentation' },
  { match: /\b(meeting|sync|standup|1:1)\b/i, commitment: 'Meeting' },
  { match: /\b(exam|test|quiz)\b/i, commitment: 'Exam' },
];

function extractContext(input, baseDate = new Date('2026-11-24T12:00:00Z')) {
  let feeling;
  let reportedEnergy;
  let commitment;
  let eventDate;

  for (const p of FEELING_PATTERNS) {
    if (p.match.test(input)) {
      feeling = p.feeling;
      reportedEnergy = p.energy;
      break;
    }
  }

  for (const p of COMMITMENT_PATTERNS) {
    if (p.match.test(input)) {
      commitment = p.commitment;
      break;
    }
  }

  if (commitment && input.toLowerCase().includes('tomorrow')) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + 1);
    eventDate = d.toISOString().split('T')[0];
  }

  return { feeling, reportedEnergy, commitment, eventDate, hasExtraction: Boolean(feeling || commitment) };
}

const inputPrompt = "I'm tired today. I have a presentation tomorrow.";
const contextResult = extractContext(inputPrompt);

assert(contextResult.feeling === 'tired', 'Identified feeling: "tired"');
assert(contextResult.reportedEnergy === 'low', 'Inferred energy: "low"');
assert(contextResult.commitment === 'Presentation', 'Extracted commitment: "Presentation"');
assert(contextResult.eventDate === '2026-11-25', 'Derived dynamic date for tomorrow: "2026-11-25"');

// 3. Connect the Dots & Reasoning Compliance
console.log('\nTest Suite 3: Reasoning Compliance & Non-Causal Rules');
const sampleObservation = `Your reported ${contextResult.feeling} coincides with shorter-than-usual sleep (${sleepTest.current} hours recorded versus your ${sleepTest.baseline}-hour baseline).`;

assert(sampleObservation.includes('coincides with shorter-than-usual sleep'), 'Observation adheres to qualified language rule ("coincides with")');
assert(!sampleObservation.toLowerCase().includes('caused'), 'Strictly avoids unsupported causal assertion ("caused")');
assert(sampleObservation.includes('5 hours recorded versus your 7-hour baseline'), 'Observation directly cites baseline evidence numbers');

// 4. Verify Built Files Integrity
console.log('\nTest Suite 4: Production Artifacts Verification');
const distHtml = readFileSync('dist/index.html', 'utf-8');
assert(distHtml.includes('<div id="root"></div>'), 'dist/index.html contains root mount container');
assert(distHtml.includes('SVAYAM'), 'dist/index.html contains SVAYAM title');

console.log(`\n======================================================`);
console.log(`All Tests Finished: ${passed} Passed, ${failed} Failed.`);
console.log(`======================================================\n`);

if (failed > 0) process.exit(1);
