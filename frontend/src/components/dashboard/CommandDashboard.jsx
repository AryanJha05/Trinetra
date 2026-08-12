import React from 'react';
import { Camera, AlertTriangle, Users, CheckCircle, ArrowRight, Eye, Send, Activity, ShieldAlert } from 'lucide-react';
import StationBlueprintMap from './StationBlueprintMap';
import MetricCard from '../common/MetricCard';
import ChartPanel from '../common/ChartPanel';
import Timeline from '../common/Timeline';
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
  const chartData = [
    { label: '01:00', val: 24 },
    { label: '03:00', val: 30 },
    { label: '05:00', val: 18 },
    { label: '07:00', val: 35 },
    { label: '09:00', val: 42 },
    { label: '11:00', val: 28 },
    { label: '13:00', val: 50 },
    { label: '14:00', val: 95, highlight: true }, // Peak Surge
    { label: '15:00', val: 70 },
    { label: '17:00', val: 55 },
    { label: '19:00', val: 40 },
    { label: '21:00', val: 30 },
    { label: '23:00', val: 26 },
  ];

  const maxVal = Math.max(...chartData.map((d) => d.val));

  return (
    <div className="w-full space-y-4 select-none font-sans text-slate-900">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM ACTIVE</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            TRINETRA Command Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time proactive CCTV surveillance intelligence & incident response telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateToRisk && onNavigateToRisk()}
            className="!h-8 !px-3 text-xs font-semibold"
          >
            Analytics & XAI
          </Button>
          <button
            onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
            className="h-8 px-3 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-all shadow-xs flex items-center space-x-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Dispatch Unit</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">
        <MetricCard
          title="Connected Cameras"
          value="1,248"
          subtitle="1,239 active node streams"
          icon={Camera}
          iconBg="bg-slate-100"
          iconColor="text-slate-800"
          trend="↓ 99.2% Uptime"
          trendPositive={true}
          onClick={() => onNavigateToFeed && onNavigateToFeed('CAM-001')}
        />
        <MetricCard
          title="Active Incidents"
          value="07"
          subtitle="3 critical priority queued"
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          trend="↑ 2 High Priority"
          trendPositive={false}
          onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
        />
        <MetricCard
          title="Detected Objects"
          value="2,384"
          subtitle="Real-time ByteTrack inference"
          icon={Users}
          iconBg="bg-slate-100"
          iconColor="text-slate-800"
          trend="↑ +4.2%"
          trendPositive={true}
          onClick={() => onNavigateToCrowd && onNavigateToCrowd()}
        />
        <MetricCard
          title="System Health"
          value="98.7%"
          subtitle="12ms avg TensorRT latency"
          icon={CheckCircle}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
          trend="Optimal SLA"
          trendPositive={true}
          onClick={() => onNavigateToRisk && onNavigateToRisk()}
        />
      </div>

      {/* 3. Main Operational Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 Columns): Telemetry & CAD Topology */}
        <div className="lg:col-span-8 space-y-4">
          {/* Chart Panel */}
          <ChartPanel
            title="Hourly Threat & Crowd Density Telemetry"
            subtitle="PERFORMANCE MONITORING"
            rightMetric="1,284 Events / 24 hrs"
          >
            <div className="pt-2 pb-1">
              <div className="h-32 flex items-end justify-between gap-1.5 px-1">
                {chartData.map((d, i) => {
                  const heightPercent = (d.val / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group relative">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10 font-mono">
                        {d.label}: {d.val} threats
                      </div>
                      <div
                        className={`w-full max-w-[18px] rounded-t transition-all duration-300 ${
                          d.highlight
                            ? 'bg-slate-900 shadow-xs'
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2 border-t border-slate-100 pt-1.5">
                <span>01:00</span>
                <span>07:00</span>
                <span>14:00 (Peak Surge)</span>
                <span>19:00</span>
                <span>23:00</span>
              </div>
            </div>
          </ChartPanel>

          {/* Spatial CAD Topology Map */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 font-sans">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  SITE OVERVIEW
                </p>
                <h3 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                  CAD Surveillance Topology Map
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {deploymentEnv}
              </span>
            </div>
            <div>
              <StationBlueprintMap onSelectCamera={(camId) => onNavigateToFeed(camId)} />
            </div>
          </div>
        </div>

        {/* Right Column (4 Columns): Active Incident Triage Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-shrink-0">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  ACTIVE QUEUE
                </p>
                <h3 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                  Incident Triage
                </h3>
              </div>
              <button
                onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
                className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 font-mono"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Incident Queue Scrollable Container */}
            <div className="max-h-[380px] internal-scroll-area pr-1 space-y-2.5">
              {incidentsList.map((inc) => (
                <div
                  key={inc.id}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-md space-y-1.5 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">{inc.id}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : inc.severity === 'WARNING'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight font-heading">
                      {inc.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      Zone: {inc.zone}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-200/60">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onNavigateToFeed && onNavigateToFeed(inc.cam)}
                      className="!h-5.5 !px-2 !text-[9px]"
                    >
                      Feed
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Send}
                      onClick={() => onDispatchGuard && onDispatchGuard(inc.id)}
                      className="!h-5.5 !px-2 !text-[9px]"
                    >
                      Dispatch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Timeline Feed Panel */}
          <div className="flex-shrink-0">
            <Timeline
              items={incidentsList.slice(0, 2).map((inc) => ({
                id: inc.id,
                title: inc.title,
                time: inc.time,
                severity: inc.severity,
                desc: `Camera ${inc.cam} reported ${inc.type.toLowerCase()} near ${inc.zone}.`
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
