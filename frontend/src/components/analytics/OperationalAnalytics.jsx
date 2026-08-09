import React from 'react';
import { BarChart3, Download, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export default function OperationalAnalytics() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 font-heading">
            <BarChart3 className="w-5 h-5 text-railway-navy" />
            Operational Reports & Surveillance Analytics
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Aggregated metrics, RPF response KPIs, and DPDP audit compliance reports</p>
        </div>
        <button className="px-4 py-2.5 bg-navy-900 hover:bg-slate-900 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4 text-railway-mint" /> Export PDF Operational Report
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Multi-Frame Detection Accuracy</h3>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-4xl font-extrabold text-slate-900 font-mono">98.4%</div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">Multi-frame verification engine successfully filtered 42 transient false-alarm anomalies today.</p>
        </div>

        <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Average RPF Dispatch Response Time</h3>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-4xl font-extrabold text-emerald-700 font-mono">1m 42s</div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">Down from legacy manual monitoring baseline of 8m 15s across major station concourses.</p>
        </div>

        <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Privacy Anonymization Audit</h3>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-4xl font-extrabold text-purple-800 font-mono">100% DPDP</div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">All exported surveillance feeds automatically masked with Gaussian face blur compliance.</p>
        </div>
      </div>
    </div>
  );
}
