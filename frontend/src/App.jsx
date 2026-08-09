import React, { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import CommandDashboard from './components/dashboard/CommandDashboard';
import LiveMonitoring from './components/live_monitoring/LiveMonitoring';
import CrowdIntelligence from './components/crowd_intelligence/CrowdIntelligence';
import IncidentAlertCenter from './components/incident_alerts/IncidentAlertCenter';
import WorkforceSafety from './components/workforce_safety/WorkforceSafety';
import OperationalAnalytics from './components/analytics/OperationalAnalytics';
import AuditLogsView from './components/audit/AuditLogsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStation, setSelectedStation] = useState('New Delhi Central');
  const [privacyMasking, setPrivacyMasking] = useState(true);
  const [selectedCamForLive, setSelectedCamForLive] = useState('CAM-202');
  const [notificationToast, setNotificationToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigateToFeed = (camId) => {
    setSelectedCamForLive(camId);
    setActiveTab('live_monitoring');
  };

  const handleNavigateToAlerts = () => {
    setActiveTab('incident_alerts');
  };

  const handleDispatchGuard = (incidentId) => {
    setNotificationToast(`RPF Quick Response Unit dispatched to ${incidentId}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans relative">
      {/* Fixed Top Header (Occupies remaining width from left-0 md:left-[260px] to right-0) */}
      <Header
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        activeAlertCount={4}
        privacyMasking={privacyMasking}
        setPrivacyMasking={setPrivacyMasking}
        onCreateIncident={() => setActiveTab('incident_alerts')}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Fixed Left Sidebar (Fixed 260px width, full viewport height) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Workspace Area (starts at left margin 260px, top padding 72px) */}
      <main className="pl-0 md:pl-[260px] pt-[72px] min-h-screen bg-navy-950 overflow-y-auto transition-all">
        {/* Dispatch Notification Banner */}
        {notificationToast && (
          <div className="m-6 mb-0 p-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-xl font-bold text-xs flex items-center justify-between shadow-xl animate-bounce">
            <span>✅ {notificationToast}</span>
            <span className="text-[10px] font-mono opacity-75 font-normal">RPF Dispatch System Logged</span>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <CommandDashboard
            onNavigateToFeed={handleNavigateToFeed}
            onNavigateToAlerts={handleNavigateToAlerts}
            onDispatchGuard={handleDispatchGuard}
          />
        )}

        {activeTab === 'live_monitoring' && (
          <LiveMonitoring
            privacyMasking={privacyMasking}
            setPrivacyMasking={setPrivacyMasking}
            initialCameraId={selectedCamForLive}
          />
        )}

        {activeTab === 'crowd_intelligence' && <CrowdIntelligence />}

        {activeTab === 'incident_alerts' && (
          <IncidentAlertCenter onDispatchGuard={handleDispatchGuard} />
        )}

        {activeTab === 'workforce_safety' && <WorkforceSafety />}

        {activeTab === 'analytics' && <OperationalAnalytics />}

        {activeTab === 'audit_logs' && <AuditLogsView />}

        {activeTab === 'settings' && (
          <div className="p-8 text-slate-300 space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 font-heading">System Settings & Platform Credits</h2>
              <p className="text-xs text-slate-400 font-mono">Trinetra Platform Config v1.0.0 · Model: YOLOv11x / ByteTrack / VideoMAE</p>
            </div>

            {/* Official SIH 2026 Team Section */}
            <div className="bg-navy-900 border border-[#E4E4DF]/20 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                <h3 className="text-sm font-bold text-white font-heading">Smart India Hackathon 2026 — Official Team Trinetra (SIH1349)</h3>
                <span className="text-[10px] font-bold font-mono bg-railway-mint/20 text-railway-mint border border-railway-mint/40 px-2.5 py-1 rounded-md">
                  Ministry of Railways
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Mahipal</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Aryan Jha</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Sandeep</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Nikita</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Aastha</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white">Smrutirani</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
