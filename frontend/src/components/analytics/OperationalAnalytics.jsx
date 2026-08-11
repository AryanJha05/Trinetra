import React from 'react';
import { BarChart3, Download, TrendingUp, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import Button from '../common/Button';

export default function OperationalAnalytics({ deploymentEnv = 'Railway Station', onOpenReportModal }) {
  return (
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
              ANALYTICS & INTELLIGENCE
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            Operational Analytics & Reports
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Aggregated system metrics, response times, and DPDP compliance logs for <strong className="text-[#111827]">{deploymentEnv}</strong>.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={onOpenReportModal}
            className="!h-9 text-xs"
          >
            Export PDF Security Report
          </Button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">AI Model Detection Accuracy</h3>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-[#111827] font-heading">98.4%</div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Multi-frame temporal verification engine successfully filtered 42 transient false-alarm anomalies today.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">Avg Dispatch Response Time</h3>
            <Clock className="w-4 h-4 text-[#111827]" />
          </div>
          <div className="text-3xl font-bold text-[#111827] font-heading">1m 42s</div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Reduced response latency from legacy manual monitoring baseline of 8m 15s across all operational monitoring zones.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">DPDP Privacy Anonymization</h3>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-[#111827] font-heading">100% DPDP</div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            All exported video feeds & snapshots are automatically anonymized with real-time Gaussian face blur.
          </p>
        </div>
      </div>
    </div>
  );
}

