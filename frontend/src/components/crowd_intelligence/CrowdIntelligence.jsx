import React from 'react';
import { Users, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export default function CrowdIntelligence() {
  const platforms = [
    { id: 'Platform 1', pax: '1,240', density: '1.4 pax/m²', status: 'NORMAL', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 'Platform 2', pax: '3,850', density: '3.8 pax/m²', status: 'SURGING / HIGH', badge: 'bg-red-100 text-red-800 border-red-300', trend: '+38% flow' },
    { id: 'Platform 3', pax: '890', density: '0.9 pax/m²', status: 'NORMAL', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 'Platform 4', pax: '2,100', density: '2.3 pax/m²', status: 'MODERATE', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  ];

  const queues = [
    { name: 'Main Ticketing Hall (Counters 1-12)', wait: '12 min', status: 'Optimal', count: 48, color: 'text-emerald-700' },
    { name: 'Security Gate A (Baggage Scanners)', wait: '28 min', status: 'High Wait', count: 142, color: 'text-red-700' },
    { name: 'Foot Overbridge 1 (North-South Link)', wait: '4 min', status: 'Flowing', count: 85, color: 'text-emerald-700' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 font-heading">
            <Users className="w-5 h-5 text-railway-navy" />
            Station Crowd Analytics & Passenger Density
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Real-time station occupancy monitoring, flow trends, and queue bottleneck diagnostics</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-railway-mint animate-pulse"></span>
          <span>Density Engine Active</span>
        </div>
      </div>

      {/* Per-Platform Occupancy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((p, idx) => (
          <div key={idx} className="bg-white border border-[#E4E4DF] rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase font-heading">{p.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${p.badge}`}>
                {p.status}
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">{p.pax} <span className="text-xs text-slate-500 font-normal font-sans">pax</span></div>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-1 font-sans">
                <span>Density: <strong className="text-slate-900 font-mono">{p.density}</strong></span>
                {p.trend && <span className="font-bold text-red-600 font-mono">{p.trend}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Floorplan + Queue Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heatmap Card (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Platform Density Blueprint Overlay</h3>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
              <span>Low Density</span>
              <div className="w-24 h-2 rounded bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"></div>
              <span>High Density</span>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-slate-950 rounded-xl border border-slate-700 p-4 overflow-hidden flex items-center justify-center select-none">
            {/* Density Glow Blobs */}
            <div className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full bg-red-600/35 blur-2xl animate-pulse"></div>
            <div className="absolute top-1/3 left-1/2 w-48 h-32 rounded-full bg-amber-500/30 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-emerald-500/25 blur-xl"></div>

            <div className="relative z-10 w-full h-full border border-slate-700 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs font-mono text-slate-200 bg-slate-900/90 p-2.5 rounded border border-slate-700">
                <span>CONCOURSE NORTH ENTRANCE</span>
                <span className="font-bold text-emerald-400">Occupancy: 68%</span>
              </div>

              <div className="self-center bg-red-600 text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-heading">
                <AlertTriangle className="w-4 h-4" /> Platform 2: Congested (3.8 pax/m²)
              </div>

              <div className="flex justify-between text-xs font-mono text-slate-200 bg-slate-900/90 p-2.5 rounded border border-slate-700">
                <span>PLATFORM 1 (FLOWING)</span>
                <span>PLATFORM 4 (NORMAL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Forecasting & Queue Monitoring (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-railway-navy" />
              Congestion Forecasting
            </h3>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-800">
                <span>Surge Alert: Platform 2</span>
                <span className="font-mono bg-red-200 text-red-900 px-2 py-0.5 rounded text-[10px]">Est. 15 Mins</span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                Platform 2 is expected to exceed capacity in 15 minutes due to delayed arrival of Express Train 1204.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm font-heading">
                  Deploy RPF Crowd Control
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-railway-navy" />
              Queue Wait-Time Analytics
            </h3>
            <div className="space-y-2.5">
              {queues.map((q, idx) => (
                <div key={idx} className="p-3.5 bg-[#F4F4F0] border border-[#E4E4DF] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-slate-900 font-heading">{q.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">Queue Count: {q.count} pax</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-extrabold font-mono ${q.color}`}>{q.wait}</span>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">{q.status}</p>
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
