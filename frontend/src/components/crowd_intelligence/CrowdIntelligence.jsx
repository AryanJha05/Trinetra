import React from 'react';
import { Users, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import Button from '../common/Button';
import MetricCard from '../common/MetricCard';

export default function CrowdIntelligence({ deploymentEnv = 'Railway Station' }) {
  const sectors = [
    { id: 'Zone A (Concourse)', pax: '1,240', density: '1.4 pax/m²', status: 'NORMAL', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Zone B (Gate 2 Area)', pax: '3,850', density: '3.8 pax/m²', status: 'SURGING', badge: 'bg-red-50 text-red-700 border-red-200', trend: '+38% SURGE' },
    { id: 'Zone C (Escalator Link)', pax: '890', density: '0.9 pax/m²', status: 'NORMAL', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Zone D (North Access)', pax: '2,100', density: '2.3 pax/m²', status: 'MODERATE', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  const queues = [
    { name: 'Main Entry Screening', wait: '12 min', status: 'Optimal Flow', count: 48, color: 'text-emerald-700' },
    { name: 'Security Checkpoint Gate A', wait: '28 min', status: 'Congested', count: 142, color: 'text-red-700' },
    { name: 'Pedestrian Link Corridor', wait: '4 min', status: 'Flowing', count: 85, color: 'text-emerald-700' },
  ];

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <Users className="w-3.5 h-3.5 text-slate-800" />
            <span>CROWD TELEMETRY</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Density & Crowd Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time occupancy metrics, sector density mapping, and 15-minute surge forecasting.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 shadow-xs">
            <Users className="w-3.5 h-3.5 text-white" /> TOTAL OCCUPANCY: 2,384 PAX
          </span>
        </div>
      </div>

      {/* 2. Sector Metrics Row (4 Compact Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sectors.map((p, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 space-y-1.5 hover:border-slate-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 font-heading truncate max-w-[140px]">{p.id}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${p.badge}`}>
                {p.status}
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 font-heading tracking-tight">
                {p.pax} <span className="text-xs text-slate-500 font-normal font-sans">pax</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-1 font-mono">
                <span>Density: <strong className="text-slate-900">{p.density}</strong></span>
                {p.trend && <span className="font-bold text-red-600">{p.trend}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Content 12-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Restrained Operational Density Map (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                SPATIAL OCCUPANCY MAP
              </p>
              <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5">
                Sector Density Mapping & Flow Vectors
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-[10px] text-slate-600 font-mono">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Normal</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Surge Alert</span>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-slate-50 rounded-md border border-slate-200 p-4 overflow-hidden flex flex-col justify-between select-none">
            {/* Grid Vector Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Structured Zone Sectors */}
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full p-2">
              {/* Zone A */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-md p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-emerald-900">
                  <span>ZONE A (CONCOURSE)</span>
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[9px]">NORMAL (1.4 pax/m²)</span>
                </div>
                <p className="text-xs text-slate-600">Occupancy: 1,240 pax · Pedestrian Flow Active</p>
              </div>

              {/* Zone B (Alert) */}
              <div className="bg-red-50/80 border-2 border-red-500 rounded-md p-3 flex flex-col justify-between shadow-xs">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-red-900">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> ZONE B (GATE 2)
                  </span>
                  <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[9px]">SURGING (3.8 pax/m²)</span>
                </div>
                <div className="bg-red-600 text-white p-2 rounded text-xs font-medium font-sans">
                  Congestion detected. 3,850 pax present. Inbound flow rate exceeding capacity threshold.
                </div>
              </div>

              {/* Zone C */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-md p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-emerald-900">
                  <span>ZONE C (ESCALATOR LINK)</span>
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[9px]">FLOWING (0.9 pax/m²)</span>
                </div>
                <p className="text-xs text-slate-600">Occupancy: 890 pax · Clear transit Corridor</p>
              </div>

              {/* Zone D */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-md p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-amber-900">
                  <span>ZONE D (NORTH ACCESS)</span>
                  <span className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[9px]">MODERATE (2.3 pax/m²)</span>
                </div>
                <p className="text-xs text-slate-600">Occupancy: 2,100 pax · Steady ingress rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Surge Forecasting & Queue Analytics (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Surge Prediction Panel */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-4 h-4 text-slate-900" />
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                15-Min Surge Forecast
              </h3>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-md space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-900 font-mono">
                <span>Predictive Surge: Zone B</span>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[9px] uppercase border border-red-200">
                  92% Prob
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Zone B is predicted to exceed threshold capacity within 15 mins based on inbound flow rate.
              </p>
              <div className="pt-1">
                <Button variant="danger" size="sm" className="w-full !h-8 !text-xs">
                  Deploy Diversion Protocol
                </Button>
              </div>
            </div>
          </div>

          {/* Queue Wait-Time Analytics */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-slate-900" />
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                Queue Wait Analytics
              </h3>
            </div>

            <div className="space-y-2">
              {queues.map((q, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900 font-heading">{q.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">COUNT: {q.count} PAX</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold font-mono ${q.color}`}>{q.wait}</span>
                    <p className="text-[9px] text-slate-500 uppercase font-semibold">{q.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
