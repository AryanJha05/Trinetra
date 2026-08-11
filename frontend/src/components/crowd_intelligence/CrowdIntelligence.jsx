import React from 'react';
import { Users, AlertTriangle, Clock, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function CrowdIntelligence({ deploymentEnv = 'Railway Station' }) {
  const sectors = [
    { id: 'Zone A (Main Concourse Entrance)', pax: '1,240', density: '1.4 pax/m²', status: 'NORMAL', badge: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'Zone B (Public Gathering & Gate 2)', pax: '3,850', density: '3.8 pax/m²', status: 'SURGING / HIGH', badge: 'bg-red-50 text-red-600 border-red-200', trend: '+38% SURGE' },
    { id: 'Zone C (West Escalator Link)', pax: '890', density: '0.9 pax/m²', status: 'NORMAL', badge: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'Zone D (North Corridor Access)', pax: '2,100', density: '2.3 pax/m²', status: 'MODERATE', badge: 'bg-amber-50 text-amber-600 border-amber-200' },
  ];

  const queues = [
    { name: 'Main Entry / Security Screening', wait: '12 min', status: 'Optimal Flow', count: 48, color: 'text-emerald-600' },
    { name: 'Security Checkpoint Gate A', wait: '28 min', status: 'Congested', count: 142, color: 'text-red-600' },
    { name: 'Pedestrian Link Corridor 1', wait: '4 min', status: 'Flowing', count: 85, color: 'text-emerald-600' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
              CROWD INTELLIGENCE
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            Density & Crowd Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time occupancy metrics, 15-min surge predictions across <strong className="text-[#111827]">{deploymentEnv}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="bg-[#111827] text-white border border-[#111827] px-3.5 py-2 rounded-full shadow-2xs flex items-center gap-2">
            <Users className="w-4 h-4 text-white" /> ACTIVE OCCUPANCY: 2,384 PAX
          </span>
        </div>
      </div>

      {/* Per-Sector Occupancy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectors.map((p, idx) => (
          <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 font-heading truncate max-w-[150px]">{p.id}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${p.badge}`}>
                {p.status}
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#111827] font-heading">{p.pax} <span className="text-xs text-slate-500 font-normal font-sans">pax</span></div>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                <span>Density: <strong className="text-[#111827] font-mono">{p.density}</strong></span>
                {p.trend && <span className="font-bold text-red-600 text-[10px]">{p.trend}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Blueprint Overlay + Queue Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Heatmap Card */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">Sector Density Heatmap & Motion Vectors</h3>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase font-medium">
              <span>Low</span>
              <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600"></div>
              <span>High</span>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-slate-900 rounded-lg border border-[#E5E7EB] p-4 overflow-hidden flex items-center justify-center select-none">
            {/* CAD Grid Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Density Blobs */}
            <div className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full bg-red-600/30 blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 left-1/2 w-48 h-32 rounded-full bg-amber-500/25 blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-emerald-500/20 blur-2xl"></div>

            <div className="relative z-10 w-full h-full border border-slate-700 rounded-lg p-3 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-200 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <span>ZONE A CONCOURSE ENTRANCE</span>
                <span className="font-bold text-emerald-400">OCCUPANCY: 68%</span>
              </div>

              <div className="self-center bg-red-600 text-white font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-2 uppercase tracking-wide shadow-md">
                <AlertTriangle className="w-4 h-4 text-white" /> Zone B Congested: 3.8 pax/m² (Surge Alert)
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-200 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <span>ZONE C (FLOWING)</span>
                <span>ZONE D (NORMAL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Surge Forecasting & Queues */}
        <div className="space-y-5">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#111827]" />
              15-Minute Surge Prediction
            </h3>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-900">
                <span>Surge Forecast: Zone B</span>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">92% Probability</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Zone B is predicted to exceed maximum capacity threshold in 15 minutes due to inbound arrival flow.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Button variant="danger" size="sm" className="w-full !h-8 !text-[11px]">
                  Deploy Crowd Response
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#111827]" />
              Queue Wait-Time Analytics
            </h3>
            <div className="space-y-2">
              {queues.map((q, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-[#E5E7EB] rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#111827] font-heading">{q.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">QUEUE COUNT: {q.count} PAX</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${q.color}`}>{q.wait}</span>
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

