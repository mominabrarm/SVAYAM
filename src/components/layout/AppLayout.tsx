import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast, dismissToast } = useApp();

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col font-sans">
      {/* Sticky Top Horizontal Navigation Bar */}
      <Navbar />

      {/* Main Content Area Spanning Full Width (Centered inside clean max-w-[1440px]) */}
      <main className="flex-1 pb-24 md:pb-12 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border-[1.5px] border-[#0A0A0A] shadow-hard text-xs md:text-sm font-bold text-[#0A0A0A] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] fill-[#4DE59B]" />}
          {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-[#0A0A0A] fill-[#FCE354]" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-[#0A0A0A] fill-[#55A8F8]" />}
          <span className="font-medium text-[#0A0A0A]">{toast.message}</span>
          <button 
            onClick={dismissToast} 
            className="text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-full p-1 transition border border-[#0A0A0A]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
