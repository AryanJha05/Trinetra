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
    <div className="w-full space-y-4 font-sans text-[#0F172A] select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#64748B] mb-1 font-sans">
            <BarChart3 className="w-3.5 h-3.5 text-[#0F172A]" />
            <span className="font-semibold text-[#0F172A]">OPERATIONAL REPORTS</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
            Operational Analytics & Reports
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Aggregated security metrics, threat triage trends, response latencies, and compliance audits.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={onOpenReportModal}
          >
            Export Security Audit PDF
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (4 Uniform Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-2 hover:border-[#CBD5E1] transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              AI Detection Accuracy
            </h3>
            <TrendingUp className="w-4 h-4 text-[#047857]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">98.4%</div>
          <p className="text-xs text-[#64748B] leading-relaxed font-sans">
            Multi-frame temporal verification engine filtered 42 transient anomalies today.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-2 hover:border-[#CBD5E1] transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Avg Dispatch Latency
            </h3>
            <Clock className="w-4 h-4 text-[#0F172A]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">1m 42s</div>
          <p className="text-xs text-[#64748B] leading-relaxed font-sans">
            Reduced response latency from legacy manual baseline of 8m 15s across all sectors.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-2 hover:border-[#CBD5E1] transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Incident Resolution Rate
            </h3>
            <CheckCircle2 className="w-4 h-4 text-[#047857]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">96.8%</div>
          <p className="text-xs text-[#64748B] leading-relaxed font-sans">
            34 of 35 logged anomalies successfully resolved by ground response units.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-2 hover:border-[#CBD5E1] transition-all shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              DPDP Compliance Status
            </h3>
            <ShieldCheck className="w-4 h-4 text-[#4338CA]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">100% DPDP</div>
          <p className="text-xs text-[#64748B] leading-relaxed font-sans">
            All exported CCTV feeds & evidence snapshots anonymized with Gaussian face blur.
          </p>
        </div>
      </div>

      {/* 3. Main Operational Analytics Grid (12 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Cols: Incident Trend & Weekly Metrics */}
        <div className="lg:col-span-8 space-y-4">
          {/* 24-Hour Incident Volume & Resolution Bar Chart */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <p className="text-xs font-semibold text-[#64748B]">
                  HOURLY INCIDENT TREND
                </p>
                <h3 className="text-base font-bold text-[#0F172A] font-sans mt-0.5">
                  24-Hour Threat Logging & Resolution Volume
                </h3>
              </div>
              <div className="flex items-center space-x-4 text-xs font-sans">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#0F172A] rounded-sm"></span>
                  <span className="text-[#64748B]">Logged</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#10B981] rounded-sm"></span>
                  <span className="text-[#64748B]">Resolved</span>
                </div>
              </div>
            </div>

            {/* Simple Structured Bar Chart Visualization */}
            <div className="h-[200px] flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-[#F1F5F9]">
              {hourlyTrend.map((t, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
                    {/* Logged Bar */}
                    <div
                      className="w-1/2 bg-[#0F172A] rounded-t-sm transition-all group-hover:bg-slate-700"
                      style={{ height: `${Math.max(t.incidents * 11, 8)}%` }}
                      title={`Logged: ${t.incidents}`}
                    />
                    {/* Resolved Bar */}
                    <div
                      className="w-1/2 bg-[#10B981] rounded-t-sm transition-all group-hover:bg-emerald-400"
                      style={{ height: `${Math.max(t.resolved * 11, 8)}%` }}
                      title={`Resolved: ${t.resolved}`}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#64748B]">{t.hour}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-[#64748B] font-sans pt-1">
              <span>Peak threat volume recorded between 12:00 - 16:00 during commuter peak hours.</span>
              <span className="font-sans font-bold text-[#0F172A]">Total Logged: 22 Incidents</span>
            </div>
          </div>

          {/* 7-Day Performance & Latency Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#0F172A]" />
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  7-Day System Performance & Latency Audit
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                OPTIMAL PERFORMANCE
              </span>
            </div>

            <div className="responsive-table-wrapper">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead className="bg-[#F8FAFC] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3">DAY</th>
                    <th className="p-3">AI ACCURACY</th>
                    <th className="p-3">AVG DISPATCH LATENCY</th>
                    <th className="p-3">INCIDENTS LOGGED</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#334155] font-medium">
                  {weeklyPerformance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-3 font-bold font-mono text-[#0F172A]">{row.day}</td>
                      <td className="p-3 font-bold text-[#047857] font-mono">{row.accuracy}</td>
                      <td className="p-3 font-sans text-[#0F172A]">{row.latency}</td>
                      <td className="p-3 font-sans text-[#64748B]">{row.incidents} events</td>
                      <td className="p-3">
                        <span className="bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
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
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-[#F1F5F9] pb-3">
              <PieChart className="w-4 h-4 text-[#0F172A]" />
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Threat Category Distribution
              </h3>
            </div>

            <div className="space-y-3.5">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-semibold text-[#0F172A]">{cat.label}</span>
                    <span className="font-mono text-[#64748B] font-bold">{cat.count} ({cat.pct}%)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Anonymization Audit Digest */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-[#F1F5F9] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#4338CA]" />
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                DPDP Privacy Compliance Audit
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">Face Anonymization</p>
                  <p className="text-xs text-[#64748B]">Gaussian Blur 80% Strength</p>
                </div>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full font-semibold">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">Evidence Vault Encryption</p>
                  <p className="text-xs text-[#64748B]">AES-256 Storage Encryption</p>
                </div>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full font-semibold">
                  VERIFIED
                </span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">CCTV Data Retention</p>
                  <p className="text-xs text-[#64748B]">90-Day Enterprise Hold</p>
                </div>
                <span className="text-[10px] bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] px-2.5 py-0.5 rounded-full font-semibold">
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
