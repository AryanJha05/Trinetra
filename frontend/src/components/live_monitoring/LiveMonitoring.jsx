import React, { useState } from 'react';
import { Grid, ZoomIn, Eye, EyeOff } from 'lucide-react';
import VideoPlayerCanvas from './VideoPlayerCanvas';

export default function LiveMonitoring({ privacyMasking, setPrivacyMasking, initialCameraId = 'CAM-202' }) {
  const [gridLayout, setGridLayout] = useState(4);
  const [aiOverlaysEnabled, setAiOverlaysEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activeCamId, setActiveCamId] = useState(initialCameraId);

  const cameras = [
    { camera_id: 'CAM-202', location: 'Platform 3 - Sector B (Pillar 12)', zone: 'Platform 3', status: 'ALERT' },
    { camera_id: 'CAM-101', location: 'Concourse North Entrance', zone: 'Concourse', status: 'ONLINE' },
    { camera_id: 'CAM-301', location: 'Platform 4 East FOB Staircase', zone: 'Platform 4', status: 'ONLINE' },
    { camera_id: 'CAM-042', location: 'Maintenance Yard Sector 4', zone: 'Restricted Yard', status: 'ALERT' },
    { camera_id: 'CAM-112', location: 'Food Court & Waiting Area B', zone: 'Concourse', status: 'ONLINE' },
    { camera_id: 'CAM-005', location: 'Escalator Bank A Main Hall', zone: 'Concourse', status: 'ONLINE' },
    { camera_id: 'CAM-404', location: 'Tunnel Westway 2 Track Edge', zone: 'Track', status: 'ONLINE' },
    { camera_id: 'CAM-200', location: 'Service Hall B Maintenance Depot', zone: 'Depot Yard', status: 'ONLINE' },
    { camera_id: 'CAM-009', location: 'Exterior Ramp & Gate 2 Security', zone: 'Security', status: 'ONLINE' },
  ];

  const displayedCameras = cameras.slice(0, gridLayout);

  return (
    <div className="p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E4E4DF] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Live CCTV Surveillance Grid
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Real-time CCTV Monitoring Telemetry · Indian Railways Operations Room</p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {/* Grid Layout Toggle */}
          <div className="flex items-center bg-white border border-[#E4E4DF] rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setGridLayout(4)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                gridLayout === 4 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> 2x2 (4)
            </button>
            <button
              onClick={() => setGridLayout(9)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                gridLayout === 9 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> 3x3 (9)
            </button>
          </div>

          {/* AI Overlays Toggle */}
          <button
            onClick={() => setAiOverlaysEnabled(!aiOverlaysEnabled)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              aiOverlaysEnabled 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-white text-slate-800 border-[#E4E4DF] hover:bg-slate-100'
            }`}
          >
            Detection Overlays: <strong>{aiOverlaysEnabled ? 'ON' : 'OFF'}</strong>
          </button>

          {/* Zoom Toggle */}
          <div className="flex items-center space-x-1.5 bg-[#F4F4F0] border border-[#E4E4DF] rounded-xl px-3 py-1.5 text-xs font-mono">
            <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
            <button onClick={() => setZoomLevel(1.0)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.0 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}>1.0x</button>
            <button onClick={() => setZoomLevel(1.5)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.5 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}>1.5x</button>
            <button onClick={() => setZoomLevel(2.0)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 2.0 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}>2.0x</button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Multi-Camera Grid */}
        <div className="lg:col-span-3">
          <div className={`grid ${gridLayout === 4 ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}`}>
            {displayedCameras.map((cam) => {
              const isActive = activeCamId === cam.camera_id;
              return (
                <div
                  key={cam.camera_id}
                  onClick={() => setActiveCamId(cam.camera_id)}
                  className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all shadow-sm ${isActive ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-[#E4E4DF] hover:border-slate-300'
                    }`}
                >
                  <div className="h-56 w-full relative">
                    <VideoPlayerCanvas
                      camera={cam}
                      privacyMasking={privacyMasking}
                      aiOverlaysEnabled={aiOverlaysEnabled}
                      zoomLevel={isActive ? zoomLevel : 1.0}
                    />
                  </div>
                  <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 font-mono">{cam.camera_id}</span>
                      <span className="text-slate-500 ml-2">{cam.zone}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${cam.status === 'ALERT' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                      {cam.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Health & Telemetry Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Active Feed Telemetry</span>
              <span className="font-mono text-xs text-slate-700 font-bold">{activeCamId}</span>
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Location:</span>
                <span className="text-slate-900 font-sans font-semibold">{cameras.find(c => c.camera_id === activeCamId)?.location}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Resolution:</span>
                <span className="text-slate-900 font-bold">1080p @ 30 FPS</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Inference Latency:</span>
                <span className="text-emerald-700 font-bold">12ms</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Privacy Status:</span>
                <span className={privacyMasking ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  {privacyMasking ? 'DPDP COMPLIANT' : 'OFF'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Cluster Uptime Overview</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F4F4F0] rounded-xl border border-[#E4E4DF] flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Concourse Nodes</p>
                  <p className="text-[11px] text-slate-500 font-mono">43/45 Active</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">100% UP</span>
              </div>
              <div className="p-3 bg-[#F4F4F0] rounded-xl border border-[#E4E4DF] flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Platform Nodes</p>
                  <p className="text-[11px] text-slate-500 font-mono">28/30 Active</p>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">93% UP</span>
              </div>
              <div className="p-3 bg-[#F4F4F0] rounded-xl border border-[#E4E4DF] flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Perimeter Nodes</p>
                  <p className="text-[11px] text-slate-500 font-mono">16/16 Active</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">100% UP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
