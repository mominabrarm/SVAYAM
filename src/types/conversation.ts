export type MessageRole = 'user' | 'assistant' | 'system';

export interface ExtractedContext {
  feeling?: string;
  reportedEnergy?: 'low' | 'moderate' | 'optimal';
  commitment?: string;
  eventDate?: string;
  eventDateLabel?: string;
  hasExtraction: boolean;
  rawKeywords: string[];
}

export interface ProcessingStep {
  step: 'listen' | 'understand' | 'connect' | 'explain' | 'guide';
  label: string;
  status: 'pending' | 'active' | 'completed';
  detail?: string;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  extractedContext?: ExtractedContext;
  audioUrl?: string;
  ttsProvider?: 'elevenlabs' | 'browser' | 'none';
  processingSteps?: ProcessingStep[];
  relatedInsightId?: string;
}
