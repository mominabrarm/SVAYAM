# SVAYAM — Product Requirements Document

**Version:** 1.0  
**Product:** SVAYAM  
**Category:** Personal Intelligence · Health & Fitness · Voice AI · Privacy  
**Status:** Hackathon MVP  
**Platform:** Responsive Web Application

## 1. Product Overview

SVAYAM is a voice-first, privacy-first personal intelligence companion that helps people understand the relationship between their health, habits, feelings and everyday commitments.

Instead of simply displaying disconnected health metrics, SVAYAM combines personal health information with user-reported context to generate understandable, relevant and actionable insights.

Users can speak naturally, share how they feel, mention upcoming events and ask questions about their personal patterns.

**Product vision:** Turn personal data into personal understanding.

## 2. Problem Statement

Smartphones and wearable devices collect large amounts of personal health and activity data, but users often struggle to understand what those numbers mean in the context of their daily lives.

Existing tracking tools primarily display metrics, while general AI assistants may lack structured access to personal health history and context.

Users need a way to connect their health patterns with their everyday experiences and receive useful explanations without losing control of their personal data.

## 3. Target Users

Primary users:
- Students and young professionals.
- Smartphone and smartwatch users.
- People interested in fitness, sleep and daily wellbeing.
- People who prefer speaking rather than manually entering information.

## 4. Product Goals

The MVP must demonstrate that SVAYAM can:

1. Accept natural-language user input through voice or text.
2. combine user-reported context with personal health information.
3. Analyse health metrics against personal baselines.
4. Generate evidence-backed, understandable insights.
5. Remember upcoming commitments and relevant personal context.
6. Provide contextual reminders and spoken responses.
7. Demonstrate privacy controls and local data ownership.

## 5. Core Features and Requirements

### F1. Personal Dashboard

Display:
- Sleep duration.
- Daily steps.
- Activity duration.
- Average heart rate.
- Self-reported energy level.
- Personal historical averages.

Requirements:
- Use consistent demo health records.
- Clearly label sample or simulated data.
- Show comparisons against personal baselines.
- Display a concise daily briefing.

### F2. Voice Companion

Allow users to:
- Speak naturally.
- Enter messages through text as a fallback.
- View conversation history.
- Receive contextual responses.
- Hear responses through ElevenLabs text-to-speech.

Example input:

"I'm feeling tired today. I have a presentation tomorrow."

Expected behaviour:
- Identify the reported feeling.
- Extract the upcoming commitment.
- Retrieve relevant health records.
- Generate a contextual response.
- Save relevant information to personal memory with appropriate user control.

### F3. Connect the Dots

This is SVAYAM's primary differentiator.

Combine:
- Personal sleep history.
- Activity patterns.
- User-reported energy.
- Feelings and habits.
- Upcoming commitments.

Example:

Observed:
- Last night's sleep: 5 hours.
- Personal average: 7 hours.
- Reported energy: Low.
- Upcoming event: Presentation tomorrow.

Insight:

"Your sleep was shorter than your recent average, and you reported low energy today. These observations may be relevant to how you're feeling. You also have a presentation tomorrow, so consider planning a lighter evening."

Requirements:
- Display the underlying evidence.
- Distinguish observations from interpretations.
- Never claim correlation proves causation.
- Never present the feature as medical diagnosis.

### F4. Personal Memory

Allow users to:
- Save feelings and experiences.
- Save upcoming commitments.
- View remembered context.
- Edit and delete memories.
- Mark commitments as completed.

### F5. Future Radar

Display:
- Upcoming commitments.
- Contextual reminders.
- Suggested preparation reminders.
- Relevant wellbeing observations.

Users should be able to accept, dismiss or snooze reminders.

### F6. Privacy Centre

Display:
- Health data access status.
- Voice processing consent.
- External AI processing consent.
- Personal memory controls.
- Access history.
- Demo data reset and deletion controls.

Clearly distinguish simulated permissions from actual device permissions.

## 6. Main User Journey

1. User opens the SVAYAM dashboard.
2. User views health metrics and personal baseline.
3. User opens Voice Companion.
4. User says or types: "I'm tired today. I have a presentation tomorrow."
5. SVAYAM extracts the feeling and upcoming event.
6. The analytics engine compares the available health data against personal baselines.
7. The intelligence layer generates an evidence-backed insight.
8. The user receives a spoken response.
9. The event is saved to personal memory.
10. Future Radar displays a relevant reminder.

## 7. MVP Scope

### Must Have — P0
- Responsive dashboard.
- Consistent demo health data.
- Voice Companion with text fallback.
- Context extraction for feelings and commitments.
- Deterministic health analytics.
- Connect the Dots insight screen.
- Local personal memory.
- Future Radar reminders.
- Privacy Centre.
- ElevenLabs TTS integration with fallback.
- Functional navigation and demo flow.

### Should Have — P1
- Browser speech recognition.
- Interactive trend charts.
- Editable memory records.
- Reminder snooze and completion.
- Conversation history.
- Responsive mobile layout.

### Future Scope — Not Required for Submission
- Live Health Connect integration.
- Direct Fire-Boltt synchronisation.
- Full Android native implementation.
- Full MCP agent ecosystem.
- Multi-user cloud accounts.
- Advanced predictive models.
- Medical recommendations.
- Full iOS integration.

## 8. Non-Functional Requirements

- Easy to understand within 30 seconds.
- Core demo flow should complete within 3 minutes.
- Responsive on desktop and mobile.
- No dead buttons.
- Consistent sample data across screens.
- No exposed API keys.
- Graceful handling of unavailable external services.
- Clear distinction between live and simulated functionality.

## 9. Success Criteria

The MVP is successful when a judge can:

1. View a meaningful personal health dashboard.
2. Speak or type a personal update.
3. See that the system understands the user's context.
4. View a relevant insight backed by actual sample metrics.
5. See the upcoming commitment in Future Radar.
6. Inspect privacy controls.
7. Experience a spoken response when voice services are available.

## 10. Product Boundaries

SVAYAM is a personal wellbeing intelligence companion, not a medical device.

It must not:
- Diagnose diseases.
- Prescribe medication.
- Claim that sleep or activity definitively caused a feeling.
- Invent health measurements.
- Claim live wearable integration when using demo records.

**MVP principle:** Demonstrate the core intelligence journey reliably rather than attempting to implement every planned integration.