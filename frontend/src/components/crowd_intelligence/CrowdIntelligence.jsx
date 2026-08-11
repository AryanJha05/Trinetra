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
    <div className="h-full max-h-full overflow-hidden flex flex-col space-y-3 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <Users className="w-3.5 h-3.5 text-slate-800" />
            <span>CROWD TELEMETRY</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
            Density & Crowd Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time occupancy metrics, spatial density heatmaps, and 15-minute surge forecasting.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 shadow-xs">
            <Users className="w-3.5 h-3.5 text-white" /> TOTAL OCCUPANCY: 2,384 PAX
          </span>
        </div>
      </div>

      {/* 2. Sector Metrics Row (4 Compact Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">
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

      {/* 3. Main Content 12-Column Responsive Grid (Internal Scroll) */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spatial Density Heatmap (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                SPATIAL DENSITY
              </p>
              <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5">
                Sector Density Heatmap & Motion Vectors
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
              <span>Low</span>
              <div className="w-20 h-2 rounded bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600"></div>
              <span>High</span>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-slate-900 rounded-md border border-slate-200 p-4 overflow-hidden flex items-center justify-center select-none">
            {/* CAD Grid Background Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Density Blobs */}
            <div className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full bg-red-600/30 blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 left-1/2 w-48 h-32 rounded-full bg-amber-500/25 blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-emerald-500/20 blur-2xl"></div>

            <div className="relative z-10 w-full h-full border border-slate-700 rounded-md p-3 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-200 bg-slate-800/90 p-2 rounded border border-slate-700">
                <span>ZONE A CONCOURSE ENTRANCE</span>
                <span className="font-bold text-emerald-400">OCCUPANCY: 68%</span>
              </div>

              <div className="self-center bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-md flex items-center gap-2 uppercase tracking-wide shadow-md font-mono">
                <AlertTriangle className="w-4 h-4 text-white" /> Zone B Congested: 3.8 pax/m² (Surge Alert)
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-200 bg-slate-800/90 p-2 rounded border border-slate-700">
                <span>ZONE C (FLOWING)</span>
                <span>ZONE D (NORMAL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Surge Forecasting & Queue Analytics (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Surge Prediction Panel */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-4 h-4 text-slate-900" />
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                15-Min Surge Forecast
              </h3>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-md space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-900 font-mono">
                <span>Predictive Surge: Zone B</span>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[9px] uppercase">
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
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 font-sans">
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
    </div>
  );
}
