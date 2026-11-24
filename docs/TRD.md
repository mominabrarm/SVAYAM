# SVAYAM — Technical Requirements Document

**Version:** 1.0  
**Architecture:** Modular, local-first web application  
**Frontend:** React + TypeScript + Vite

## 1. Technical Architecture

The MVP follows a modular frontend architecture.

User Input
→ Input Processing
→ Context Extraction
→ Local Data Retrieval
→ Analytics Engine
→ Contextual Reasoning
→ Personalised Response
→ Voice Output

The architecture must separate deterministic calculations from natural-language generation.

## 2. Technology Stack

### Frontend
- React 18+ with TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui where useful.
- Lucide React icons.
- Recharts.
- Framer Motion for subtle interactions.

### Voice
- Browser Web Speech API for speech recognition where supported.
- ElevenLabs API for text-to-speech.
- Browser speechSynthesis as a fallback.
- Text input must always remain available.

### Intelligence
- TypeScript-based deterministic analytics engine.
- Rule-based context extraction for the MVP.
- Optional LLM integration through a backend adapter.
- No dependency on an LLM for core calculations.

### Data Storage
- IndexedDB for local-first structured records.
- A small storage abstraction layer.
- Seeded demo data.
- Local persistence for memories, commitments and preferences.

### Backend
A minimal Python FastAPI backend may be used for external API calls.

Responsibilities:
- ElevenLabs API proxy.
- Optional LLM proxy.
- Input validation.
- API key protection.

Do not build a complex backend if the frontend can complete the required workflow locally.

## 3. Proposed Project Structure

src/
- app/
  - App.tsx
  - routes.tsx
- components/
  - layout/
  - dashboard/
  - voice/
  - insights/
  - memory/
  - radar/
  - privacy/
  - ui/
- pages/
  - Overview.tsx
  - VoiceCompanion.tsx
  - ConnectTheDots.tsx
  - PersonalMemory.tsx
  - FutureRadar.tsx
  - PrivacyCentre.tsx
- services/
  - voiceService.ts
  - analyticsService.ts
  - contextService.ts
  - memoryService.ts
  - reminderService.ts
  - elevenLabsService.ts
- data/
  - demoHealthData.ts
  - demoUser.ts
- types/
  - health.ts
  - memory.ts
  - conversation.ts
  - insights.ts
- hooks/
- utils/

docs/
- PRD.md
- TRD.md

public/

The implementation may adapt this structure to an existing repository, but should preserve clear separation of responsibilities.

## 4. Data Model

### HealthRecord
- id
- metricType
- value
- unit
- recordedAt
- source
- isDemo

### PersonalBaseline
- metricType
- average
- period
- sampleCount

### PersonalMemory
- id
- category
- content
- createdAt
- updatedAt
- eventDate
- status

### ConversationMessage
- id
- role
- content
- timestamp

### Insight
- id
- title
- observation
- evidence
- explanation
- suggestion
- createdAt

### Reminder
- id
- title
- description
- scheduledFor
- status
- relatedMemoryId

## 5. Analytics Engine

Implement deterministic functions.

### Baseline Comparison
Compare the latest metric with the user's historical average.

Example:
- Current sleep = 5 hours.
- Baseline sleep = 7 hours.
- Difference = -2 hours.

### Energy Context
Compare self-reported energy with available sleep and activity records.

### Insight Generation
Generate insights only when sufficient data exists.

Example rule:

IF reported_energy = low
AND sleep_duration < personal_sleep_baseline

THEN generate an observation that low energy was reported alongside shorter-than-usual sleep.

Do not state that one caused the other.

### Evidence Requirements
Every generated insight must contain:
- The metric observed.
- Its actual value.
- The relevant baseline.
- The user's reported context.
- A clearly qualified interpretation.

## 6. Context Extraction

The MVP should support basic natural-language extraction.

Example:

Input:
"I'm tired today and I have a presentation tomorrow."

Extract:
- Feeling: tired.
- Energy: low.
- Event: presentation.
- Event date: tomorrow.

Use a lightweight parser with explicit supported patterns.

If the date or meaning is ambiguous, ask for clarification or save the original statement without inventing details.

## 7. Voice Architecture

### Speech Input
1. User activates microphone.
2. Browser speech recognition captures speech where supported.
3. Recognised text enters the conversation pipeline.
4. If unavailable, show text input.

### Speech Output
1. Context engine generates response text.
2. Backend sends text to ElevenLabs.
3. Backend returns generated audio.
4. Frontend plays the audio.

### Fallback
If ElevenLabs is unavailable:
- Display the generated response.
- Use browser speechSynthesis where available.
- Never block the main workflow.

### API Security
- Store ElevenLabs API key in server-side environment variables.
- Never put secret API keys in React environment variables or browser code.
- Never commit `.env` files.
- Provide `.env.example` without actual secrets.

## 8. Privacy Architecture

- Store prototype records locally.
- Clearly identify demo records.
- Request external processing consent before sending personal text to external services.
- Send only the minimum required text to ElevenLabs.
- Do not send raw health history to ElevenLabs.
- Do not expose API secrets.
- Provide reset and deletion controls.
- Record simulated access events in the privacy audit view.

Important: local browser storage is appropriate for this prototype but is not equivalent to production-grade encrypted health-data storage.

## 9. UI Requirements

Navigation:
- Overview
- Voice Companion
- Connect the Dots
- Personal Memory
- Future Radar
- Privacy Centre

Design:
- Premium dark charcoal interface.
- Restrained violet and emerald accents.
- Consistent typography and spacing.
- Clear charts and metric cards.
- Minimal animation.
- Responsive layout.

## 10. Error Handling

Handle:
- Unsupported browser speech recognition.
- Microphone permission denied.
- ElevenLabs API failure.
- Network disconnection.
- Empty or invalid user input.
- Missing historical data.
- Invalid or ambiguous event dates.
- Empty local storage.

The app must remain usable if voice services or external APIs fail.

## 11. Testing Requirements

Minimum checks:
- Application starts successfully.
- Production build succeeds.
- All routes render.
- Sidebar navigation works.
- User can submit a text message.
- Context extraction works for the demonstration scenario.
- Analytics produces correct baseline comparisons.
- Memory persists after refresh.
- Reminders can be updated.
- Privacy controls respond correctly.
- Voice fallback works.
- No secrets appear in the repository.

## 12. Build and Deployment

Development:
npm install
npm run dev

Production:
npm run build

Ensure the repository includes:
- README.md
- docs/PRD.md
- docs/TRD.md
- .gitignore
- .env.example
- package.json
- source code

Do not commit:
- node_modules
- dist
- .env
- API keys
- personal health records

## 13. Android Readiness

Keep the frontend compatible with future Capacitor packaging.

Future native integration:
- Capacitor Android.
- Kotlin Health Connect plugin.
- Android Health Connect permission flow.

Do not pretend the web application currently has native Health Connect access.

## 14. Technical Acceptance Criteria

The MVP is technically acceptable when:
- The application builds and runs.
- The primary user journey works without a backend.
- Demo data is consistent.
- Analytics calculations are real and testable.
- Memory and reminders persist locally.
- ElevenLabs is integrated through a secure backend if credentials are available.
- External services have graceful fallbacks.
- The repository is clean and reproducible.