import React from 'react';
import { BarChart3, Download, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function OperationalAnalytics({ deploymentEnv = 'Railway Station', onOpenReportModal }) {
  return (
    <div className="h-full max-h-full overflow-hidden flex flex-col space-y-3 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <BarChart3 className="w-3.5 h-3.5 text-slate-800" />
            <span>OPERATIONAL METRICS</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
            Operational Analytics & Intelligence
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Aggregated system performance metrics, incident triage dispatch latencies, and DPDP compliance audits.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={onOpenReportModal}
            className="!h-8 text-xs"
          >
            Export Security Audit PDF
          </Button>
        </div>
      </div>

      {/* 2. Internal Scroll Workspace */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
        {/* Analytics Summary Cards (12 Column Responsive Layout: 4 columns each) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                AI Detection Accuracy
              </h3>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-heading tracking-tight">98.4%</div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Multi-frame temporal verification engine filtered 42 transient false-alarm anomalies today.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                Avg Dispatch Latency
              </h3>
              <Clock className="w-4 h-4 text-slate-900" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-heading tracking-tight">1m 42s</div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Reduced response latency from legacy manual monitoring baseline of 8m 15s across all sectors.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
              DPDP Compliance Status
            </h3>
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-heading tracking-tight">100% DPDP</div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            All exported CCTV feeds & evidence snapshots are automatically anonymized with Gaussian face blur.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
