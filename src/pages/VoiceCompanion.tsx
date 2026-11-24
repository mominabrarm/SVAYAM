import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Calendar,
  Compass,
  GitMerge
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "I'm tired today. I have a presentation tomorrow.",
  "Why is my heart rate slightly elevated today?",
  "How does my sleep compare to my 30-day baseline?"
];

export const VoiceCompanion: React.FC = () => {
  const { 
    conversations, 
    processMessage, 
    isProcessing, 
    activeProcessingStep, 
    setActiveTab, 
    speakMessage, 
    stopSpeaking, 
    isSpeaking,
    ttsStatus
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRecognitionSupported = voiceService.isRecognitionSupported();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, interimTranscript, isProcessing]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isProcessing) return;

    setInputVal('');
    setMicError(null);
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setInterimTranscript('');
    }

    await processMessage(text);
  };

  const toggleListening = () => {
    setMicError(null);

    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      if (interimTranscript.trim()) {
        handleSend(interimTranscript.trim());
      }
      setInterimTranscript('');
      return;
    }

    const started = voiceService.startListening(
      (transcript, isFinal) => {
        setInterimTranscript(transcript);
        if (isFinal) {
          setIsListening(false);
          setInterimTranscript('');
          handleSend(transcript);
        }
      },
      (error) => {
        setMicError(error);
        setIsListening(false);
        setInterimTranscript('');
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Top Companion Header */}
      <div className="pb-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Voice Companion</span>
            <span className="w-2 h-2 rounded-full bg-svayam-emerald animate-pulse" />
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Speak or type naturally. SVAYAM connects your feelings and commitments with your health records.
          </p>
        </div>

        {/* Audio Synthesis Engine Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 border border-white/[0.06] text-xs">
          <span className="text-slate-400">Audio:</span>
          <span className="font-medium text-slate-200">
            {ttsStatus === 'elevenlabs' ? 'ElevenLabs (HD Voice)' : 'Browser SpeechSynthesis'}
          </span>
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="p-1 rounded hover:bg-white/10 text-svayam-violet-light transition"
              title="Stop audio playback"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
          )}
        </div>
      </div>

      {/* Mic permission or capability banner if notice needed */}
      {micError && (
        <div className="my-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{micError}</span>
          </div>
          <button 
            onClick={() => setMicError(null)} 
            className="text-[11px] underline hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto py-6 space-y-5 pr-2">
        {conversations.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-svayam-violet/20 to-svayam-emerald/20 border border-svayam-violet/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-svayam-violet-light" />
            </div>

            <div className="max-w-md space-y-2">
              <h2 className="text-lg font-semibold text-white">How are you feeling today?</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                SVAYAM is ready. Share how you're feeling, mention any upcoming commitments, or ask about your sleep and physical metrics.
              </p>
            </div>

            {/* Quick Demo Prompts */}
            <div className="w-full max-w-lg space-y-2 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">
                Try standard demo prompt
              </p>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-3 rounded-xl bg-surface-100 hover:bg-surface-subtle border border-white/[0.06] hover:border-svayam-violet/40 text-left text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
                >
                  <span className="font-medium">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-svayam-violet-light transition" />
                </button>
              ))}
            </div>
          </div>
        )}

        {conversations.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-svayam-violet/20 border border-svayam-violet/30 text-white rounded-tr-none'
                  : 'bg-surface-100 border border-white/[0.07] text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              {/* Header Label for Assistant */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-svayam-violet-light">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SVAYAM Intelligence</span>
                  </div>
                  <button
                    onClick={() => speakMessage(msg.content)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                </div>
              )}

              {/* Message Content */}
              <p className="whitespace-pre-wrap">{msg.content}</p>

              {/* Extracted Context Badges for Assistant Responses */}
              {msg.role === 'assistant' && msg.extractedContext?.hasExtraction && (
                <div className="mt-3 pt-3 border-t border-white/[0.05] flex flex-wrap gap-2 text-xs">
                  {msg.extractedContext.feeling && (
                    <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-1">
                      <span>Feeling:</span>
                      <strong className="capitalize">{msg.extractedContext.feeling}</strong>
                    </div>
                  )}
                  {msg.extractedContext.commitment && (
                    <div className="px-2 py-0.5 rounded bg-svayam-violet/15 border border-svayam-violet/30 text-svayam-violet-light text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Commitment:</span>
                      <strong>{msg.extractedContext.commitment}</strong>
                    </div>
                  )}
                  {msg.extractedContext.eventDateLabel && (
                    <div className="px-2 py-0.5 rounded bg-svayam-emerald/10 border border-svayam-emerald/20 text-svayam-emerald text-[11px]">
                      {msg.extractedContext.eventDateLabel}
                    </div>
                  )}
                </div>
              )}

              {/* Cross-Screen Navigation Action Pills */}
              {msg.role === 'assistant' && (
                <div className="mt-3 pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('insights')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white text-xs transition"
                  >
                    <GitMerge className="w-3 h-3 text-svayam-emerald" />
                    <span>View Connected Dots</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('radar')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white text-xs transition"
                  >
                    <Compass className="w-3 h-3 text-svayam-violet-light" />
                    <span>Check Future Radar</span>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-2">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {/* Live Listening Interim Speech Bubble */}
        {isListening && (
          <div className="flex flex-col items-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-none p-4 bg-svayam-violet/10 border border-svayam-violet/30 text-slate-200">
              <div className="flex items-center gap-2 text-xs text-svayam-violet-light mb-1">
                <span className="w-2 h-2 rounded-full bg-svayam-violet animate-ping" />
                <span>Listening in real-time...</span>
              </div>
              <p className="text-sm italic">
                {interimTranscript || 'Speak now...'}
              </p>
            </div>
          </div>
        )}

        {/* Active Multi-stage Reasoning Progress Card */}
        {isProcessing && (
          <div className="p-4 rounded-xl bg-surface-100 border border-white/[0.08] space-y-3 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Layers className="w-4 h-4 text-svayam-violet-light animate-spin" />
              <span>Processing Personal Context</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {['LISTEN', 'UNDERSTAND', 'CONNECT', 'EXPLAIN', 'GUIDE'].map((step, idx) => (
                <div 
                  key={step} 
                  className={`py-1 px-1 text-center rounded text-[9px] font-mono font-semibold uppercase ${
                    activeProcessingStep?.step === step.toLowerCase()
                      ? 'bg-svayam-violet text-white animate-pulse'
                      : idx < 2 ? 'bg-svayam-emerald/20 text-svayam-emerald' : 'bg-white/[0.04] text-slate-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            {activeProcessingStep && (
              <p className="text-xs text-slate-400 font-mono">
                {activeProcessingStep.detail}
              </p>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Bar & Input Footer */}
      <div className="pt-3 border-t border-white/[0.06]">
        {/* Large Centered Mic Control */}
        <div className="flex items-center justify-center mb-3">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <>
                <span className="absolute w-16 h-16 rounded-full bg-svayam-violet/30 animate-ping" />
                <span className="absolute w-20 h-20 rounded-full bg-svayam-violet/15 animate-pulse" />
              </>
            )}
            <button
              onClick={toggleListening}
              className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? 'bg-red-500 text-white shadow-red-500/30 scale-105'
                  : 'bg-svayam-violet hover:bg-svayam-violet-dark text-white shadow-svayam-violet/30 hover:scale-105'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 animate-pulse" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Text Input Fallback Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-surface-100 p-2 rounded-xl border border-white/[0.08] focus-within:border-svayam-violet/50 transition shadow-inner"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              isRecognitionSupported 
                ? "Speak using the microphone or type here..." 
                : "Type your thoughts, feelings or commitments here..."
            }
            className="flex-1 bg-transparent px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isProcessing}
            className="px-4 py-2 rounded-lg bg-svayam-violet disabled:opacity-40 disabled:hover:bg-svayam-violet hover:bg-svayam-violet-dark text-white text-xs font-medium transition flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500">
          <span>Voice recognition: {isRecognitionSupported ? 'Available (Web Speech API)' : 'Text mode active'}</span>
          <span>Local intelligence • No health data leaves your device</span>
        </div>
      </div>
    </div>
  );
};
