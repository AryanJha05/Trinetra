import React from 'react';
import { Camera, AlertCircle, CheckCircle } from 'lucide-react';

export default function StationBlueprintMap({ onSelectCamera }) {
  const cameraNodes = [
    { id: 'CAM-001', name: 'Zone A - Main Concourse Entrance', status: 'ACTIVE', x: 20, y: 30, pax: 140 },
    { id: 'CAM-002', name: 'Zone B - Public Gathering Area', status: 'ALERT', x: 55, y: 45, pax: 380 },
    { id: 'CAM-003', name: 'Zone C - Restricted Gate Compound', status: 'ALERT', x: 35, y: 75, pax: 15 },
    { id: 'CAM-004', name: 'Zone D - Service & Maintenance Yard', status: 'ACTIVE', x: 80, y: 35, pax: 210 },
    { id: 'CAM-005', name: 'Transit Escalator Link', status: 'ACTIVE', x: 70, y: 70, pax: 95 },
  ];

  return (
    <div className="w-full h-full min-h-[220px] bg-slate-950 rounded-lg overflow-hidden border border-slate-200 relative select-none flex flex-col justify-between p-3">
      {/* CAD Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* SVG Structural floorplan */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-700 opacity-60 pointer-events-none" strokeWidth="1" fill="none">
        <rect x="5%" y="10%" width="90%" height="30%" rx="4" strokeDasharray="4 4" />
        <line x1="5%" y1="52%" x2="95%" y2="52%" strokeWidth="1.5" />
        <line x1="5%" y1="68%" x2="95%" y2="68%" strokeWidth="1.5" />
        <line x1="5%" y1="84%" x2="95%" y2="84%" strokeWidth="1.5" />
      </svg>

      {/* Map Legend Bar Overlay */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 backdrop-blur-xs p-2 rounded border border-slate-800 text-[10px] font-mono text-slate-300">
        <span className="font-bold text-white uppercase tracking-wider">Spatial Topology Grid</span>
        <div className="flex items-center space-x-3 text-[10px] uppercase font-semibold">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active (42)
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Alert (2)
          </span>
        </div>
      </div>

      {/* Camera Nodes */}
      {cameraNodes.map((node) => {
        const isAlert = node.status === 'ALERT';
        return (
          <div
            key={node.id}
            onClick={() => onSelectCamera(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
          >
            <div className={`relative flex items-center justify-center w-7 h-7 rounded-lg border transition-all shadow-xs ${
              isAlert ? 'bg-red-600 border-white text-white shadow-red-900/40' : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-400'
            }`}>
              <Camera className="w-3.5 h-3.5" />
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-md border border-slate-700 shadow-xl whitespace-nowrap z-30 font-medium">
              <p className="font-bold text-white font-mono">{node.id} · {node.name}</p>
              <p className="text-slate-400 font-sans"> Occupancy: <span className="text-emerald-400 font-bold font-mono">{node.pax} pax</span></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
