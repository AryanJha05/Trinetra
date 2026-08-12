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
import SettingsView from './components/settings/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deploymentEnv, setDeploymentEnv] = useState('Railway Station Demo');
  const [privacyMasking, setPrivacyMasking] = useState(true);
  const [selectedCamForLive, setSelectedCamForLive] = useState('CAM-001');
  const [notificationToast, setNotificationToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Centralized System Settings State
  const [systemSettings, setSystemSettings] = useState({
    appName: 'TRINETRA Surveillance SOC',
    landingPage: 'dashboard',
    language: 'English (US)',
    timeZone: 'Asia/Kolkata (IST)',
    cameraRefreshInterval: '5s',
    detectionSensitivity: 'High',
    crowdThreshold: 70,
    riskThreshold: 65,
    criticalNotifications: true,
    warningNotifications: true,
    soundAlerts: true,
    desktopNotifications: true,
    alertPriority: 'Critical First',
    faceBlurStrength: 80,
    evidenceAccess: 'Supervisor Level',
    dataRetention: '90 Days',
    sessionTimeout: '30 mins',
    twoFactorAuth: true,
    loginActivityLog: true,
    rolePermissions: 'Strict Enterprise RBAC',
    theme: 'Light',
    compactDensity: false,
    sidebarBehavior: 'Expanded',
    reducedMotion: false,
    exportFormat: 'PDF',
    reportFrequency: 'Daily',
    automatedDataExport: false,
    auditLogRetention: '180 Days',
  });

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
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans relative select-none">
      {/* Fixed Floating Notification Toast Overlay (z-[2000]) */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-[2000] max-w-lg bg-slate-900/90 backdrop-blur-md border border-teal-500/50 text-teal-300 rounded-2xl px-4 py-3 shadow-2xl animate-slideInRight font-mono transition-all overflow-hidden flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0"></span>
            <span className="text-xs font-bold truncate text-slate-100">{notificationToast}</span>
          </div>
          <span className="text-[10px] font-semibold flex-shrink-0 bg-teal-500/20 border border-teal-500/30 px-2 py-1 rounded-lg text-teal-300">
            TRINETRA Log
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

      {/* Main Dynamic Page Area */}
      <main className="pl-0 lg:pl-[240px] pt-[64px] min-h-screen w-full bg-slate-50">
        <div className="w-full p-3 sm:p-4 md:p-6 space-y-4">
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
          <SettingsView
            settings={systemSettings}
            onSaveSettings={(newSettings) => setSystemSettings(newSettings)}
            onShowToast={(msg) => {
              setNotificationToast(msg);
              setTimeout(() => setNotificationToast(null), 3500);
            }}
            deploymentEnv={deploymentEnv}
            setDeploymentEnv={setDeploymentEnv}
            privacyMasking={privacyMasking}
            setPrivacyMasking={setPrivacyMasking}
          />
        )}
        </div>
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

