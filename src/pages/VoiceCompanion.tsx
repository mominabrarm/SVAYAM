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
  Calendar,
  Compass,
  GitMerge,
  ArrowUpRight
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
    <div className="w-full flex flex-col h-[calc(100vh-8.5rem)] select-none">
      {/* Top Companion Header */}
      <div className="pb-4 border-b-[1.5px] border-[#0A0A0A] flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase italic tracking-tight text-[#0A0A0A] leading-none flex items-center gap-3">
            <span>VOICE COMPANION</span>
            <span className="w-3 h-3 rounded-full border border-[#0A0A0A] bg-[#4DE59B]" />
          </h1>
          <p className="text-xs font-semibold text-[#525252] mt-1">
            Speak or type naturally. SVAYAM connects your feelings and commitments with health records.
          </p>
        </div>

        {/* Audio Synthesis Engine Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white text-xs font-bold text-[#0A0A0A] shadow-hard-xs">
          <span className="text-[#525252] uppercase text-[10px]">Audio:</span>
          <span>
            {ttsStatus === 'elevenlabs' ? 'ElevenLabs HD Voice' : 'Browser Speech'}
          </span>
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="p-1 rounded-full border border-[#0A0A0A] bg-[#FCE354] hover:bg-[#FF6B6B] transition text-[#0A0A0A]"
              title="Stop audio playback"
            >
              <VolumeX className="w-3 h-3" />
            </button>
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#0A0A0A]" />
          )}
        </div>
      </div>

      {/* Mic permission or capability banner if notice needed */}
      {micError && (
        <div className="my-2 p-3.5 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A] text-xs font-bold flex items-center justify-between shadow-hard-xs">
          <div className="flex items-center gap-2">
            <span>{micError}</span>
          </div>
          <button 
            onClick={() => setMicError(null)} 
            className="text-[11px] underline uppercase font-black"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {conversations.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] p-8 shadow-hard max-w-lg space-y-3">
              <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] px-3 py-1 text-xs font-black uppercase text-[#0A0A0A] inline-block mb-1">
                Voice-First Intelligence
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#0A0A0A]">
                HOW ARE YOU FEELING TODAY?
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
                SVAYAM is ready. Share how you're feeling, mention any upcoming commitments, or ask about your sleep and physical metrics.
              </p>
            </div>

            {/* Quick Demo Prompts */}
            <div className="w-full max-w-lg space-y-2.5 text-left">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#525252] text-center">
                Try standard demo prompt
              </p>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-4 rounded-2xl border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FCE354] text-left text-xs sm:text-sm font-bold text-[#0A0A0A] transition-all duration-150 shadow-hard-xs flex items-center justify-between group active:scale-95"
                >
                  <span>"{prompt}"</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0A0A0A] shrink-0 ml-2" />
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
              className={`max-w-[85%] md:max-w-[75%] rounded-3xl p-5 text-sm sm:text-base leading-relaxed border-[1.5px] border-[#0A0A0A] shadow-hard ${
                msg.role === 'user'
                  ? 'bg-[#55A8F8] text-[#0A0A0A] rounded-tr-none font-bold'
                  : 'bg-white text-[#0A0A0A] rounded-tl-none font-medium'
              }`}
            >
              {/* Header Label for Assistant */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b-[1.5px] border-[#0A0A0A]">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SVAYAM Intelligence</span>
                  </div>
                  <button
                    onClick={() => speakMessage(msg.content)}
                    className="flex items-center gap-1 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border border-[#0A0A0A] bg-[#FAFAFA] hover:bg-[#FCE354] text-[#0A0A0A] transition"
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
                <div className="mt-4 pt-3 border-t-[1.5px] border-[#0A0A0A] flex flex-wrap gap-2 text-xs">
                  {msg.extractedContext.feeling && (
                    <div className="px-3 py-1 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A] text-[11px] font-black uppercase flex items-center gap-1">
                      <span>Feeling:</span>
                      <strong>{msg.extractedContext.feeling}</strong>
                    </div>
                  )}
                  {msg.extractedContext.commitment && (
                    <div className="px-3 py-1 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] text-[#0A0A0A] text-[11px] font-black uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Commitment:</span>
                      <strong>{msg.extractedContext.commitment}</strong>
                    </div>
                  )}
                  {msg.extractedContext.eventDateLabel && (
                    <div className="px-3 py-1 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] text-[#0A0A0A] text-[11px] font-black uppercase">
                      {msg.extractedContext.eventDateLabel}
                    </div>
                  )}
                </div>
              )}

              {/* Cross-Screen Navigation Action Pills */}
              {msg.role === 'assistant' && (
                <div className="mt-4 pt-2.5 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('insights')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-black uppercase tracking-wider transition shadow-hard-xs active:scale-95"
                  >
                    <GitMerge className="w-3.5 h-3.5" />
                    <span>View Connected Dots</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('radar')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white text-xs font-black uppercase tracking-wider transition shadow-hard-xs active:scale-95"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Check Future Radar</span>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-[#525252] mt-1.5 px-3 uppercase">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {/* Live Listening Interim Speech Bubble */}
        {isListening && (
          <div className="flex flex-col items-end">
            <div className="max-w-[85%] rounded-3xl rounded-tr-none p-5 bg-[#FCE354] border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] shadow-hard">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] animate-ping" />
                <span>Listening in real-time...</span>
              </div>
              <p className="text-sm font-bold italic">
                {interimTranscript || 'Speak now...'}
              </p>
            </div>
          </div>
        )}

        {/* Active Multi-stage Reasoning Progress Card */}
        {isProcessing && (
          <div className="p-5 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
              <Sparkles className="w-4 h-4 animate-spin text-[#0A0A0A]" />
              <span>Processing Personal Context</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {['LISTEN', 'UNDERSTAND', 'CONNECT', 'EXPLAIN', 'GUIDE'].map((step, idx) => (
                <div 
                  key={step} 
                  className={`py-1.5 px-1 text-center rounded-full text-[9px] font-black uppercase border border-[#0A0A0A] ${
                    activeProcessingStep?.step === step.toLowerCase()
                      ? 'bg-[#0A0A0A] text-white animate-pulse'
                      : idx < 2 ? 'bg-[#4DE59B] text-[#0A0A0A]' : 'bg-[#FAFAFA] text-[#525252]'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            {activeProcessingStep && (
              <p className="text-xs font-bold text-[#262626]">
                {activeProcessingStep.detail}
              </p>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Bar & Input Footer */}
      <div className="pt-4 border-t-[1.5px] border-[#0A0A0A] space-y-3">
        {/* Playful Audio Visualizer Bars (Replacing glowing orbs) */}
        {(isListening || isSpeaking) && (
          <div className="flex items-center justify-center gap-1.5 h-8">
            <span className="w-1.5 h-6 bg-[#0A0A0A] rounded-full animate-bar-1" />
            <span className="w-1.5 h-8 bg-[#55A8F8] rounded-full animate-bar-2" />
            <span className="w-1.5 h-5 bg-[#FCE354] rounded-full animate-bar-3" />
            <span className="w-1.5 h-7 bg-[#4DE59B] rounded-full animate-bar-4" />
            <span className="w-1.5 h-6 bg-[#E8C6FF] rounded-full animate-bar-5" />
            <span className="w-1.5 h-8 bg-[#0A0A0A] rounded-full animate-bar-2" />
            <span className="w-1.5 h-5 bg-[#55A8F8] rounded-full animate-bar-1" />
          </div>
        )}

        {/* Large Tactile Centered Mic Control */}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full border-[2px] border-[#0A0A0A] flex items-center justify-center transition-all duration-150 shadow-hard active:scale-95 ${
              isListening
                ? 'bg-[#FF6B6B] text-white hover:bg-white hover:text-[#0A0A0A]'
                : 'bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A]'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? (
              <MicOff className="w-7 h-7" />
            ) : (
              <Mic className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Text Input Fallback Bar (Pill with crisp outline) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-white p-1.5 rounded-full border-[1.5px] border-[#0A0A0A] shadow-hard-xs focus-within:shadow-hard transition-all"
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
            className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm font-semibold text-[#0A0A0A] placeholder-[#737373] focus:outline-none"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isProcessing}
            className="px-5 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] disabled:opacity-30 disabled:hover:bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between px-2 text-[10px] font-bold text-[#525252] uppercase">
          <span>Voice: {isRecognitionSupported ? 'Web Speech API' : 'Text mode'}</span>
          <span>Local intelligence • No health data leaves your device</span>
        </div>
      </div>
    </div>
  );
};
