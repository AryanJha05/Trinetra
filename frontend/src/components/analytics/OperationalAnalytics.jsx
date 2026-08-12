import React from 'react';
import { BarChart3, Download, TrendingUp, Clock, ShieldCheck, CheckCircle2, PieChart, Activity } from 'lucide-react';
import Button from '../common/Button';

export default function OperationalAnalytics({ deploymentEnv = 'Railway Station', onOpenReportModal }) {
  // 24-Hour hourly trend data
  const hourlyTrend = [
    { hour: '00:00', incidents: 1, resolved: 1 },
    { hour: '04:00', incidents: 0, resolved: 0 },
    { hour: '08:00', incidents: 4, resolved: 4 },
    { hour: '12:00', incidents: 8, resolved: 7 },
    { hour: '16:00', incidents: 6, resolved: 6 },
    { hour: '20:00', incidents: 3, resolved: 3 },
  ];

  // Incident categories breakdown
  const categoryBreakdown = [
    { label: 'Loitering & Suspicious Dwell', pct: 32, count: 12, color: 'bg-slate-900' },
    { label: 'Unattended Baggage & Objects', pct: 26, count: 9, color: 'bg-red-600' },
    { label: 'Restricted Area Perimeter Breach', pct: 22, count: 8, color: 'bg-amber-600' },
    { label: 'Crowd Surge & Overcrowding', pct: 14, count: 5, color: 'bg-emerald-600' },
    { label: 'PPE Safety Non-Compliance', pct: 6, count: 2, color: 'bg-indigo-600' },
  ];

  // 7-day performance trend
  const weeklyPerformance = [
    { day: 'Mon', accuracy: '98.1%', latency: '1m 52s', incidents: 14 },
    { day: 'Tue', accuracy: '98.5%', latency: '1m 45s', incidents: 11 },
    { day: 'Wed', accuracy: '97.9%', latency: '1m 48s', incidents: 18 },
    { day: 'Thu', accuracy: '98.8%', latency: '1m 39s', incidents: 9 },
    { day: 'Fri', accuracy: '98.4%', latency: '1m 42s', incidents: 15 },
    { day: 'Sat', accuracy: '98.6%', latency: '1m 35s', incidents: 21 },
    { day: 'Sun', accuracy: '98.9%', latency: '1m 30s', incidents: 8 },
  ];

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <BarChart3 className="w-3.5 h-3.5 text-slate-800" />
            <span>OPERATIONAL REPORTS</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Operational Analytics & Reports
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Aggregated security metrics, threat triage trends, response latencies, and compliance audits.
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

      {/* 2. Top Summary KPI Cards (4 Uniform Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
              AI Detection Accuracy
            </h3>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-heading tracking-tight">98.4%</div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Multi-frame temporal verification engine filtered 42 transient anomalies today.
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
            Reduced response latency from legacy manual baseline of 8m 15s across all sectors.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
              Incident Resolution Rate
            </h3>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-heading tracking-tight">96.8%</div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            34 of 35 logged anomalies successfully resolved by ground response units.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
              DPDP Compliance Status
            </h3>
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-heading tracking-tight">100% DPDP</div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            All exported CCTV feeds & evidence snapshots anonymized with Gaussian face blur.
          </p>
        </div>
      </div>

      {/* 3. Main Operational Analytics Grid (12 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Cols: Incident Trend & Weekly Metrics */}
        <div className="lg:col-span-8 space-y-4">
          {/* 24-Hour Incident Volume & Resolution Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  HOURLY INCIDENT TREND
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5">
                  24-Hour Threat Logging & Resolution Volume
                </h3>
              </div>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-slate-900 rounded-xs"></span>
                  <span className="text-slate-600">Logged</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-emerald-600 rounded-xs"></span>
                  <span className="text-slate-600">Resolved</span>
                </div>
              </div>
            </div>

            {/* Simple Structured Bar Chart Visualization */}
            <div className="h-[200px] flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
              {hourlyTrend.map((t, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
                    {/* Logged Bar */}
                    <div
                      className="w-1/2 bg-slate-900 rounded-t-xs transition-all group-hover:bg-slate-800"
                      style={{ height: `${Math.max(t.incidents * 11, 8)}%` }}
                      title={`Logged: ${t.incidents}`}
                    />
                    {/* Resolved Bar */}
                    <div
                      className="w-1/2 bg-emerald-600 rounded-t-xs transition-all group-hover:bg-emerald-500"
                      style={{ height: `${Math.max(t.resolved * 11, 8)}%` }}
                      title={`Resolved: ${t.resolved}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">{t.hour}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 font-sans pt-1">
              <span>Peak threat volume recorded between 12:00 - 16:00 during commuter peak hours.</span>
              <span className="font-mono font-bold text-slate-900">Total Logged: 22 Incidents</span>
            </div>
          </div>

          {/* 7-Day Performance & Latency Table */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-slate-900" />
                <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                  7-Day System Performance & Latency Audit
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                OPTIMAL PERFORMANCE
              </span>
            </div>

            <div className="responsive-table-wrapper">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 font-mono">
                  <tr>
                    <th className="p-2.5">DAY</th>
                    <th className="p-2.5">AI ACCURACY</th>
                    <th className="p-2.5">AVG DISPATCH LATENCY</th>
                    <th className="p-2.5">INCIDENTS LOGGED</th>
                    <th className="p-2.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {weeklyPerformance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-2.5 font-bold font-mono text-slate-900">{row.day}</td>
                      <td className="p-2.5 font-bold text-emerald-700 font-mono">{row.accuracy}</td>
                      <td className="p-2.5 font-mono text-slate-900">{row.latency}</td>
                      <td className="p-2.5 font-mono text-slate-600">{row.incidents} events</td>
                      <td className="p-2.5">
                        <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[9px] font-bold font-mono">
                          PASSED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Incident Distribution & Compliance Status */}
        <div className="lg:col-span-4 space-y-4">
          {/* Threat Category Distribution */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <PieChart className="w-4 h-4 text-slate-900" />
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                Threat Category Distribution
              </h3>
            </div>

            <div className="space-y-3">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-semibold text-slate-800">{cat.label}</span>
                    <span className="font-mono text-slate-500 font-bold">{cat.count} ({cat.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Anonymization Audit Digest */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-indigo-700" />
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                DPDP Privacy Compliance Audit
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Face Anonymization</p>
                  <p className="text-[10px] text-slate-500 font-mono">Gaussian Blur 80% Strength</p>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Evidence Vault Encryption</p>
                  <p className="text-[10px] text-slate-500 font-mono">AES-256 Storage Encryption</p>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                  VERIFIED
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">CCTV Data Retention</p>
                  <p className="text-[10px] text-slate-500 font-mono">90-Day Enterprise Hold</p>
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-bold font-mono">
                  90 DAYS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
