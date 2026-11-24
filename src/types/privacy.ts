export interface PrivacySettings {
  healthDataAccess: boolean; // simulated toggle
  voiceAudioStorage: boolean; // whether voice audio is retained (SVAYAM defaults to false)
  externalTTSConsent: boolean; // whether ElevenLabs proxy is allowed to process assistant text
  localOnlyMode: boolean; // force all processing completely inside browser
  analyticsConsent: boolean;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  operation: 'read' | 'write' | 'delete' | 'external_call';
  resource: 'health_records' | 'personal_memory' | 'audio_stream' | 'future_radar' | 'elevenlabs_tts';
  details: string;
  status: 'allowed' | 'blocked' | 'simulated';
}
