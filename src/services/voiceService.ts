// Voice Service: Browser Speech Recognition & ElevenLabs TTS with Browser Fallback

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';
export type TTSProvider = 'elevenlabs' | 'browser' | 'none';

interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
  message?: string;
}

export class VoiceService {
  private recognition: any = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeechSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSpeechSupported = true;
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
          this.isSpeechSupported = false;
        }
      }
    }
  }

  isRecognitionSupported(): boolean {
    return this.isSpeechSupported;
  }

  isSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. Please use the text input.');
      return false;
    }

    try {
      this.recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let interim = '';
        let final = '';
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }
        onResult(final || interim, Boolean(final));
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        let msg = `Microphone error: ${event.error}`;
        if (event.error === 'not-allowed') {
          msg = 'Microphone access was denied. Please allow microphone permissions or use text.';
        } else if (event.error === 'no-speech') {
          msg = 'No speech was detected. Please try speaking again.';
        }
        onError(msg);
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      onError(e.message || 'Could not start microphone');
      return false;
    }
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore already stopped
      }
    }
  }

  stopSpeaking(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.isSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Speaks text using ElevenLabs backend endpoint if available;
   * otherwise gracefully falls back to browser speechSynthesis.
   */
  async speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): Promise<{ provider: TTSProvider; audioUrl?: string }> {
    this.stopSpeaking();

    // 1. Attempt ElevenLabs Proxy if enabled
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onplay = () => onStart?.();
        audio.onended = () => {
          this.currentAudio = null;
          onEnd?.();
        };
        audio.onerror = () => {
          this.currentAudio = null;
          this.fallbackBrowserSpeech(text, onStart, onEnd, onError);
        };

        await audio.play();
        return { provider: 'elevenlabs', audioUrl };
      }
    } catch {
      // Server proxy not active or offline
    }

    // 2. Graceful fallback to browser speechSynthesis
    return this.fallbackBrowserSpeech(text, onStart, onEnd, onError);
  }

  private fallbackBrowserSpeech(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): { provider: TTSProvider } {
    if (!this.isSynthesisSupported()) {
      onError?.('Audio synthesis is not supported on this browser.');
      onEnd?.();
      return { provider: 'none' };
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick a natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => 
        (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onstart = () => onStart?.();
      utterance.onend = () => onEnd?.();
      utterance.onerror = (e) => {
        console.warn('Browser SpeechSynthesis error:', e);
        onError?.('Speech playback failed');
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
      return { provider: 'browser' };
    } catch (e: any) {
      onError?.(e.message || 'Speech playback error');
      onEnd?.();
      return { provider: 'none' };
    }
  }
}

export const voiceService = new VoiceService();
