import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DailyHealthSummary } from '../types/health';
import { PersonalMemory, CreateMemoryInput } from '../types/memory';
import { RadarReminder } from '../types/radar';
import { ConversationMessage, ProcessingStep } from '../types/conversation';
import { PrivacySettings, AccessLogEntry } from '../types/privacy';
import { Insight } from '../types/insights';
import { storageService } from '../services/storageService';
import { processUserInput, IntelligenceResult } from '../services/intelligenceService';
import { generateConnectedInsight } from '../services/analyticsService';
import { voiceService, TTSProvider } from '../services/voiceService';

export type NavigationTab = 'overview' | 'voice' | 'insights' | 'memory' | 'radar' | 'privacy';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  health: DailyHealthSummary;
  setHealth: React.Dispatch<React.SetStateAction<DailyHealthSummary>>;
  memories: PersonalMemory[];
  reminders: RadarReminder[];
  conversations: ConversationMessage[];
  privacy: PrivacySettings;
  auditLogs: AccessLogEntry[];
  currentInsight: Insight;
  isProcessing: boolean;
  activeProcessingStep?: ProcessingStep;
  ttsStatus: TTSProvider;
  isSpeaking: boolean;
  processMessage: (text: string) => Promise<IntelligenceResult>;
  addMemory: (input: CreateMemoryInput) => void;
  updateMemory: (id: string, updates: Partial<PersonalMemory>) => void;
  deleteMemory: (id: string) => void;
  updateReminderStatus: (id: string, status: RadarReminder['status'], snoozeUntil?: string) => void;
  updatePrivacy: (settings: Partial<PrivacySettings>) => void;
  resetDemoData: () => void;
  clearAllData: () => void;
  speakMessage: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  dismissToast: () => void;
  toast: { message: string; type: 'info' | 'success' | 'warning' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [health, setHealth] = useState<DailyHealthSummary>(() => storageService.getCurrentHealth());
  const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getMemories());
  const [reminders, setReminders] = useState<RadarReminder[]>(() => storageService.getReminders());
  const [conversations, setConversations] = useState<ConversationMessage[]>(() => storageService.getConversations());
  const [privacy, setPrivacy] = useState<PrivacySettings>(() => storageService.getPrivacySettings());
  const [auditLogs, setAuditLogs] = useState<AccessLogEntry[]>(() => storageService.getAuditLog());
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeProcessingStep, setActiveProcessingStep] = useState<ProcessingStep | undefined>();
  const [ttsStatus, setTtsStatus] = useState<TTSProvider>('browser');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Generate initial insight
  const [currentInsight, setCurrentInsight] = useState<Insight>(() => generateConnectedInsight(undefined, health));

  // Sync health energy whenever updated
  useEffect(() => {
    setCurrentInsight(generateConnectedInsight(undefined, health));
  }, [health]);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const speakMessage = useCallback(async (text: string) => {
    if (!privacy.externalTTSConsent && !voiceService.isSynthesisSupported()) {
      showToast('Voice playback disabled by privacy policy or unsupported browser.', 'warning');
      return;
    }

    setIsSpeaking(true);
    const result = await voiceService.speak(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      (err) => {
        setIsSpeaking(false);
        showToast(err, 'warning');
      }
    );
    setTtsStatus(result.provider);
  }, [privacy.externalTTSConsent, showToast]);

  const stopSpeaking = useCallback(() => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const processMessage = useCallback(async (text: string): Promise<IntelligenceResult> => {
    setIsProcessing(true);

    const userMessage: ConversationMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const nextConversations = [...conversations, userMessage];
    setConversations(nextConversations);
    storageService.saveConversations(nextConversations);

    try {
      const result = await processUserInput(text, (step) => {
        setActiveProcessingStep(step);
      });

      // Update state with result
      setHealth(storageService.getCurrentHealth());
      setMemories(storageService.getMemories());
      setReminders(storageService.getReminders());
      setAuditLogs(storageService.getAuditLog());
      setCurrentInsight(result.insight);

      const assistantMessage: ConversationMessage = {
        id: `msg-asst-${Date.now()}`,
        role: 'assistant',
        content: result.responseText,
        timestamp: new Date().toISOString(),
        extractedContext: result.extractedContext,
        processingSteps: result.steps,
        relatedInsightId: result.insight.id,
      };

      const finalConversations = [...nextConversations, assistantMessage];
      setConversations(finalConversations);
      storageService.saveConversations(finalConversations);

      // Play audio response automatically
      speakMessage(result.responseText);

      showToast('Context connected: Sleep deficit matched with upcoming commitment.', 'success');
      return result;
    } finally {
      setIsProcessing(false);
      setActiveProcessingStep(undefined);
    }
  }, [conversations, speakMessage, showToast]);

  const addMemory = useCallback((input: CreateMemoryInput) => {
    const newMem = storageService.addMemory(input);
    setMemories(storageService.getMemories());
    setAuditLogs(storageService.getAuditLog());
    showToast(`Saved memory: "${newMem.content.slice(0, 30)}..."`, 'success');
  }, [showToast]);

  const updateMemory = useCallback((id: string, updates: Partial<PersonalMemory>) => {
    storageService.updateMemory(id, updates);
    setMemories(storageService.getMemories());
  }, []);

  const deleteMemory = useCallback((id: string) => {
    storageService.deleteMemory(id);
    setMemories(storageService.getMemories());
    setAuditLogs(storageService.getAuditLog());
    showToast('Memory record deleted.', 'info');
  }, [showToast]);

  const updateReminderStatus = useCallback((id: string, status: RadarReminder['status'], snoozeUntil?: string) => {
    storageService.updateReminderStatus(id, status, snoozeUntil);
    setReminders(storageService.getReminders());
    showToast(`Reminder marked as ${status}.`, 'info');
  }, [showToast]);

  const updatePrivacy = useCallback((settings: Partial<PrivacySettings>) => {
    const updated = storageService.updatePrivacySettings(settings);
    setPrivacy(updated);
    setAuditLogs(storageService.getAuditLog());
    showToast('Privacy preferences updated.', 'success');
  }, [showToast]);

  const resetDemoData = useCallback(() => {
    storageService.resetToDemoData();
    setHealth(storageService.getCurrentHealth());
    setMemories(storageService.getMemories());
    setReminders(storageService.getReminders());
    setConversations(storageService.getConversations());
    setPrivacy(storageService.getPrivacySettings());
    setAuditLogs(storageService.getAuditLog());
    setCurrentInsight(generateConnectedInsight(undefined, storageService.getCurrentHealth()));
    showToast('All records reset to default DEMO DATA baseline.', 'info');
  }, [showToast]);

  const clearAllData = useCallback(() => {
    storageService.clearAllData();
    setMemories([]);
    setReminders([]);
    setConversations([]);
    setAuditLogs([]);
    showToast('All local personal memories and history cleared.', 'warning');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        health,
        setHealth,
        memories,
        reminders,
        conversations,
        privacy,
        auditLogs,
        currentInsight,
        isProcessing,
        activeProcessingStep,
        ttsStatus,
        isSpeaking,
        processMessage,
        addMemory,
        updateMemory,
        deleteMemory,
        updateReminderStatus,
        updatePrivacy,
        resetDemoData,
        clearAllData,
        speakMessage,
        stopSpeaking,
        dismissToast,
        toast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
