import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  RotateCcw, 
  Trash2, 
  Download, 
  AlertTriangle, 
  Server, 
  Smartphone, 
  Eye, 
  Database 
} from 'lucide-react';

export const PrivacyCentre: React.FC = () => {
  const { 
    privacy, 
    updatePrivacy, 
    auditLogs, 
    resetDemoData, 
    clearAllData, 
    memories, 
    reminders 
  } = useApp();

  const handleExportFullArchive = () => {
    const fullData = {
      exportedAt: new Date().toISOString(),
      privacyPreferences: privacy,
      memories,
      reminders,
      auditLogs
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `svayam_privacy_archive_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header */}
      <div className="pb-6 border-b-[1.5px] border-[#0A0A0A] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#4DE59B] px-3 py-0.5 text-xs font-black tracking-wider uppercase text-[#0A0A0A]">
              Privacy-First Architecture
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-tight text-[#0A0A0A] leading-none">
            PRIVACY CENTRE
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
            You own your personal data. Inspect how SVAYAM accesses your health records, controls external processing, and manages local storage.
          </p>
        </div>

        <button
          onClick={handleExportFullArchive}
          className="self-start sm:self-auto px-5 py-3 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center gap-2 active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Archive</span>
        </button>
      </div>

      {/* Honest Storage & Integration Disclosure Banner */}
      <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] p-6 sm:p-8 space-y-3 shadow-hard">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
          <Lock className="w-4 h-4 text-[#0A0A0A]" />
          <span>Transparency & Architectural Boundaries</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-[#0A0A0A] leading-relaxed">
          <strong>Demo Records Notice:</strong> This prototype utilizes consistent simulated health records (Sleep: 5h, Baseline: 7h, Steps: 6,240, HR: 78 BPM). It does not claim a live Android Health Connect or Fire-Boltt hardware connection in this web prototype.
        </p>
        <p className="text-xs font-semibold text-[#525252] leading-relaxed">
          <strong>Local Persistence Notice:</strong> Personal memories, reminders, and preferences are preserved using browser local storage. While completely local to your browser sandbox, this is designed for demo purposes and is not equivalent to production-grade hardware-encrypted secure storage.
        </p>
      </div>

      {/* Granular Privacy Consent Toggles (Tactile & High-Contrast) */}
      <div className="space-y-5">
        <h2 className="font-display font-black text-3xl uppercase tracking-tight text-[#0A0A0A]">
          Data Access & Service Consents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Toggle 1: Health Data Read Access */}
          <div className="p-6 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#0A0A0A]" />
                <span className="text-sm font-black uppercase text-[#0A0A0A]">Health Data Access</span>
              </div>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                Allow SVAYAM to query simulated sleep, steps, and heart rate baselines for correlation analysis.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ healthDataAccess: !privacy.healthDataAccess })}
              className={`w-14 h-8 rounded-full border-[1.5px] border-[#0A0A0A] p-0.5 transition-colors relative shrink-0 shadow-hard-xs ${
                privacy.healthDataAccess ? 'bg-[#4DE59B]' : 'bg-white'
              }`}
            >
              <span className={`block w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform ${
                privacy.healthDataAccess ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 2: External TTS Consent */}
          <div className="p-6 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#0A0A0A]" />
                <span className="text-sm font-black uppercase text-[#0A0A0A]">External Voice Synthesis</span>
              </div>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                Allow sending assistant response text to ElevenLabs for natural speech. When disabled, SVAYAM uses 100% offline browser speech.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ externalTTSConsent: !privacy.externalTTSConsent })}
              className={`w-14 h-8 rounded-full border-[1.5px] border-[#0A0A0A] p-0.5 transition-colors relative shrink-0 shadow-hard-xs ${
                privacy.externalTTSConsent ? 'bg-[#4DE59B]' : 'bg-white'
              }`}
            >
              <span className={`block w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform ${
                privacy.externalTTSConsent ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 3: Strict Local-Only Mode */}
          <div className="p-6 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#0A0A0A]" />
                <span className="text-sm font-black uppercase text-[#0A0A0A]">Strict Offline Mode</span>
              </div>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                Block any network requests. Force both speech recognition and speech synthesis to use standard browser APIs only.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ localOnlyMode: !privacy.localOnlyMode })}
              className={`w-14 h-8 rounded-full border-[1.5px] border-[#0A0A0A] p-0.5 transition-colors relative shrink-0 shadow-hard-xs ${
                privacy.localOnlyMode ? 'bg-[#4DE59B]' : 'bg-white'
              }`}
            >
              <span className={`block w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform ${
                privacy.localOnlyMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 4: Voice Audio Retainment */}
          <div className="p-6 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white shadow-hard flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0A0A0A]" />
                <span className="text-sm font-black uppercase text-[#0A0A0A]">Voice Audio Retainment</span>
              </div>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                SVAYAM never permanently stores audio streams. Audio is converted to text in-memory and discarded.
              </p>
            </div>
            <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-[#4DE59B] text-[#0A0A0A] border-[1.5px] border-[#0A0A0A] shadow-hard-xs">
              Permanently Off
            </span>
          </div>
        </div>
      </div>

      {/* Audit Log / Access History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-3xl uppercase tracking-tight text-[#0A0A0A] flex items-center gap-2">
            <Eye className="w-6 h-6 text-[#0A0A0A]" />
            <span>Simulated Data Access Audit Log</span>
          </h2>
          <span className="text-xs font-bold uppercase px-3 py-1 rounded-full border border-[#0A0A0A] bg-[#FAFAFA] text-[#0A0A0A]">
            {auditLogs.length} events logged
          </span>
        </div>

        <div className="rounded-3xl border-[1.5px] border-[#0A0A0A] bg-white divide-y-[1.5px] divide-[#0A0A0A] max-h-72 overflow-y-auto shadow-hard">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 flex items-center justify-between gap-4 text-xs font-bold">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full border border-[#0A0A0A] text-[10px] uppercase font-black ${
                    log.operation === 'read' ? 'bg-[#55A8F8] text-[#0A0A0A]' :
                    log.operation === 'write' ? 'bg-[#4DE59B] text-[#0A0A0A]' :
                    log.operation === 'delete' ? 'bg-[#FF6B6B] text-[#0A0A0A]' : 'bg-[#E8C6FF] text-[#0A0A0A]'
                  }`}>
                    {log.operation}
                  </span>
                  <span className="text-[#0A0A0A]">{log.resource}</span>
                </div>
                <p className="text-[#525252] text-[11px] font-medium">{log.details}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-[#0A0A0A] block">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-[10px] font-black uppercase text-[#0A0A0A]">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset & Clear Controls */}
      <div className="p-6 sm:p-8 rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] shadow-hard space-y-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase text-[#0A0A0A]">
          <AlertTriangle className="w-5 h-5 text-[#0A0A0A]" />
          <span>Demo Controls & Data Reset</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[#525252] max-w-lg leading-relaxed">
            Resetting restores all demo records (5h sleep, 7h baseline, 6,240 steps, etc.) and clears recent conversations. Purging removes all local browser storage keys completely.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={resetDemoData}
              className="px-5 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FCE354] text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo State</span>
            </button>
            <button
              onClick={clearAllData}
              className="px-5 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FF6B6B] hover:text-white text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all shadow-hard-xs active:scale-95 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Purge Storage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
