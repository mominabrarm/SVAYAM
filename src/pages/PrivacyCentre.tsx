import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  RotateCcw, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-svayam-emerald" />
            <span className="text-xs font-semibold tracking-wider uppercase text-svayam-emerald">
              Privacy-First Architecture
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Privacy Centre & Data Boundaries
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            You own your personal data. Inspect how SVAYAM accesses your health records, controls external processing, and manages local storage.
          </p>
        </div>

        <button
          onClick={handleExportFullArchive}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-subtle border border-white/[0.08] text-slate-200 hover:text-white text-xs font-medium transition flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5 text-svayam-emerald" />
          <span>Export Complete Data Archive</span>
        </button>
      </div>

      {/* Honest Storage & Integration Disclosure Banner */}
      <div className="p-5 rounded-2xl bg-surface-100 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          <Lock className="w-4 h-4 text-svayam-emerald" />
          <span>Transparency & Architectural Boundaries</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Demo Records Notice:</strong> This prototype utilizes consistent simulated health records (Sleep: 5h, Baseline: 7h, Steps: 6,240, HR: 78 BPM). It does not claim a live Android Health Connect or Fire-Boltt hardware connection in this web prototype.
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong>Local Persistence Notice:</strong> Personal memories, reminders, and preferences are preserved using browser local storage (LocalStorage / IndexedDB abstraction). While completely local to your browser, this is designed for demo purposes and is not equivalent to production-grade hardware-encrypted secure storage.
        </p>
      </div>

      {/* Granular Privacy Consent Toggles */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-white tracking-tight">
          Data Access & Service Consents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Toggle 1: Health Data Read Access */}
          <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-svayam-violet-light" />
                <span className="text-sm font-semibold text-slate-200">Health Data Access</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allow SVAYAM to query simulated sleep, steps, and heart rate baselines for correlation analysis.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ healthDataAccess: !privacy.healthDataAccess })}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                privacy.healthDataAccess ? 'bg-svayam-emerald' : 'bg-slate-700'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                privacy.healthDataAccess ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Toggle 2: External TTS Consent */}
          <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-svayam-violet-light" />
                <span className="text-sm font-semibold text-slate-200">External Voice Synthesis</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allow sending assistant response text to ElevenLabs for natural speech. When disabled, SVAYAM uses 100% offline browser speech.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ externalTTSConsent: !privacy.externalTTSConsent })}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                privacy.externalTTSConsent ? 'bg-svayam-emerald' : 'bg-slate-700'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                privacy.externalTTSConsent ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Toggle 3: Strict Local-Only Mode */}
          <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-svayam-emerald" />
                <span className="text-sm font-semibold text-slate-200">Strict Offline Mode</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Block any network requests. Force both speech recognition and speech synthesis to use standard browser APIs only.
              </p>
            </div>
            <button
              onClick={() => updatePrivacy({ localOnlyMode: !privacy.localOnlyMode })}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                privacy.localOnlyMode ? 'bg-svayam-emerald' : 'bg-slate-700'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                privacy.localOnlyMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Toggle 4: Voice Audio Retainment */}
          <div className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-svayam-emerald" />
                <span className="text-sm font-semibold text-slate-200">Voice Audio Retainment</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                SVAYAM never permanently stores audio streams. Audio is converted to text in-memory and discarded.
              </p>
            </div>
            <span className="text-[10px] font-mono font-semibold uppercase px-2 py-1 rounded bg-svayam-emerald/15 text-svayam-emerald border border-svayam-emerald/30">
              Permanently Off
            </span>
          </div>
        </div>
      </div>

      {/* Audit Log / Access History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-400" />
            <span>Simulated Data Access Audit Log</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {auditLogs.length} events logged
          </span>
        </div>

        <div className="rounded-xl bg-surface-100 border border-white/[0.06] divide-y divide-white/[0.04] max-h-72 overflow-y-auto">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] uppercase font-semibold ${
                    log.operation === 'read' ? 'bg-blue-500/15 text-blue-400' :
                    log.operation === 'write' ? 'bg-svayam-emerald/15 text-svayam-emerald' :
                    log.operation === 'delete' ? 'bg-red-500/15 text-red-400' : 'bg-svayam-violet/15 text-svayam-violet-light'
                  }`}>
                    {log.operation}
                  </span>
                  <span className="text-slate-300 font-medium">{log.resource}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{log.details}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-500 block">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-[10px] text-svayam-emerald font-medium capitalize">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset & Clear Controls */}
      <div className="p-5 rounded-2xl bg-surface-100 border border-red-500/20 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Demo Controls & Data Reset</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400 max-w-lg">
            <p>
              Resetting restores all demo records (5h sleep, 7h baseline, 6,240 steps, etc.) and clears recent conversations. Purging removes all local browser storage keys completely.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={resetDemoData}
              className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-surface-subtle border border-white/10 text-slate-200 hover:text-white text-xs font-medium transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Local Storage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
