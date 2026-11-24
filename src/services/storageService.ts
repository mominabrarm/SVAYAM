import { PersonalMemory, CreateMemoryInput } from '../types/memory';
import { RadarReminder } from '../types/radar';
import { PrivacySettings, AccessLogEntry } from '../types/privacy';
import { ConversationMessage } from '../types/conversation';
import { DailyHealthSummary } from '../types/health';
import { INITIAL_MEMORIES, INITIAL_REMINDERS } from '../data/initialMemories';
import { DEMO_CURRENT_HEALTH } from '../data/demoHealthData';

const STORAGE_KEYS = {
  MEMORIES: 'svayam_memories_v1',
  REMINDERS: 'svayam_reminders_v1',
  PRIVACY: 'svayam_privacy_v1',
  CONVERSATIONS: 'svayam_conversations_v1',
  AUDIT_LOG: 'svayam_audit_log_v1',
  CURRENT_HEALTH: 'svayam_current_health_v1',
};

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  healthDataAccess: true,
  voiceAudioStorage: false,
  externalTTSConsent: true,
  localOnlyMode: false,
  analyticsConsent: true,
};

class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  }

  // --- Audit Log ---
  getAuditLog(): AccessLogEntry[] {
    return this.getItem<AccessLogEntry[]>(STORAGE_KEYS.AUDIT_LOG, [
      {
        id: 'log-seed-1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        operation: 'read',
        resource: 'health_records',
        details: 'Initialised baseline comparison for sleep & daytime heart rate',
        status: 'simulated'
      }
    ]);
  }

  logAccess(entry: Omit<AccessLogEntry, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLog();
    const newEntry: AccessLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.AUDIT_LOG, [newEntry, ...logs].slice(0, 50));
  }

  // --- Memories ---
  getMemories(): PersonalMemory[] {
    return this.getItem<PersonalMemory[]>(STORAGE_KEYS.MEMORIES, INITIAL_MEMORIES);
  }

  addMemory(input: CreateMemoryInput): PersonalMemory {
    const memories = this.getMemories();
    const newMemory: PersonalMemory = {
      ...input,
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: input.status || 'upcoming'
    };
    const updated = [newMemory, ...memories];
    this.setItem(STORAGE_KEYS.MEMORIES, updated);
    this.logAccess({
      operation: 'write',
      resource: 'personal_memory',
      details: `Saved memory [${input.category}]: "${input.content.slice(0, 40)}..."`,
      status: 'allowed'
    });
    return newMemory;
  }

  updateMemory(id: string, updates: Partial<PersonalMemory>): PersonalMemory | null {
    const memories = this.getMemories();
    const index = memories.findIndex(m => m.id === id);
    if (index === -1) return null;
    memories[index] = {
      ...memories[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.MEMORIES, memories);
    return memories[index];
  }

  deleteMemory(id: string): void {
    const memories = this.getMemories();
    const filtered = memories.filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.MEMORIES, filtered);
    this.logAccess({
      operation: 'delete',
      resource: 'personal_memory',
      details: `Deleted memory record ID ${id}`,
      status: 'allowed'
    });
  }

  // --- Future Radar Reminders ---
  getReminders(): RadarReminder[] {
    return this.getItem<RadarReminder[]>(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS);
  }

  addReminder(reminder: Omit<RadarReminder, 'id' | 'createdAt'>): RadarReminder {
    const reminders = this.getReminders();
    const newReminder: RadarReminder = {
      ...reminder,
      id: `rem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newReminder, ...reminders];
    this.setItem(STORAGE_KEYS.REMINDERS, updated);
    this.logAccess({
      operation: 'write',
      resource: 'future_radar',
      details: `Created radar reminder: "${reminder.title}"`,
      status: 'allowed'
    });
    return newReminder;
  }

  updateReminderStatus(id: string, status: RadarReminder['status'], snoozeUntil?: string): void {
    const reminders = this.getReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index === -1) return;
    reminders[index].status = status;
    if (snoozeUntil) reminders[index].snoozeUntil = snoozeUntil;
    this.setItem(STORAGE_KEYS.REMINDERS, reminders);
  }

  deleteReminder(id: string): void {
    const reminders = this.getReminders();
    this.setItem(STORAGE_KEYS.REMINDERS, reminders.filter(r => r.id !== id));
  }

  // --- Privacy Settings ---
  getPrivacySettings(): PrivacySettings {
    return this.getItem<PrivacySettings>(STORAGE_KEYS.PRIVACY, DEFAULT_PRIVACY_SETTINGS);
  }

  updatePrivacySettings(settings: Partial<PrivacySettings>): PrivacySettings {
    const current = this.getPrivacySettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.PRIVACY, updated);
    this.logAccess({
      operation: 'write',
      resource: 'health_records',
      details: 'Updated privacy consent & data boundary controls',
      status: 'allowed'
    });
    return updated;
  }

  // --- Health State ---
  getCurrentHealth(): DailyHealthSummary {
    return this.getItem<DailyHealthSummary>(STORAGE_KEYS.CURRENT_HEALTH, DEMO_CURRENT_HEALTH);
  }

  updateCurrentHealth(updates: Partial<DailyHealthSummary>): DailyHealthSummary {
    const current = this.getCurrentHealth();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.CURRENT_HEALTH, updated);
    return updated;
  }

  // --- Conversation History ---
  getConversations(): ConversationMessage[] {
    return this.getItem<ConversationMessage[]>(STORAGE_KEYS.CONVERSATIONS, []);
  }

  saveConversations(messages: ConversationMessage[]): void {
    this.setItem(STORAGE_KEYS.CONVERSATIONS, messages);
  }

  // --- Reset & Purge ---
  resetToDemoData(): void {
    this.setItem(STORAGE_KEYS.MEMORIES, INITIAL_MEMORIES);
    this.setItem(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS);
    this.setItem(STORAGE_KEYS.CURRENT_HEALTH, DEMO_CURRENT_HEALTH);
    this.setItem(STORAGE_KEYS.PRIVACY, DEFAULT_PRIVACY_SETTINGS);
    this.setItem(STORAGE_KEYS.CONVERSATIONS, []);
    this.logAccess({
      operation: 'write',
      resource: 'health_records',
      details: 'Reset system to baseline DEMO DATA records',
      status: 'simulated'
    });
  }

  clearAllData(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.MEMORIES);
    localStorage.removeItem(STORAGE_KEYS.REMINDERS);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOG);
    this.setItem(STORAGE_KEYS.PRIVACY, DEFAULT_PRIVACY_SETTINGS);
  }
}

export const storageService = new StorageService();
