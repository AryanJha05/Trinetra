import React from 'react';
import { Camera, AlertTriangle, Users, CheckCircle, ArrowRight, Eye, Send, ShieldAlert } from 'lucide-react';
import StationBlueprintMap from './StationBlueprintMap';
import MetricCard from '../common/MetricCard';
import ChartPanel from '../common/ChartPanel';
import Timeline from '../common/Timeline';
import Button from '../common/Button';

export default function CommandDashboard({
  deploymentEnv = 'Railway Station Demo',
  onNavigateToFeed,
  onNavigateToAlerts,
  onDispatchGuard,
  onNavigateToCrowd,
  onNavigateToSafety,
  onNavigateToRisk,
  incidentsList = []
}) {
  // Realistic hourly threat & crowd telemetry data across 24 hours
  const chartData = [
    { label: '00:00', threat: 12, crowd: 18 },
    { label: '02:00', threat: 15, crowd: 22 },
    { label: '04:00', threat: 10, crowd: 14 },
    { label: '06:00', threat: 28, crowd: 45 },
    { label: '08:00', threat: 42, crowd: 78 },
    { label: '10:00', threat: 36, crowd: 65 },
    { label: '12:00', threat: 48, crowd: 82 },
    { label: '14:00', threat: 85, crowd: 96, highlight: true }, // Peak Surge
    { label: '16:00', threat: 62, crowd: 88 },
    { label: '18:00', threat: 54, crowd: 74 },
    { label: '20:00', threat: 38, crowd: 52 },
    { label: '22:00', threat: 22, crowd: 30 },
  ];

  const maxVal = Math.max(...chartData.map((d) => d.crowd));

  return (
    <div className="w-full space-y-4 select-none font-sans text-slate-900">
      {/* 1. Page Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM ACTIVE</span>
            <span>·</span>
            <span className="uppercase">DEPLOYMENT: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            TRINETRA Command Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Monitor connected cameras, assess emerging risks, and coordinate incident response.
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

      {/* 2. Compact KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
          subtitle="Live object detection activity"
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
          subtitle="12ms average processing time"
          icon={CheckCircle}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
          trend="Optimal SLA"
          trendPositive={true}
          onClick={() => onNavigateToRisk && onNavigateToRisk()}
        />
      </div>

      {/* 3. Middle Section: Telemetry Analytics + Incident Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Analytics Chart Panel (8 Cols) */}
        <div className="lg:col-span-8">
          <ChartPanel
            title="Hourly Threat & Crowd Density Telemetry"
            subtitle="PERFORMANCE MONITORING"
            rightMetric="24-Hour Operations Digest"
          >
            <div className="pt-2 pb-1 space-y-3">
              <div className="h-36 flex items-end justify-between gap-2 px-1">
                {chartData.map((d, i) => {
                  const crowdHeight = (d.crowd / maxVal) * 100;
                  const threatHeight = (d.threat / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20 font-mono">
                        {d.label} — Threat: {d.threat} | Density: {d.crowd}%
                      </div>
                      
                      {/* Side-by-Side Dual Telemetry Bars */}
                      <div className="flex items-end gap-1 w-full justify-center h-full">
                        {/* Threat Bar */}
                        <div
                          className="w-1.5 sm:w-2 rounded-t bg-amber-500 transition-all"
                          style={{ height: `${threatHeight}%` }}
                          title={`Threat Level: ${d.threat}`}
                        />
                        {/* Crowd Density Bar */}
                        <div
                          className={`w-2.5 sm:w-3.5 rounded-t transition-all ${
                            d.highlight ? 'bg-slate-900' : 'bg-slate-300 group-hover:bg-slate-400'
                          }`}
                          style={{ height: `${crowdHeight}%` }}
                          title={`Crowd Density: ${d.crowd}%`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Timeline Labels & Legend */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-t border-slate-100 pt-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-amber-500"></span> Threat Level
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-900"></span> Crowd Density
                  </span>
                </div>
                <span className="font-bold text-slate-700">14:00 (Peak Surge)</span>
              </div>
            </div>
          </ChartPanel>
        </div>

        {/* Incident Triage Queue (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 font-sans h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
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

            {/* Scrollable Incident Items */}
            <div className="max-h-[220px] internal-scroll-area pr-1 space-y-2">
              {incidentsList.slice(0, 4).map((inc) => (
                <div
                  key={inc.id}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-md space-y-1 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">{inc.id}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase font-mono ${
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
                    <p className="text-[10px] text-slate-500 font-mono">
                      Zone: {inc.zone}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-200/60">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onNavigateToFeed && onNavigateToFeed(inc.cam)}
                      className="!h-6 !px-2 !text-[9px]"
                    >
                      View Cam
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Send}
                      onClick={() => onDispatchGuard && onDispatchGuard(inc.id)}
                      className="!h-6 !px-2 !text-[9px]"
                    >
                      Dispatch Unit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Site Surveillance Map + Operational Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Site Surveillance Map (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 font-sans">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Live Camera Layout
                </p>
                <h3 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                  Site Surveillance Map
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                {deploymentEnv}
              </span>
            </div>
            <div>
              <StationBlueprintMap onSelectCamera={(camId) => onNavigateToFeed && onNavigateToFeed(camId)} />
            </div>
          </div>
        </div>

        {/* Operational Timeline Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <Timeline
            items={incidentsList.slice(0, 3).map((inc) => ({
              id: inc.id,
              title: inc.title,
              time: inc.time,
              severity: inc.severity,
              desc: `Camera ${inc.cam} reported ${inc.type ? inc.type.toLowerCase() : 'activity'} in ${inc.zone}.`
            }))}
          />
        </div>
      </div>
    </div>
  );
}
