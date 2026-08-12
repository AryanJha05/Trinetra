import React from 'react';
import { Camera } from 'lucide-react';

export default function StationBlueprintMap({ onSelectCamera }) {
  const cameraNodes = [
    { id: 'CAM-001', name: 'Zone A - Main Concourse Entrance', status: 'ACTIVE', x: 22, y: 32, pax: 140 },
    { id: 'CAM-002', name: 'Zone B - Public Gathering Area', status: 'ALERT', x: 55, y: 42, pax: 380 },
    { id: 'CAM-003', name: 'Zone C - Restricted Gate Compound', status: 'ALERT', x: 32, y: 72, pax: 15 },
    { id: 'CAM-004', name: 'Zone D - Service & Maintenance Yard', status: 'ACTIVE', x: 80, y: 32, pax: 210 },
    { id: 'CAM-005', name: 'Zone E - Escalator & Transit Link', status: 'ACTIVE', x: 72, y: 68, pax: 95 },
  ];

  return (
    <div className="w-full h-[230px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative select-none flex flex-col justify-between p-3 font-sans shadow-2xs">
      {/* Subtle Architectural Grid Lines */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-800 opacity-80 pointer-events-none" strokeWidth="1" fill="none">
        {/* Zone Boundaries */}
        <rect x="4%" y="8%" width="44%" height="42%" rx="4" strokeDasharray="3 3" />
        <rect x="52%" y="8%" width="44%" height="42%" rx="4" strokeDasharray="3 3" />
        <rect x="4%" y="54%" width="44%" height="40%" rx="4" strokeDasharray="3 3" />
        <rect x="52%" y="54%" width="44%" height="40%" rx="4" strokeDasharray="3 3" />
        
        {/* Corridor Dividers */}
        <line x1="4%" y1="51%" x2="96%" y2="51%" strokeWidth="1" />
        <line x1="50%" y1="8%" x2="50%" y2="94%" strokeWidth="1" />
      </svg>

      {/* Zone Label Watermarks */}
      <div className="absolute inset-0 pointer-events-none p-4 text-[10px] font-sans text-slate-600 font-semibold uppercase tracking-wider flex flex-col justify-between">
        <div className="flex justify-between">
          <span>Zone A (North Concourse)</span>
          <span>Zone B (South Platform)</span>
        </div>
        <div className="flex justify-between">
          <span>Zone C (Secure Gate)</span>
          <span>Zone D (Service Yard)</span>
        </div>
      </div>

      {/* Map Legend Bar */}
      <div className="relative z-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs font-sans">
        <span className="font-semibold text-slate-200">Live Camera Layout</span>
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> 42 Active
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> 2 Alert
          </span>
        </div>
      </div>

      {/* Camera Markers */}
      <div className="relative z-10 w-full h-full">
        {cameraNodes.map((node) => {
          const isAlert = node.status === 'ALERT';
          return (
            <div
              key={node.id}
              onClick={() => onSelectCamera && onSelectCamera(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className={`relative flex items-center justify-center w-6 h-6 rounded-md border transition-colors shadow-xs ${
                isAlert
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
              }`}>
                <Camera className="w-3 h-3" />
              </div>

              {/* Node ID Badge below marker */}
              <div className="mt-1 text-center">
                <span className={`text-[8px] font-mono px-1 py-0.2 rounded font-bold ${
                  isAlert ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}>
                  {node.id}
                </span>
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute top-9 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950 text-white text-[10px] p-2 rounded border border-slate-700 shadow-xl whitespace-nowrap z-30 font-medium">
                <p className="font-bold text-white font-mono">{node.id} · {node.name}</p>
                <p className="text-slate-400 font-sans">Occupancy: <span className="text-emerald-400 font-bold font-mono">{node.pax} pax</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
