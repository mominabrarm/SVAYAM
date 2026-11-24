import { ExtractedContext } from '../types/conversation';

// Known feeling and energy keywords
const FEELING_PATTERNS = [
  { match: /\b(tired|exhausted|drained|fatigued|sleepy|worn out|sluggish|foggy|groggy|wiped out)\b/i, feeling: 'tired', energy: 'low' as const },
  { match: /\b(low energy|lack(ing)? energy|no energy|burned? out)\b/i, feeling: 'low energy', energy: 'low' as const },
  { match: /\b(stressed|anxious|overwhelmed|tense|frazzled)\b/i, feeling: 'stressed', energy: 'low' as const },
  { match: /\b(good|okay|fine|decent|moderate|alright)\b/i, feeling: 'moderate', energy: 'moderate' as const },
  { match: /\b(great|energized|rested|refreshed|sharp|focused|vibrant|fantastic)\b/i, feeling: 'energized', energy: 'optimal' as const },
];

// Known commitments & milestones
const COMMITMENT_PATTERNS = [
  { match: /\b(presentation|presenting|slides?|pitch(ing)?)\b/i, commitment: 'Presentation' },
  { match: /\b(meeting|sync|standup|1:1|one-on-one|client call|discussion)\b/i, commitment: 'Meeting' },
  { match: /\b(interview|job interview|technical interview)\b/i, commitment: 'Interview' },
  { match: /\b(exam|test|quiz|midterm|final)\b/i, commitment: 'Exam' },
  { match: /\b(deadline|submission|due date|project due)\b/i, commitment: 'Project Deadline' },
  { match: /\b(flight|travel|train|trip)\b/i, commitment: 'Travel' },
  { match: /\b(workout|gym|run|marathon|training)\b/i, commitment: 'Workout' },
  { match: /\b(demo|showcase|hackathon submission|launch)\b/i, commitment: 'Product Demo' },
];

// Known temporal indicators
export function calculateEventDate(text: string, baseDate: Date = new Date()): { date: string; label: string } {
  const lower = text.toLowerCase();
  const d = new Date(baseDate);

  if (lower.includes('tomorrow')) {
    d.setDate(d.getDate() + 1);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return {
      date: d.toISOString().split('T')[0],
      label: `Tomorrow (${d.toLocaleDateString('en-US', options)})`
    };
  }

  if (lower.includes('tonight') || lower.includes('this evening')) {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return {
      date: d.toISOString().split('T')[0],
      label: `Tonight (${d.toLocaleDateString('en-US', options)})`
    };
  }

  if (lower.includes('today') || lower.includes('this afternoon')) {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return {
      date: d.toISOString().split('T')[0],
      label: `Today (${d.toLocaleDateString('en-US', options)})`
    };
  }

  const daysMatch = lower.match(/in (\d+)\s+days?/);
  if (daysMatch) {
    const numDays = parseInt(daysMatch[1], 10);
    d.setDate(d.getDate() + numDays);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return {
      date: d.toISOString().split('T')[0],
      label: `In ${numDays} days (${d.toLocaleDateString('en-US', options)})`
    };
  }

  // Default: tomorrow if commitment detected, or unspecified
  d.setDate(d.getDate() + 1);
  return {
    date: d.toISOString().split('T')[0],
    label: `Upcoming (${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`
  };
}

/**
 * Extracts feeling, energy level, commitment, and date from natural language
 */
export function extractContext(input: string, systemDate: Date = new Date()): ExtractedContext {
  const trimmed = input.trim();
  const rawKeywords: string[] = [];

  let feeling: string | undefined;
  let reportedEnergy: 'low' | 'moderate' | 'optimal' | undefined;
  let commitment: string | undefined;
  let eventDate: string | undefined;
  let eventDateLabel: string | undefined;

  // 1. Detect Feelings and Energy
  for (const pattern of FEELING_PATTERNS) {
    const match = trimmed.match(pattern.match);
    if (match) {
      feeling = pattern.feeling;
      reportedEnergy = pattern.energy;
      rawKeywords.push(match[0].toLowerCase());
      break;
    }
  }

  // 2. Detect Commitment / Upcoming Event
  for (const pattern of COMMITMENT_PATTERNS) {
    const match = trimmed.match(pattern.match);
    if (match) {
      commitment = pattern.commitment;
      rawKeywords.push(match[0].toLowerCase());
      break;
    }
  }

  // If a commitment was mentioned, determine its date
  if (commitment) {
    const dateResult = calculateEventDate(trimmed, systemDate);
    eventDate = dateResult.date;
    eventDateLabel = dateResult.label;
    if (trimmed.toLowerCase().includes('tomorrow')) {
      rawKeywords.push('tomorrow');
    } else if (trimmed.toLowerCase().includes('tonight')) {
      rawKeywords.push('tonight');
    }
  }

  const hasExtraction = Boolean(feeling || commitment || reportedEnergy);

  return {
    feeling,
    reportedEnergy,
    commitment,
    eventDate,
    eventDateLabel,
    hasExtraction,
    rawKeywords
  };
}
