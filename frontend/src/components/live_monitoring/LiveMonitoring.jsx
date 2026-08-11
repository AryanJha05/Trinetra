import React, { useState } from 'react';
import { Grid, ZoomIn, Eye, EyeOff, Camera, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import VideoPlayerCanvas from './VideoPlayerCanvas';
import Button from '../common/Button';

export default function LiveMonitoring({ deploymentEnv = 'Railway Station', privacyMasking, setPrivacyMasking, initialCameraId = 'CAM-001' }) {
  const [gridLayout, setGridLayout] = useState(4);
  const [aiOverlaysEnabled, setAiOverlaysEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activeCamId, setActiveCamId] = useState(initialCameraId);

  const cameras = [
    { camera_id: 'CAM-001', location: 'Main Entrance & Concourse (Zone A)', zone: 'Zone A - Entrance', status: 'ONLINE' },
    { camera_id: 'CAM-002', location: 'Public Gathering Area (Zone B)', zone: 'Zone B - Public Area', status: 'ALERT' },
    { camera_id: 'CAM-003', location: 'Restricted Facility Gate (Zone C)', zone: 'Zone C - Restricted', status: 'ALERT' },
    { camera_id: 'CAM-004', location: 'Service Depot & Maintenance (Zone D)', zone: 'Zone D - Service Yard', status: 'ONLINE' },
    { camera_id: 'CAM-005', location: 'Escalator Link & Staircase', zone: 'Transit Link', status: 'ONLINE' },
    { camera_id: 'CAM-006', location: 'Parking Yard & Perimeter Gate 2', zone: 'Perimeter', status: 'ONLINE' },
  ];

  const displayedCameras = cameras.slice(0, gridLayout);

  return (
    <div className="p-4 md:p-6 space-y-6 font-sans text-[#111827] select-none">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
              LIVE MONITORING MATRIX
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            CCTV Infrastructure Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Real-time streams & ByteTrack AI inference across <strong className="text-[#111827]">{deploymentEnv}</strong>.
          </p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {/* Grid Layout Toggle */}
          <div className="flex items-center bg-slate-100 border border-[#E5E7EB] rounded-lg p-0.5">
            <button
              onClick={() => setGridLayout(4)}
              className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${gridLayout === 4 ? 'bg-[#111827] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Grid className="w-3.5 h-3.5" /> 2x2 (4)
            </button>
            <button
              onClick={() => setGridLayout(9)}
              className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${gridLayout === 9 ? 'bg-[#111827] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Grid className="w-3.5 h-3.5" /> 3x3 (9)
            </button>
          </div>

          {/* AI Overlays Toggle */}
          <button
            onClick={() => setAiOverlaysEnabled(!aiOverlaysEnabled)}
            className={`h-8 px-3 rounded-lg text-xs font-semibold transition-all border shadow-2xs ${aiOverlaysEnabled
                ? 'bg-[#111827] text-white border-[#111827]'
                : 'bg-white text-slate-700 border-[#E5E7EB] hover:bg-slate-50'
              }`}
          >
            AI Overlays: <strong>{aiOverlaysEnabled ? 'ON' : 'OFF'}</strong>
          </button>

          {/* Zoom Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 border border-[#E5E7EB] rounded-lg px-2 py-1 text-xs font-medium text-slate-600">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => setZoomLevel(1.0)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.0 ? 'bg-[#111827] text-white font-bold' : 'text-slate-600'}`}>1.0x</button>
            <button onClick={() => setZoomLevel(1.5)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.5 ? 'bg-[#111827] text-white font-bold' : 'text-slate-600'}`}>1.5x</button>
            <button onClick={() => setZoomLevel(2.0)} className={`px-1.5 py-0.5 rounded ${zoomLevel === 2.0 ? 'bg-[#111827] text-white font-bold' : 'text-slate-600'}`}>2.0x</button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Multi-Camera Grid */}
        <div className="lg:col-span-3">
          <div className={`grid ${gridLayout === 4 ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5'}`}>
            {displayedCameras.map((cam) => {
              const isActive = activeCamId === cam.camera_id;
              return (
                <div
                  key={cam.camera_id}
                  onClick={() => setActiveCamId(cam.camera_id)}
                  className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all shadow-2xs ${isActive ? 'border-[#111827] ring-2 ring-[#111827]/10' : 'border-[#E5E7EB] hover:border-slate-300'
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
                  <div className="p-3.5 bg-white border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#111827]">{cam.camera_id}</span>
                      <span className="text-slate-500 ml-2 font-medium">{cam.zone}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${cam.status === 'ALERT' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
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
        <div className="space-y-5">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider border-b border-[#F1F5F9] pb-2.5 flex items-center justify-between font-heading">
              <span>Active Stream Telemetry</span>
              <span className="font-mono text-xs text-[#111827] font-bold bg-slate-100 px-2 py-0.5 rounded">{activeCamId}</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>LOCATION:</span>
                <span className="text-[#111827] font-semibold">{cameras.find(c => c.camera_id === activeCamId)?.location}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>RESOLUTION:</span>
                <span className="text-[#111827] font-semibold">1080P @ 30 FPS</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>INFERENCE LATENCY:</span>
                <span className="text-emerald-600 font-semibold">12MS</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>PRIVACY MASK:</span>
                <span className={privacyMasking ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  {privacyMasking ? 'DPDP COMPLIANT' : 'OFF'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-heading">Cluster Uptime Overview</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">Concourse Nodes</p>
                  <p className="text-[10px] text-slate-400 font-mono">43/45 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">100% UP</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">Platform Nodes</p>
                  <p className="text-[10px] text-slate-400 font-mono">28/30 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-bold">93% UP</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">Perimeter Nodes</p>
                  <p className="text-[10px] text-slate-400 font-mono">16/16 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">100% UP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
