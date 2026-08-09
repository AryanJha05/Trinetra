import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import CreateIncidentModal from './components/common/CreateIncidentModal';
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Dynamic Incidents List state
  const [incidentsList, setIncidentsList] = useState([
    {
      id: 'INC-2026-892',
      title: 'Unattended Object Detected',
      type: 'Unattended Object',
      desc: 'Black backpack stationary for >5 mins near Platform 3 Pillar 12 without owner in 10m perimeter.',
      cam: 'CAM-202',
      zone: 'Platform 3, Sector B',
      time: '10:42 AM',
      severity: 'CRITICAL',
      conf: '96.4%',
      status: 'PENDING'
    },
    {
      id: 'INC-2026-887',
      title: 'Unauthorized Perimeter Access',
      type: 'Perimeter Breach',
      desc: 'Individual detected in non-uniform clothing breaching maintenance yard Gate 4.',
      cam: 'CAM-042',
      zone: 'Maintenance Yard B',
      time: '10:15 AM',
      severity: 'CRITICAL',
      conf: '92.1%',
      status: 'PENDING'
    },
    {
      id: 'INC-2026-881',
      title: 'High Crowd Surge Warning',
      type: 'Crowd Surge Warning',
      desc: 'Commuter density exceeded 3.8 pax/m² near North FOB staircase due to delayed Express Train 1204.',
      cam: 'CAM-301',
      zone: 'Platform 2 North',
      time: '09:50 AM',
      severity: 'WARNING',
      conf: '88.5%',
      status: 'TEAM ASSIGNED'
    },
    {
      id: 'INC-2026-875',
      title: 'PPE Helmet Compliance Violation',
      type: 'PPE Violation',
      desc: 'Technician working track maintenance line without high-visibility helmet.',
      cam: 'CAM-200',
      zone: 'Service Hall B',
      time: '08:30 AM',
      severity: 'NOTICE',
      conf: '94.2%',
      status: 'RESOLVED'
    },
  ]);

  // Demo Live Simulation Interval Effect
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      const simEvents = [
        "AI Telemetry Update: Platform 4 crowd flow peaked at 1,840 pax.",
        "Camera CAM-202 AI Inference Latency: 11ms (Optimal).",
        "DPDP Privacy Engine: 142 faces anonymized in current frame.",
        "Safety Audit Check: Maintenance Yard B Worker PPE Compliance 100%.",
        "RPF Control Center: All 1,248 CCTV Nodes Operational."
      ];
      const randomMsg = simEvents[Math.floor(Math.random() * simEvents.length)];
      setNotificationToast(`⚡ Live Simulation: ${randomMsg}`);
      setTimeout(() => setNotificationToast(null), 3500);
    }, 6000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const handleNavigateToFeed = (camId) => {
    setSelectedCamForLive(camId);
    setActiveTab('live_monitoring');
  };

  const handleNavigateToAlerts = () => {
    setActiveTab('incident_alerts');
  };

  const handleDispatchGuard = (incidentId) => {
    setIncidentsList(prev =>
      prev.map(inc => inc.id === incidentId ? { ...inc, status: 'TEAM ASSIGNED' } : inc)
    );
    setNotificationToast(`RPF Quick Response Unit dispatched to ${incidentId}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleAddIncident = (newIncident) => {
    setIncidentsList(prev => [newIncident, ...prev]);
    setNotificationToast(`New Control Room Incident Logged: ${newIncident.id}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-slate-900 flex flex-col font-sans relative">
      {/* Fixed Floating Notification Toast Overlay (z-[2000]) */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-[2000] max-w-md p-4 bg-slate-900 border border-emerald-500/50 text-emerald-400 rounded-2xl font-bold text-xs flex items-center justify-between space-x-4 shadow-2xl animate-slideInRight font-mono transition-all">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
            <span className="truncate">{notificationToast}</span>
          </div>
          <span className="text-[10px] opacity-75 font-normal flex-shrink-0 bg-slate-800 px-2 py-1 rounded-md text-slate-300">Trinetra Logged</span>
        </div>
      )}

      {/* Fixed Top Header */}
      <Header
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        activeAlertCount={incidentsList.filter(i => i.status !== 'RESOLVED').length}
        privacyMasking={privacyMasking}
        setPrivacyMasking={setPrivacyMasking}
        onCreateIncident={() => setIsCreateModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onSelectCamera={(camId) => handleNavigateToFeed(camId)}
      />

      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Workspace Container */}
      <main className="pl-0 md:pl-[260px] pt-[72px] min-h-screen bg-[#F4F4F0] overflow-y-auto transition-all">
        {activeTab === 'dashboard' && (
          <CommandDashboard
            onNavigateToFeed={handleNavigateToFeed}
            onNavigateToAlerts={handleNavigateToAlerts}
            onDispatchGuard={handleDispatchGuard}
            onNavigateToCrowd={() => setActiveTab('crowd_intelligence')}
            onNavigateToSafety={() => setActiveTab('workforce_safety')}
            incidentsList={incidentsList}
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
          <IncidentAlertCenter
            onDispatchGuard={handleDispatchGuard}
            incidents={incidentsList}
            setIncidents={setIncidentsList}
          />
        )}

        {activeTab === 'workforce_safety' && <WorkforceSafety />}

        {activeTab === 'analytics' && <OperationalAnalytics />}

        {activeTab === 'audit_logs' && <AuditLogsView />}

        {activeTab === 'settings' && (
          <div className="p-8 text-slate-800 space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1 font-heading">System Settings & Platform Credits</h2>
              <p className="text-xs text-slate-500 font-mono">Trinetra Platform Config v1.0.0 · Model: YOLOv11x / ByteTrack / VideoMAE</p>
            </div>

            {/* Platform Control Settings Panel */}
            <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4 shadow-sm text-xs font-mono">
              <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-3">AI Vision Model Configurations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span>AI Inference Precision</span>
                  <span className="text-blue-600 font-bold">FP16 TensorRT</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span>ByteTrack Overlap Threshold</span>
                  <span className="text-blue-600 font-bold">0.65 IoU</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span>DPDP Act Privacy Mode</span>
                  <span className="text-emerald-600 font-bold">{privacyMasking ? 'ENABLED (Face Masking Active)' : 'DISABLED'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span>RPF Alert Auto-Dispatch</span>
                  <span className="text-blue-600 font-bold">AUTOMATIC (&gt;90% Conf)</span>
                </div>
              </div>
            </div>

            {/* Official SIH 2026 Team Section */}
            <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Smart India Hackathon 2026 — Official Team Trinetra (SIH1349)</h3>
                <span className="text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md">
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

      {/* Interactive New Incident Report Modal */}
      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitIncident={handleAddIncident}
      />
    </div>
  );
}
