# SVAYAM — Your Data. Your Intelligence.

> **Voice-first, privacy-first personal intelligence companion connecting health metrics, personal feelings, daily habits and upcoming commitments.**  
> Built for **wHACKiest 2026**.

---

## 1. What SVAYAM Does

Most wearables and health apps present disconnected numbers—sleep duration, steps, resting heart rate—without explaining how they relate to how you actually feel or what you need to do today.

**SVAYAM** transforms personal data into personal understanding through a structured 5-stage core loop:

```
LISTEN ──▶ UNDERSTAND ──▶ CONNECT THE DOTS ──▶ EXPLAIN ──▶ GUIDE
```

Instead of stating unproven causal claims or diagnosing medical conditions, SVAYAM:
1. **Listens** via natural voice or text input.
2. **Understands** subjective feelings, energy states, and commitments (e.g., *"I'm tired today. I have a presentation tomorrow."*).
3. **Connects the Dots** deterministically between your objective health records (e.g., 5.0h sleep vs 7.0h baseline, 78 BPM daytime heart rate) and your reported context.
4. **Explains** observations using honest, qualified language (*"Your reported tiredness coincides with shorter-than-usual sleep"*).
5. **Guides** your schedule with proactive preparation reminders in **Future Radar** and remembers key context in **Personal Memory**.

---

## 2. Core Demonstration Scenario

1. **Dashboard Overview**:
   - Sleep: **5.0 hours** (30-day baseline: **7.0 hours** — deficit: **-2.0h**)
   - Daily Steps: **6,240** (Goal: **8,500**)
   - Heart Rate: **78 BPM** (Resting baseline: **72 BPM** — elevation: **+6 BPM**)
   - Reported Energy: **Low**
2. **Voice Interaction**:
   - The user opens Voice Companion and speaks or types:
     > *"I'm tired today. I have a presentation tomorrow."*
3. **Intelligence Processing**:
   - **Context Extracted**: Feeling: *tired*, Energy: *low*, Commitment: *Presentation*, Event Date: *Tomorrow* (calculated dynamically from system date).
   - **Deterministic Comparison**: Sleep is 2.0h below baseline; heart rate is mildly elevated.
   - **Synthesis**: Correlates the fatigue with the sleep deficit and notes the upcoming presentation.
4. **Outcome**:
   - **Spoken Guidance**: Spoken response delivered via ElevenLabs HD voice (or browser Web Speech API fallback).
   - **Personal Memory**: *"Presentation (Tomorrow)"* and *"Reported feeling tired with low energy"* saved to local memory.
   - **Future Radar**: Generates a high-priority preparation reminder: *"Target an early rest window tonight to protect cognitive clarity for tomorrow's presentation."*
   - **Connect the Dots**: Multi-node correlation visualizer with underlying baseline evidence.

---

## 3. Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                              SVAYAM APP                                │
│                                                                        │
│   ┌────────────────────┐   ┌───────────────────┐   ┌───────────────┐   │
│   │  Voice Companion   │   │  Overview / Dash  │   │ Connect Dots  │   │
│   │ (Web Speech / Mic) │   │ (Recharts Trends) │   │ (Reasoning)   │   │
│   └─────────┬──────────┘   └─────────┬─────────┘   └───────┬───────┘   │
│             │                        │                     │           │
│             ▼                        ▼                     ▼           │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                        Shared AppContext                       │   │
│   └───────┬──────────────────────────┬─────────────────────┬───────┘   │
│           │                          │                     │           │
│           ▼                          ▼                     ▼           │
│   ┌───────────────┐          ┌───────────────┐     ┌───────────────┐   │
│   │ Context Engine│          │Analytics Eng. │     │Storage Service│   │
│   │  (Extraction) │          │(Baselines)    │     │ (Local-First) │   │
│   └───────────────┘          └───────────────┘     └───────┬───────┘   │
└────────────────────────────────────────────────────────────┼───────────┘
                                                             │
                                        ┌────────────────────┴──────────┐
                                        │ Browser LocalStorage / Memory │
                                        │ (Zero external health storage)│
                                        └───────────────────────────────┘
```

- **Frontend**: React 18, TypeScript (Strict Mode), Vite, Tailwind CSS, Lucide React icons.
- **Data Visualization**: Recharts (7-day trend vs personal baseline reference line).
- **Voice Recognition**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) with seamless text fallback.
- **Voice Synthesis**: ElevenLabs TTS API via server-side proxy route `/api/tts`, with automatic fallback to browser `speechSynthesis`.
- **Intelligence**: Pure deterministic TypeScript analytics engine with qualified natural-language reasoning.
- **Data Storage**: Local-first storage abstraction with demo reset, export, and complete purge controls.

---

## 4. Live vs Simulated Integrations

To ensure transparency and integrity for wHACKiest 2026:

| Integration | Status | Details |
| :--- | :---: | :--- |
| **Natural Language Extraction** | **LIVE** | Deterministic context parser extracting feelings, energy levels, commitments, and relative dates. |
| **Deterministic Analytics** | **LIVE** | Real mathematical baseline comparison, percentage delta calculations, and trend analysis. |
| **Browser Speech Recognition** | **LIVE** | Real-time microphone listening via Web Speech API in supported browsers (Chrome, Edge, Safari). |
| **ElevenLabs Voice Synthesis** | **LIVE** | Proxied through `/api/tts` when `ELEVENLABS_API_KEY` is provided; falls back gracefully to local speech. |
| **Local Persistence** | **LIVE** | Memories, radar reminders, conversation history, and privacy preferences persist locally. |
| **Health Connect & Smartwatch** | **SIMULATED** | Fictional demonstration health records (labeled clearly as `DEMO DATA`). Designed for future Capacitor/Kotlin plugin integration. |
| **Cloud Storage** | **NONE** | Zero health records or voice audio streams are sent to remote databases. Local-first by design. |

---

## 5. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/svayam.git
cd SVAYAM

# Install dependencies
npm install
```

### Environment Variables (Optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

If you wish to test **ElevenLabs HD Voice synthesis**, populate `.env`:

```env
ELEVENLABS_API_KEY=your_actual_api_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

*Note: If no API key is set, SVAYAM automatically uses your browser's offline `speechSynthesis` engine without error.*

### Running the Application

```bash
# Start development server
npm run dev

# The app is available at: http://localhost:3000
```

### Running Tests

```bash
# Execute automated verification suite
npm test
```

### Production Build

```bash
# Type-check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Privacy & Ethics Statement

SVAYAM is a personal intelligence and wellbeing companion, **not a medical device**.
- It does not diagnose medical conditions or prescribe clinical treatments.
- It uses qualified, non-causal language (*"coincides with shorter-than-usual sleep"* instead of *"caused your tiredness"*).
- All personal memories and health records remain on the user's device.
- API keys, secrets, and personal user data must never be committed to git.

---

## 7. Submission Details

- **Event**: wHACKiest 2026
- **Deadline**: 24 November 2026, 11:59 PM
- **Repository**: [https://github.com/your-username/SVAYAM](https://github.com/your-username/SVAYAM)
- **License**: MIT
