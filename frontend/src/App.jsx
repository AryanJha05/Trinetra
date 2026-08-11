import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import CreateIncidentModal from './components/common/CreateIncidentModal';
import CommandDashboard from './components/dashboard/CommandDashboard';
import LiveMonitoring from './components/live_monitoring/LiveMonitoring';
import CrowdIntelligence from './components/crowd_intelligence/CrowdIntelligence';
import CrimePrevention from './components/crime_prevention/CrimePrevention';
import WorkforceSafety from './components/workforce_safety/WorkforceSafety';
import RiskAssessmentEngine from './components/risk_engine/RiskAssessmentEngine';
import IncidentAlertCenter from './components/incident_alerts/IncidentAlertCenter';
import OperationalAnalytics from './components/analytics/OperationalAnalytics';
import ReportExportModal from './components/analytics/ReportExportModal';
import AuditLogsView from './components/audit/AuditLogsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deploymentEnv, setDeploymentEnv] = useState('Railway Station');
  const [privacyMasking, setPrivacyMasking] = useState(true);
  const [selectedCamForLive, setSelectedCamForLive] = useState('CAM-001');
  const [notificationToast, setNotificationToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Dynamic Incidents List state across platform
  const [incidentsList, setIncidentsList] = useState([
    {
      id: 'INC-2026-001',
      title: 'Unattended Object Alert',
      type: 'Unattended Object',
      desc: 'Unattended object stationary for >4 mins near Public Zone B without owner in 10m perimeter.',
      cam: 'CAM-001',
      zone: 'Public Zone B',
      time: '14:28 PM',
      severity: 'CRITICAL',
      conf: '96.4%',
      status: 'PENDING'
    },
    {
      id: 'INC-2026-002',
      title: 'Restricted Perimeter Breach',
      type: 'Perimeter Breach',
      desc: 'Individual detected breaching restricted access compound Gate A.',
      cam: 'CAM-003',
      zone: 'Restricted Access Compound',
      time: '14:25 PM',
      severity: 'CRITICAL',
      conf: '98.1%',
      status: 'PENDING'
    },
    {
      id: 'INC-2026-003',
      title: 'High Crowd Density Warning',
      type: 'Crowd Surge Warning',
      desc: 'Density exceeded 3.8 pax/m² near Zone B transit hall.',
      cam: 'CAM-002',
      zone: 'Zone B Transit Hall',
      time: '14:15 PM',
      severity: 'WARNING',
      conf: '88.5%',
      status: 'TEAM ASSIGNED'
    },
    {
      id: 'INC-2026-004',
      title: 'PPE Helmet Compliance Violation',
      type: 'PPE Violation',
      desc: 'Technician working maintenance sector without high-visibility helmet.',
      cam: 'CAM-004',
      zone: 'Zone D Service Depot',
      time: '13:40 PM',
      severity: 'NOTICE',
      conf: '94.2%',
      status: 'RESOLVED'
    },
    {
      id: 'INC-2026-005',
      title: 'Suspicious Loitering Near Transaction Terminals',
      type: 'Loitering Alert',
      desc: 'Person observed hovering near transaction terminals without activity for >12 mins.',
      cam: 'CAM-002',
      zone: 'Public Access Terminal 4',
      time: '13:18 PM',
      severity: 'WARNING',
      conf: '89.7%',
      status: 'PENDING'
    },
  ]);

  // Demo Live Simulation Interval Effect
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      const simEvents = [
        "AI Telemetry Update: Sector 4 crowd flow peaked at 1,840 pax.",
        "Camera CAM-001 AI Inference Latency: 11ms (Optimal).",
        "DPDP Privacy Engine: 142 faces anonymized in current frame.",
        "Safety Audit Check: Maintenance Yard Worker PPE Compliance 98%.",
        "TRINETRA Command Center: All 1,248 CCTV Nodes Operational."
      ];
      const randomMsg = simEvents[Math.floor(Math.random() * simEvents.length)];
      setNotificationToast(`⚡ Live Simulation: ${randomMsg}`);
      setTimeout(() => setNotificationToast(null), 3500);
    }, 6000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const handleNavigateToFeed = (camId) => {
    setSelectedCamForLive(camId || 'CAM-001');
    setActiveTab('live_monitoring');
  };

  const handleNavigateToAlerts = () => {
    setActiveTab('incident_alerts');
  };

  const handleDispatchGuard = (incidentId) => {
    setIncidentsList(prev =>
      prev.map(inc => inc.id === incidentId ? { ...inc, status: 'TEAM ASSIGNED' } : inc)
    );
    setNotificationToast(`Security Guard Quick Response Unit dispatched to ${incidentId}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleAddIncident = (newIncident) => {
    setIncidentsList(prev => [newIncident, ...prev]);
    setNotificationToast(`New Control Room Incident Logged: ${newIncident.id}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans relative">
      {/* Notification Toast Overlay (z-[2000]) */}
      {notificationToast && (
        <div className="fixed top-16 right-6 z-[2000] max-w-md bg-[#111827] text-white border border-slate-700 rounded-lg px-4 py-3 shadow-lg animate-slideInRight font-sans transition-all overflow-hidden flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
            <span className="text-xs font-medium truncate text-slate-100">{notificationToast}</span>
          </div>
          <span className="text-[10px] font-bold flex-shrink-0 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300">
            SYSTEM LOG
          </span>
        </div>
      )}

      {/* Fixed Top Header */}
      <Header
        deploymentEnv={deploymentEnv}
        setDeploymentEnv={setDeploymentEnv}
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
      <main className="pl-0 md:pl-[260px] pt-[72px] min-h-screen bg-[#F8FAFC] overflow-y-auto transition-all">
        {activeTab === 'dashboard' && (
          <CommandDashboard
            deploymentEnv={deploymentEnv}
            onNavigateToFeed={handleNavigateToFeed}
            onNavigateToAlerts={handleNavigateToAlerts}
            onDispatchGuard={handleDispatchGuard}
            onNavigateToCrowd={() => setActiveTab('crowd_intelligence')}
            onNavigateToSafety={() => setActiveTab('workforce_safety')}
            onNavigateToRisk={() => setActiveTab('risk_engine')}
            incidentsList={incidentsList}
          />
        )}

        {activeTab === 'live_monitoring' && (
          <LiveMonitoring
            deploymentEnv={deploymentEnv}
            privacyMasking={privacyMasking}
            setPrivacyMasking={setPrivacyMasking}
            initialCameraId={selectedCamForLive}
          />
        )}

        {activeTab === 'crowd_intelligence' && (
          <CrowdIntelligence deploymentEnv={deploymentEnv} />
        )}

        {activeTab === 'crime_prevention' && (
          <CrimePrevention
            onNavigateToFeed={handleNavigateToFeed}
            onDispatchGuard={handleDispatchGuard}
          />
        )}

        {activeTab === 'workforce_safety' && (
          <WorkforceSafety deploymentEnv={deploymentEnv} />
        )}

        {activeTab === 'risk_engine' && (
          <RiskAssessmentEngine onNavigateToFeed={handleNavigateToFeed} />
        )}

        {activeTab === 'incident_alerts' && (
          <IncidentAlertCenter
            onDispatchGuard={handleDispatchGuard}
            incidents={incidentsList}
            setIncidents={setIncidentsList}
          />
        )}

        {activeTab === 'analytics' && (
          <OperationalAnalytics
            deploymentEnv={deploymentEnv}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'audit_logs' && <AuditLogsView />}

        {activeTab === 'settings' && (
          <div className="p-6 md:p-8 text-slate-800 space-y-6 max-w-4xl font-sans">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1 font-heading">
                System Settings & Platform Credits
              </h1>
              <p className="text-xs text-slate-500 font-mono">TRINETRA Platform Config v2.4.0 · Models: YOLOv11 / ByteTrack / Explainable AI Engine</p>
            </div>

            {/* Platform Control Settings Panel */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm text-xs font-mono">
              <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-3">AI Vision Model Configurations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span>Inference Acceleration</span>
                  <span className="text-teal-700 font-bold">FP16 TensorRT Engine</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span>ByteTrack IoU Threshold</span>
                  <span className="text-teal-700 font-bold">0.65 Overlap IoU</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span>DPDP Act Privacy Mode</span>
                  <span className="text-emerald-700 font-bold">{privacyMasking ? 'ENABLED (Face Masking)' : 'DISABLED'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span>Security Guard Auto-Dispatch</span>
                  <span className="text-teal-700 font-bold">AUTOMATIC (&gt;90% Conf)</span>
                </div>
              </div>
            </div>

            {/* Official SIH 2026 Team Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Smart India Hackathon 2026 — Official Team Trinetra (SIH1349)</h3>
                <span className="text-[10px] font-bold font-mono bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-md">
                  SIH 2026 GRAND FINALIST
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Aryan Jha</p>
                  <p className="text-[10px] text-teal-400">Senior Systems Architect</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Mahipal</p>
                  <p className="text-[10px] text-teal-400">Full Stack Lead</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Sandeep</p>
                  <p className="text-[10px] text-teal-400">AI Vision Engineer</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Nikita</p>
                  <p className="text-[10px] text-teal-400">Compliance & UI Lead</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Aastha</p>
                  <p className="text-[10px] text-teal-400">Risk Analytics Lead</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-center">
                  <p className="text-sm font-bold text-white font-heading">Smurtirani</p>
                  <p className="text-[10px] text-teal-400">UX & Operations Lead</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Log Event Modal */}
      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitIncident={handleAddIncident}
      />

      {/* Interactive Report Export Modal */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        deploymentEnv={deploymentEnv}
        onShowToast={(msg) => {
          setNotificationToast(msg);
          setTimeout(() => setNotificationToast(null), 4000);
        }}
      />
    </div>
  );
}

