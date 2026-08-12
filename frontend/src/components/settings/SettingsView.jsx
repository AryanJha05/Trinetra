import React, { useState } from 'react';
import {
  Sliders,
  Video,
  Bell,
  Shield,
  Lock,
  Palette,
  FileText,
  Save,
  RotateCcw,
  X,
  CheckCircle2,
  Cpu,
  Globe,
  Eye,
  SlidersHorizontal,
  Server
} from 'lucide-react';
import Button from '../common/Button';

const CATEGORIES = [
  { id: 'general', label: 'General', icon: Sliders, desc: 'Application branding, site environment, and localization' },
  { id: 'monitoring', label: 'Monitoring', icon: Video, desc: 'Camera refresh, detection sensitivity, and threat thresholds' },
  { id: 'alerts', label: 'Alerts', icon: Bell, desc: 'Incident dispatch notifications, sound sirens, and priorities' },
  { id: 'privacy', label: 'Privacy', icon: Shield, desc: 'DPDP Act compliance, face blur, and evidence anonymization' },
  { id: 'security', label: 'Security', icon: Lock, desc: 'Session timeout, two-factor auth, and RBAC permissions' },
  { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Theme colors, interface density, and animation preferences' },
  { id: 'data_reports', label: 'Data & Reports', icon: FileText, desc: 'Export file formats, scheduled digests, and audit logs' },
];

export default function SettingsView({
  settings,
  onSaveSettings,
  onShowToast,
  deploymentEnv,
  setDeploymentEnv,
  privacyMasking,
  setPrivacyMasking
}) {
  const [activeCategory, setActiveCategory] = useState('general');

  // Draft state initialized from props
  const [draft, setDraft] = useState({
    // General
    appName: settings?.appName || 'TRINETRA Surveillance SOC',
    deploymentEnv: deploymentEnv || 'Railway Station',
    landingPage: settings?.landingPage || 'dashboard',
    language: settings?.language || 'English (US)',
    timeZone: settings?.timeZone || 'Asia/Kolkata (IST)',

    // Monitoring
    cameraRefreshInterval: settings?.cameraRefreshInterval || '5s',
    detectionSensitivity: settings?.detectionSensitivity || 'High',
    crowdThreshold: settings?.crowdThreshold || 70,
    riskThreshold: settings?.riskThreshold || 65,

    // Alerts
    criticalNotifications: settings?.criticalNotifications ?? true,
    warningNotifications: settings?.warningNotifications ?? true,
    soundAlerts: settings?.soundAlerts ?? true,
    desktopNotifications: settings?.desktopNotifications ?? true,
    alertPriority: settings?.alertPriority || 'Critical First',

    // Privacy
    privacyMasking: privacyMasking ?? true,
    faceBlurStrength: settings?.faceBlurStrength || 80,
    evidenceAccess: settings?.evidenceAccess || 'Supervisor Level',
    dataRetention: settings?.dataRetention || '90 Days',

    // Security
    sessionTimeout: settings?.sessionTimeout || '30 mins',
    twoFactorAuth: settings?.twoFactorAuth ?? true,
    loginActivityLog: settings?.loginActivityLog ?? true,
    rolePermissions: settings?.rolePermissions || 'Strict Enterprise RBAC',

    // Appearance
    theme: settings?.theme || 'Light',
    compactDensity: settings?.compactDensity ?? false,
    sidebarBehavior: settings?.sidebarBehavior || 'Expanded',
    reducedMotion: settings?.reducedMotion ?? false,

    // Data & Reports
    exportFormat: settings?.exportFormat || 'PDF',
    reportFrequency: settings?.reportFrequency || 'Daily',
    automatedDataExport: settings?.automatedDataExport ?? false,
    auditLogRetention: settings?.auditLogRetention || '180 Days',
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (key, value) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Apply changes to global parent handlers if synced
    if (draft.deploymentEnv !== deploymentEnv && setDeploymentEnv) {
      setDeploymentEnv(draft.deploymentEnv);
    }
    if (draft.privacyMasking !== privacyMasking && setPrivacyMasking) {
      setPrivacyMasking(draft.privacyMasking);
    }
    if (onSaveSettings) {
      onSaveSettings(draft);
    }
    setHasChanges(false);
    if (onShowToast) {
      onShowToast('✓ System Settings updated and saved successfully.');
    }
  };

  const handleReset = () => {
    const defaultState = {
      appName: 'TRINETRA Surveillance SOC',
      deploymentEnv: 'Railway Station',
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
      privacyMasking: true,
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
    };
    setDraft(defaultState);
    if (setDeploymentEnv) setDeploymentEnv('Railway Station');
    if (setPrivacyMasking) setPrivacyMasking(true);
    if (onSaveSettings) onSaveSettings(defaultState);
    setHasChanges(false);
    if (onShowToast) {
      onShowToast('↺ Settings restored to default configuration.');
    }
  };

  const handleCancel = () => {
    setDraft({
      appName: settings?.appName || 'TRINETRA Surveillance SOC',
      deploymentEnv: deploymentEnv || 'Railway Station',
      landingPage: settings?.landingPage || 'dashboard',
      language: settings?.language || 'English (US)',
      timeZone: settings?.timeZone || 'Asia/Kolkata (IST)',
      cameraRefreshInterval: settings?.cameraRefreshInterval || '5s',
      detectionSensitivity: settings?.detectionSensitivity || 'High',
      crowdThreshold: settings?.crowdThreshold || 70,
      riskThreshold: settings?.riskThreshold || 65,
      criticalNotifications: settings?.criticalNotifications ?? true,
      warningNotifications: settings?.warningNotifications ?? true,
      soundAlerts: settings?.soundAlerts ?? true,
      desktopNotifications: settings?.desktopNotifications ?? true,
      alertPriority: settings?.alertPriority || 'Critical First',
      privacyMasking: privacyMasking ?? true,
      faceBlurStrength: settings?.faceBlurStrength || 80,
      evidenceAccess: settings?.evidenceAccess || 'Supervisor Level',
      dataRetention: settings?.dataRetention || '90 Days',
      sessionTimeout: settings?.sessionTimeout || '30 mins',
      twoFactorAuth: settings?.twoFactorAuth ?? true,
      loginActivityLog: settings?.loginActivityLog ?? true,
      rolePermissions: settings?.rolePermissions || 'Strict Enterprise RBAC',
      theme: settings?.theme || 'Light',
      compactDensity: settings?.compactDensity ?? false,
      sidebarBehavior: settings?.sidebarBehavior || 'Expanded',
      reducedMotion: settings?.reducedMotion ?? false,
      exportFormat: settings?.exportFormat || 'PDF',
      reportFrequency: settings?.reportFrequency || 'Daily',
      automatedDataExport: settings?.automatedDataExport ?? false,
      auditLogRetention: settings?.auditLogRetention || '180 Days',
    });
    setHasChanges(false);
    if (onShowToast) {
      onShowToast('Unsaved changes discarded.');
    }
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div className="w-full space-y-6 font-sans text-slate-900 select-none">
      {/* Settings Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
            Settings & System Configuration
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            TRINETRA Enterprise Platform v2.4.0 · SOC Security & AI Model Parameters
          </p>
        </div>

        {/* Global Save / Cancel / Reset Action Toolbar */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={handleReset}
            title="Restore default configuration"
          >
            Reset
          </Button>
          {hasChanges && (
            <Button
              variant="secondary"
              size="sm"
              icon={X}
              onClick={handleCancel}
              title="Discard unsaved changes"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSave}
            className={hasChanges ? 'ring-2 ring-slate-900 ring-offset-1' : ''}
            title="Save configuration changes"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Category Picker dropdown */}
      <div className="md:hidden w-full">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
          Category
        </label>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main 2-Column Responsive CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">
        {/* LEFT COLUMN: Categories Navigation (Desktop) */}
        <div className="hidden md:flex flex-col space-y-1 bg-white border border-slate-200 rounded-xl p-2 shadow-2xs">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Active Category Configuration Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 font-heading flex items-center space-x-2">
              <span>{currentCategoryObj.label} Settings</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-sans">{currentCategoryObj.desc}</p>
          </div>

          {/* CATEGORY: GENERAL */}
          {activeCategory === 'general' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={draft.appName}
                    onChange={(e) => updateField('appName', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Deployment Environment Site
                  </label>
                  <select
                    value={draft.deploymentEnv}
                    onChange={(e) => updateField('deploymentEnv', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:outline-none"
                  >
                    <option value="Railway Station">Railway Site</option>
                    <option value="Airport">Airport Site</option>
                    <option value="Smart City">Smart City Site</option>
                    <option value="Industrial Facility">Industrial Site</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Default Landing Page
                  </label>
                  <select
                    value={draft.landingPage}
                    onChange={(e) => updateField('landingPage', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="dashboard">Command Center Dashboard</option>
                    <option value="live_monitoring">Live CCTV Monitoring Matrix</option>
                    <option value="incident_alerts">Incident Alert Center</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Language & Regional Locale
                  </label>
                  <select
                    value={draft.language}
                    onChange={(e) => updateField('language', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Hindi (IN)">Hindi (ભારત / भारत)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    System Time Zone
                  </label>
                  <input
                    type="text"
                    value={draft.timeZone}
                    onChange={(e) => updateField('timeZone', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: MONITORING */}
          {activeCategory === 'monitoring' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Camera Refresh Interval
                  </label>
                  <select
                    value={draft.cameraRefreshInterval}
                    onChange={(e) => updateField('cameraRefreshInterval', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="2s">2 seconds (Real-Time Ultra)</option>
                    <option value="5s">5 seconds (Recommended)</option>
                    <option value="10s">10 seconds (Balanced)</option>
                    <option value="30s">30 seconds (Power Saver)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    AI Object Detection Sensitivity
                  </label>
                  <select
                    value={draft.detectionSensitivity}
                    onChange={(e) => updateField('detectionSensitivity', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Low">Low (Reduce False Positives)</option>
                    <option value="Medium">Medium (Balanced)</option>
                    <option value="High">High (Recommended)</option>
                    <option value="Ultra">Ultra (High Recall SOC)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800 text-xs">
                      Crowd Monitoring Threshold Trigger
                    </label>
                    <span className="font-mono text-xs font-bold text-teal-700">{draft.crowdThreshold}% Capacity</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={draft.crowdThreshold}
                    onChange={(e) => updateField('crowdThreshold', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Triggers automated crowd surge warnings when spatial density breaches threshold.</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800 text-xs">
                      XAI Threat Risk Threshold Trigger
                    </label>
                    <span className="font-mono text-xs font-bold text-teal-700">{draft.riskThreshold}% Risk Index</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={draft.riskThreshold}
                    onChange={(e) => updateField('riskThreshold', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Automatic guard dispatch recommended when composite threat risk breaches threshold.</p>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: ALERTS */}
          {activeCategory === 'alerts' && (
            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Critical Incident Notifications</h4>
                    <p className="text-[11px] text-slate-500">Immediate popups for unattended objects, perimeter breaches & fire hazard alerts.</p>
                  </div>
                  <button
                    onClick={() => updateField('criticalNotifications', !draft.criticalNotifications)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.criticalNotifications ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.criticalNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Warning Notifications</h4>
                    <p className="text-[11px] text-slate-500">Alerts for elevated crowd accumulation & PPE non-compliance notices.</p>
                  </div>
                  <button
                    onClick={() => updateField('warningNotifications', !draft.warningNotifications)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.warningNotifications ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.warningNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">SOC Console Sound Siren</h4>
                    <p className="text-[11px] text-slate-500">Audible siren ping on critical security dispatches.</p>
                  </div>
                  <button
                    onClick={() => updateField('soundAlerts', !draft.soundAlerts)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.soundAlerts ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Desktop Push Notifications</h4>
                    <p className="text-[11px] text-slate-500">Browser background notifications when SOC window is minimized.</p>
                  </div>
                  <button
                    onClick={() => updateField('desktopNotifications', !draft.desktopNotifications)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.desktopNotifications ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.desktopNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                  Alert Queue Priority Order
                </label>
                <select
                  value={draft.alertPriority}
                  onChange={(e) => updateField('alertPriority', e.target.value)}
                  className="w-full sm:w-1/2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                >
                  <option value="Critical First">Severity Order (Critical First)</option>
                  <option value="Chronological">Chronological Order (Newest First)</option>
                </select>
              </div>
            </div>
          )}

          {/* CATEGORY: PRIVACY */}
          {activeCategory === 'privacy' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div>
                  <h4 className="font-bold text-emerald-900 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-emerald-700" />
                    <span>DPDP Act Compliance Privacy Engine</span>
                  </h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Automated Gaussian facial anonymization active across all live CCTV feeds.</p>
                </div>
                <button
                  onClick={() => updateField('privacyMasking', !draft.privacyMasking)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    draft.privacyMasking ? 'bg-emerald-700' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      draft.privacyMasking ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800 text-xs">
                      Face Anonymization Blur Strength
                    </label>
                    <span className="font-mono text-xs font-bold text-emerald-700">{draft.faceBlurStrength}% Blur</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={draft.faceBlurStrength}
                    onChange={(e) => updateField('faceBlurStrength', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono text-[10px]">
                      Evidence Access Control Level
                    </label>
                    <select
                      value={draft.evidenceAccess}
                      onChange={(e) => updateField('evidenceAccess', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                    >
                      <option value="Operator Level">SOC Operator Level</option>
                      <option value="Supervisor Level">Supervisor Level (Encrypted)</option>
                      <option value="Admin Level">Master Security Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono text-[10px]">
                      CCTV Video Evidence Retention
                    </label>
                    <select
                      value={draft.dataRetention}
                      onChange={(e) => updateField('dataRetention', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                    >
                      <option value="30 Days">30 Days Standard</option>
                      <option value="60 Days">60 Days Extended</option>
                      <option value="90 Days">90 Days Enterprise (Recommended)</option>
                      <option value="180 Days">180 Days Legal Hold</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: SECURITY */}
          {activeCategory === 'security' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Session Inactivity Timeout
                  </label>
                  <select
                    value={draft.sessionTimeout}
                    onChange={(e) => updateField('sessionTimeout', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="15 mins">15 minutes (High Security)</option>
                    <option value="30 mins">30 minutes (Standard SOC)</option>
                    <option value="60 mins">60 minutes (Shift Operations)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Access Permission Architecture
                  </label>
                  <select
                    value={draft.rolePermissions}
                    onChange={(e) => updateField('rolePermissions', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Strict Enterprise RBAC">Strict Enterprise RBAC</option>
                    <option value="Supervisor Bypass Mode">Supervisor Bypass Mode</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                    <p className="text-[11px] text-slate-500">Require hardware key or TOTP code for security dispatches.</p>
                  </div>
                  <button
                    onClick={() => updateField('twoFactorAuth', !draft.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.twoFactorAuth ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Audit Logging of Operator Actions</h4>
                    <p className="text-[11px] text-slate-500">Log all camera stream access, dispatches, and parameter modifications.</p>
                  </div>
                  <button
                    onClick={() => updateField('loginActivityLog', !draft.loginActivityLog)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.loginActivityLog ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.loginActivityLog ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: APPEARANCE */}
          {activeCategory === 'appearance' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Color Theme Mode
                  </label>
                  <select
                    value={draft.theme}
                    onChange={(e) => updateField('theme', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Light">Light Enterprise (Default)</option>
                    <option value="Dark">Dark High-Contrast SOC</option>
                    <option value="System">System Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Sidebar Default Behavior
                  </label>
                  <select
                    value={draft.sidebarBehavior}
                    onChange={(e) => updateField('sidebarBehavior', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Expanded">Expanded (240px Default)</option>
                    <option value="Auto-Collapse">Auto-Collapse on Mobile</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Compact Visual Density</h4>
                    <p className="text-[11px] text-slate-500">Reduce spacing and font size for high-density multi-monitor command setups.</p>
                  </div>
                  <button
                    onClick={() => updateField('compactDensity', !draft.compactDensity)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.compactDensity ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.compactDensity ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Reduced Interface Motion</h4>
                    <p className="text-[11px] text-slate-500">Disable UI transitions and smooth sliding animations.</p>
                  </div>
                  <button
                    onClick={() => updateField('reducedMotion', !draft.reducedMotion)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.reducedMotion ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: DATA & REPORTS */}
          {activeCategory === 'data_reports' && (
            <div className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Default Report Export Format
                  </label>
                  <select
                    value={draft.exportFormat}
                    onChange={(e) => updateField('exportFormat', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="PDF">PDF Report Document</option>
                    <option value="CSV">CSV Raw Audit Spreadsheet</option>
                    <option value="JSON">JSON Telemetry Payload</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    Automated Digest Frequency
                  </label>
                  <select
                    value={draft.reportFrequency}
                    onChange={(e) => updateField('reportFrequency', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Daily">Daily Summary Digest</option>
                    <option value="Weekly">Weekly Comprehensive Executive Report</option>
                    <option value="Monthly">Monthly Security Compliance Audit</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Automated Data Export</h4>
                    <p className="text-[11px] text-slate-500">Automatically sync daily telemetry reports to cloud storage.</p>
                  </div>
                  <button
                    onClick={() => updateField('automatedDataExport', !draft.automatedDataExport)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      draft.automatedDataExport ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        draft.automatedDataExport ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[10px]">
                    System Audit Trail Log Retention
                  </label>
                  <select
                    value={draft.auditLogRetention}
                    onChange={(e) => updateField('auditLogRetention', e.target.value)}
                    className="w-full sm:w-1/2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="180 Days">180 Days Standard</option>
                    <option value="365 Days">365 Days Legal Audit Standard</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
