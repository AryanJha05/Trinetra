import React from 'react';
import { Camera, AlertTriangle, Users, ShieldCheck, ArrowRight, Eye, Send, MoreHorizontal, Clock, Activity, Cpu, CheckCircle, TrendingDown, TrendingUp, Layers } from 'lucide-react';
import StationBlueprintMap from './StationBlueprintMap';
import Button from '../common/Button';

export default function CommandDashboard({
  deploymentEnv = 'Railway Station',
  onNavigateToFeed,
  onNavigateToAlerts,
  onDispatchGuard,
  onNavigateToCrowd,
  onNavigateToSafety,
  onNavigateToRisk,
  incidentsList = []
}) {
  // Minimal bar chart mock data for hourly/daily threat frequency
  const chartData = [
    { label: '1/7', val: 24 },
    { label: '2/7', val: 30 },
    { label: '3/7', val: 18 },
    { label: '4/7', val: 35 },
    { label: '5/7', val: 42 },
    { label: '6/7', val: 28 },
    { label: '7/7', val: 50 },
    { label: '8/7', val: 65 },
    { label: '9/7', val: 48 },
    { label: '10/7', val: 95, highlight: true }, // Peak Surge Highlighted Bar
    { label: '11/7', val: 82 },
    { label: '12/7', val: 70 },
    { label: '13/7', val: 55 },
    { label: '14/7', val: 40 },
    { label: '15/7', val: 38 },
    { label: '16/7', val: 45 },
    { label: '17/7', val: 52 },
    { label: '18/7', val: 30 },
    { label: '19/7', val: 42 },
    { label: '20/7', val: 60 },
    { label: '21/7', val: 80 },
    { label: '22/7', val: 34 },
    { label: '23/7', val: 26 },
    { label: '24/7', val: 32 },
    { label: '25/7', val: 40 },
    { label: '26/7', val: 58 },
    { label: '27/7', val: 36 },
    { label: '28/7', val: 44 },
    { label: '29/7', val: 50 },
    { label: '30/7', val: 72 },
    { label: '31/7', val: 64 },
  ];

  const maxVal = Math.max(...chartData.map((d) => d.val));

  return (
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      {/* Top Greeting Header (Reference Image Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
            GOOD EVENING
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            Security Operations Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Real-time proactive CCTV telemetry across <strong className="text-[#111827]">{deploymentEnv}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateToRisk && onNavigateToRisk()}
          >
            Analytics
          </Button>
          <button
            onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
            className="h-8 px-4 bg-[#111827] text-white font-semibold text-xs rounded-full hover:bg-[#1F2937] transition-all shadow-xs"
          >
            Dispatch Unit
          </button>
        </div>
      </div>

      {/* Metric Cards Row (Reference Image 4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Connected Cameras */}
        <div
          onClick={() => onNavigateToFeed && onNavigateToFeed('CAM-001')}
          className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Camera className="w-4 h-4 text-[#111827]" />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              CONNECTED CAMERAS
            </p>
            <div className="text-2xl font-bold text-[#111827] mt-0.5 font-heading">
              1,248
            </div>
            <p className="text-xs text-slate-500 mt-0.5">1,239 active streams</p>
          </div>
        </div>

        {/* Card 2: Active Incidents */}
        <div
          onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
          className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ACTIVE INCIDENTS
            </p>
            <div className="text-2xl font-bold text-[#111827] mt-0.5 font-heading">
              07
            </div>
            <p className="text-xs text-slate-500 mt-0.5">3 high priority</p>
          </div>
        </div>

        {/* Card 3: Detected Objects */}
        <div
          onClick={() => onNavigateToCrowd && onNavigateToCrowd()}
          className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4 text-[#111827]" />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              DETECTED OBJECTS
            </p>
            <div className="text-2xl font-bold text-[#111827] mt-0.5 font-heading">
              2,384
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Live ByteTrack AI</p>
          </div>
        </div>

        {/* Card 4: System Health */}
        <div
          onClick={() => onNavigateToRisk && onNavigateToRisk()}
          className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              SYSTEM HEALTH
            </p>
            <div className="text-2xl font-bold text-emerald-600 mt-0.5 font-heading">
              98.7%
            </div>
            <p className="text-xs text-slate-500 mt-0.5">12ms avg latency</p>
          </div>
        </div>
      </div>

      {/* Middle Trend Summary Row (Reference Image "LAST 30 DAYS" Style) */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            30-DAY OPERATIONAL PERFORMANCE
          </p>
          <span className="text-xs text-slate-400 font-medium">Updated 1 min ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trend Card 1 */}
          <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-2 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                THREAT INCIDENTS TRIAGED
              </span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[#111827] font-heading">
                735
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                ↓ -5%
              </span>
            </div>
            <p className="text-xs text-slate-500">Incident alerts resolved this period</p>
          </div>

          {/* Trend Card 2 */}
          <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-2 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                SURGE THREAT METRICS
              </span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[#111827] font-heading">
                1,284
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">
                ↑ +2%
              </span>
            </div>
            <p className="text-xs text-slate-500">Total detected objects triaged</p>
          </div>

          {/* Trend Card 3 */}
          <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-2 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                SECURITY DISPATCH RESOLUTION
              </span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[#111827] font-heading">
                99.2%
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                Optimal
              </span>
            </div>
            <p className="text-xs text-slate-500">Response unit operational SLA</p>
          </div>
        </div>
      </div>

      {/* Minimal Bar Chart (Reference Image Style: "COLLECTED PER DAY") */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              COLLECTED PER HOUR
            </p>
            <h3 className="text-sm font-bold text-[#111827] font-heading mt-0.5">
              Hourly Threat & Crowd Density Frequency
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            <strong>1,284</strong> events in period
          </span>
        </div>

        {/* Bar Chart Graphics */}
        <div className="pt-4 pb-2">
          <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 px-1">
            {chartData.map((d, i) => {
              const heightPercent = (d.val / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#111827] text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10 font-medium">
                    {d.label}: {d.val} threats
                  </div>

                  <div
                    className={`w-full max-w-[14px] rounded-t-sm transition-all duration-300 ${d.highlight
                        ? 'bg-[#111827] shadow-sm'
                        : 'bg-[#E2E8F0] hover:bg-[#CBD5E1]'
                      }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2 px-1 border-t border-[#F1F5F9] pt-2">
            <span>1/7</span>
            <span>5/7</span>
            <span>10/7 (Surge Peak)</span>
            <span>15/7</span>
            <span>20/7</span>
            <span>25/7</span>
            <span>31/7</span>
          </div>
        </div>
      </div>

      {/* Lower Section: CAD Map & Incident Table Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Spatial CAD Blueprint Map (7 Cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">
              CAD Surveillance Topology
            </h3>
            <span className="text-xs text-slate-500 font-medium">{deploymentEnv}</span>
          </div>
          <StationBlueprintMap onSelectCamera={(camId) => onNavigateToFeed(camId)} />
        </div>

        {/* Clean Enterprise Incident Triage Table (6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">
                Incident Triage Queue
              </h3>
              <span className="bg-[#111827] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {incidentsList.length} QUEUED
              </span>
            </div>
            <button
              onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
              className="text-xs font-bold text-[#111827] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111827]">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-2">ID & Title</th>
                  <th className="pb-2">Severity</th>
                  <th className="pb-2">Zone</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {incidentsList.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 pr-2">
                      <p className="font-bold text-xs text-[#111827] leading-tight truncate max-w-[140px]">
                        {inc.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">{inc.id}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${inc.severity === 'CRITICAL'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : inc.severity === 'WARNING'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                      >
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-xs text-slate-600 truncate max-w-[100px]">
                      {inc.zone}
                    </td>
                    <td className="py-2.5 pl-2 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Eye}
                          onClick={() => onNavigateToFeed && onNavigateToFeed(inc.cam)}
                          className="!h-7 !px-2 !text-[10px]"
                        >
                          Feed
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Send}
                          onClick={() => onDispatchGuard && onDispatchGuard(inc.id)}
                          className="!h-7 !px-2.5 !text-[10px]"
                        >
                          Dispatch
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

