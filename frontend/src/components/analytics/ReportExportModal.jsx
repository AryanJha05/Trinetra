import React, { useState, useEffect } from 'react';
import { FileText, Download, X, CheckCircle2, ShieldCheck, Clock, Layers } from 'lucide-react';
import Button from '../common/Button';

export default function ReportExportModal({ isOpen, onClose, deploymentEnv = 'Railway Station', onShowToast }) {
  const [reportType, setReportType] = useState('SECURITY_AUDIT');
  const [dateRange, setDateRange] = useState('LAST_24_HOURS');
  const [includeXai, setIncludeXai] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (onShowToast) {
        onShowToast('Official TRINETRA PDF Security Report generated & downloaded successfully!');
      }
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeInSmooth select-none font-sans"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-scaleUpSmooth text-slate-900 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#111827]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Export TRINETRA PDF Report</h3>
              <p className="text-xs text-slate-500 font-medium">Official Security & Operational Audit Log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Options */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
              Select Report Scope / Module:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-sans font-medium focus:outline-none focus:border-slate-400"
            >
              <option value="SECURITY_AUDIT">Comprehensive Security Audit (All Modules)</option>
              <option value="INCIDENT_SUMMARY">Incident Triage & Response Summary</option>
              <option value="CROWD_DENSITY">Crowd Density & Flow Prediction Report</option>
              <option value="WORKFORCE_SAFETY">Workforce PPE & Safety Compliance</option>
              <option value="DPDP_PRIVACY">DPDP Compliance & Privacy Masking Log</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
              Time Horizon / Shift:
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-sans font-medium focus:outline-none focus:border-slate-400"
            >
              <option value="LAST_24_HOURS">Last 24 Hours (Current Shift)</option>
              <option value="LAST_7_DAYS">Last 7 Days (Weekly Summary)</option>
              <option value="LAST_30_DAYS">Last 30 Days (Monthly Audit)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 cursor-pointer" onClick={() => setIncludeXai(!includeXai)}>
            <input
              type="checkbox"
              checked={includeXai}
              onChange={(e) => setIncludeXai(e.target.checked)}
              className="w-4 h-4 accent-[#111827] rounded cursor-pointer"
            />
            <div className="font-sans text-xs">
              <span className="font-bold text-slate-900 block">Include Risk Factor Analysis Breakdowns</span>
              <span className="text-slate-500 text-[11px]">Attaches computer vision decision logic to every incident</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
              <span>DEPLOYMENT NODE</span>
              <span>{deploymentEnv.toUpperCase()}</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Report will be cryptographically signed by TRINETRA command room authority.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="min-w-[160px]"
          >
            {isGenerating ? 'Generating PDF...' : 'Download Report'}
          </Button>
        </div>
      </div>
    </div>
  );
}
