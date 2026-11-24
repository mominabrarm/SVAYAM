import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Overview } from './pages/Overview';
import { VoiceCompanion } from './pages/VoiceCompanion';
import { ConnectTheDots } from './pages/ConnectTheDots';
import { PersonalMemoryPage } from './pages/PersonalMemory';
import { FutureRadar } from './pages/FutureRadar';
import { PrivacyCentre } from './pages/PrivacyCentre';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <AppLayout>
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'voice' && <VoiceCompanion />}
      {activeTab === 'insights' && <ConnectTheDots />}
      {activeTab === 'memory' && <PersonalMemoryPage />}
      {activeTab === 'radar' && <FutureRadar />}
      {activeTab === 'privacy' && <PrivacyCentre />}
    </AppLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
