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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#64748B] mb-1 font-sans">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span className="font-semibold text-[#0F172A]">SYSTEM ACTIVE</span>
            <span>·</span>
            <span className="uppercase font-medium">DEPLOYMENT: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
            TRINETRA Command Center
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5 font-sans">
            Monitor connected cameras, assess emerging risks, and coordinate incident response.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateToRisk && onNavigateToRisk()}
          >
            Analytics & XAI
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ShieldAlert}
            onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
          >
            Dispatch Unit
          </Button>
        </div>
      </div>

      {/* 2. Compact KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Connected Cameras"
          value="1,248"
          subtitle="1,239 active node streams"
          icon={Camera}
          iconBg="bg-[#F1F5F9]"
          iconColor="text-[#0F172A]"
          trend="↓ 99.2% Uptime"
          trendPositive={true}
          onClick={() => onNavigateToFeed && onNavigateToFeed('CAM-001')}
        />
        <MetricCard
          title="Active Incidents"
          value="07"
          subtitle="3 critical priority queued"
          icon={AlertTriangle}
          iconBg="bg-[#FEF2F2]"
          iconColor="text-[#B91C1C]"
          trend="↑ 2 High Priority"
          trendPositive={false}
          onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
        />
        <MetricCard
          title="Detected Objects"
          value="2,384"
          subtitle="Live object detection activity"
          icon={Users}
          iconBg="bg-[#F1F5F9]"
          iconColor="text-[#0F172A]"
          trend="↑ +4.2%"
          trendPositive={true}
          onClick={() => onNavigateToCrowd && onNavigateToCrowd()}
        />
        <MetricCard
          title="System Health"
          value="98.7%"
          subtitle="12ms average processing time"
          icon={CheckCircle}
          iconBg="bg-[#ECFDF5]"
          iconColor="text-[#047857]"
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
            subtitle="Performance Monitoring"
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
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0F172A] text-white text-[10px] px-2 py-1 rounded-lg shadow-md pointer-events-none whitespace-nowrap z-20 font-sans">
                        {d.label} — Threat: {d.threat} | Density: {d.crowd}%
                      </div>
                      
                      {/* Side-by-Side Dual Telemetry Bars */}
                      <div className="flex items-end gap-1.5 w-full justify-center h-full">
                        {/* Threat Bar */}
                        <div
                          className="w-1.5 sm:w-2 rounded-t-sm bg-[#F59E0B] transition-all"
                          style={{ height: `${threatHeight}%` }}
                          title={`Threat Level: ${d.threat}`}
                        />
                        {/* Crowd Density Bar */}
                        <div
                          className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all ${
                            d.highlight ? 'bg-[#0F172A]' : 'bg-[#CBD5E1] group-hover:bg-[#94A3B8]'
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
              <div className="flex items-center justify-between text-xs text-[#64748B] border-t border-[#F1F5F9] pt-2.5 font-sans">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B]"></span> Threat Level
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#0F172A]"></span> Crowd Density
                  </span>
                </div>
                <span className="font-bold text-[#0F172A]">14:00 (Peak Surge)</span>
              </div>
            </div>
          </ChartPanel>
        </div>

        {/* Incident Triage Queue (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans h-full flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9]">
              <div>
                <p className="text-xs font-semibold text-[#64748B]">
                  Active Queue
                </p>
                <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                  Incident Triage
                </h3>
              </div>
              <button
                onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
                className="text-xs font-semibold text-[#0F172A] hover:underline flex items-center gap-1 font-sans"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable Incident Items */}
            <div className="max-h-[220px] internal-scroll-area pr-1 space-y-2.5">
              {incidentsList.slice(0, 4).map((inc) => (
                <div
                  key={inc.id}
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1.5 hover:border-[#CBD5E1] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#64748B]">{inc.id}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase border font-sans ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]'
                          : inc.severity === 'WARNING'
                          ? 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight font-sans">
                      {inc.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5 font-sans">
                      Zone: {inc.zone}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-1.5 border-t border-[#E2E8F0]">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onNavigateToFeed && onNavigateToFeed(inc.cam)}
                      className="!h-6 !px-2 !text-[10px]"
                    >
                      View Cam
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Send}
                      onClick={() => onDispatchGuard && onDispatchGuard(inc.id)}
                      className="!h-6 !px-2 !text-[10px]"
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
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <p className="text-xs font-semibold text-[#64748B]">
                  Live Camera Layout
                </p>
                <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                  Site Surveillance Map
                </h3>
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
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
