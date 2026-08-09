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
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      {/* Top Control Room Navigation Bar */}
      <Header
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        activeAlertCount={4}
        privacyMasking={privacyMasking}
        setPrivacyMasking={setPrivacyMasking}
      />

      {/* Main Container Layout */}
      <div className="flex flex-1 relative">
        {/* Persistent Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Screen Container */}
        <main className="flex-1 bg-navy-950 overflow-y-auto min-h-[calc(100vh-61px)]">
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
            <div className="p-6 text-slate-300">
              <h2 className="text-xl font-bold text-white mb-2 font-heading">System Settings</h2>
              <p className="text-xs text-slate-400 font-mono">Trinetra Platform Config v1.0.0 · Model: YOLOv11x / ByteTrack / VideoMAE</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
