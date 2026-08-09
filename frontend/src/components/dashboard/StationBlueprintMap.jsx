import React from 'react';
import { Camera, AlertCircle, CheckCircle } from 'lucide-react';

export default function StationBlueprintMap({ onSelectCamera }) {
  const cameraNodes = [
    { id: 'CAM-NDLS-001', name: 'Platform 1 Main Concourse', status: 'ACTIVE', x: 20, y: 30, pax: 140 },
    { id: 'CAM-NDLS-002', name: 'Platform 2 North Staircase', status: 'ACTIVE', x: 55, y: 45, pax: 380 },
    { id: 'CAM-NDLS-003', name: 'Entry Gate 1 Security', status: 'ACTIVE', x: 80, y: 35, pax: 210 },
    { id: 'CAM-NDLS-004', name: 'Foot Over Bridge (FOB-1)', status: 'ACTIVE', x: 35, y: 75, pax: 85 },
    { id: 'CAM-NDLS-042', name: 'Platform 4 - Sector B', status: 'ALERT', x: 70, y: 70, pax: 195 },
  ];

  return (
    <div className="bg-white border border-[#E4E4DF] rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Live CCTV Node Layout</h4>
          <p className="text-xs text-slate-500">Interactive station CCTV node matrix — Click node to inspect feed</p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Active (42)
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Alert (2)
          </span>
        </div>
      </div>

      {/* Architectural Vector Blueprint */}
      <div className="relative w-full h-[360px] bg-[#ECECE7] rounded-2xl overflow-hidden border border-[#E4E4DF] p-4 select-none">
        {/* SVG Structural floorplan */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-400 opacity-40 pointer-events-none" strokeWidth="1.5" fill="none">
          <rect x="5%" y="10%" width="90%" height="30%" rx="8" strokeDasharray="6 6" />
          <line x1="5%" y1="52%" x2="95%" y2="52%" strokeWidth="2" />
          <line x1="5%" y1="68%" x2="95%" y2="68%" strokeWidth="2" />
          <line x1="5%" y1="84%" x2="95%" y2="84%" strokeWidth="2" />
        </svg>

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
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${isAlert ? 'bg-red-600 border-white text-white shadow-lg' : 'bg-slate-900 border-white text-white hover:scale-110'
                }`}>
                <Camera className="w-4 h-4" />
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#18181B] text-white text-[11px] px-3 py-2 rounded-xl shadow-xl whitespace-nowrap z-20">
                <p className="font-bold">{node.id} · {node.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">Commuter Occupancy: {node.pax} pax</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
