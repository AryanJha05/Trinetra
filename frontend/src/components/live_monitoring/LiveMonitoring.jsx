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
    <div className="h-full max-h-full overflow-hidden flex flex-col space-y-3 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2.5 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <Camera className="w-3.5 h-3.5 text-slate-800" />
            <span>LIVE MATRIX</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
            CCTV Infrastructure Matrix
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time multi-camera feeds & ByteTrack computer vision inference matrix.
          </p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {/* Grid Layout Toggle */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-md p-0.5">
            <button
              onClick={() => setGridLayout(4)}
              className={`px-2.5 py-1 text-xs font-semibold rounded font-mono flex items-center gap-1 transition-all ${
                gridLayout === 4 ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3 h-3" /> 2x2 (4)
            </button>
            <button
              onClick={() => setGridLayout(9)}
              className={`px-2.5 py-1 text-xs font-semibold rounded font-mono flex items-center gap-1 transition-all ${
                gridLayout === 9 ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3 h-3" /> 3x3 (9)
            </button>
          </div>

          {/* AI Overlays Toggle */}
          <button
            onClick={() => setAiOverlaysEnabled(!aiOverlaysEnabled)}
            className={`h-7 px-2.5 rounded-md text-xs font-semibold font-mono transition-all border ${
              aiOverlaysEnabled
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            AI Overlays: <strong>{aiOverlaysEnabled ? 'ON' : 'OFF'}</strong>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded-md px-1.5 py-0.5 text-xs font-mono text-slate-600">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setZoomLevel(1.0)}
              className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.0 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
            >
              1.0x
            </button>
            <button
              onClick={() => setZoomLevel(1.5)}
              className={`px-1.5 py-0.5 rounded ${zoomLevel === 1.5 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
            >
              1.5x
            </button>
            <button
              onClick={() => setZoomLevel(2.0)}
              className={`px-1.5 py-0.5 rounded ${zoomLevel === 2.0 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
            >
              2.0x
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content 12-Column Responsive Layout (Internal Scroll) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Multi-Camera Streams Grid (9 Columns - Internal Scroll) */}
        <div className="lg:col-span-9 flex flex-col h-full min-h-0 overflow-y-auto pr-1">
          <div className={`grid ${gridLayout === 4 ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}`}>
            {displayedCameras.map((cam) => {
              const isActive = activeCamId === cam.camera_id;
              return (
                <div
                  key={cam.camera_id}
                  onClick={() => setActiveCamId(cam.camera_id)}
                  className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    isActive
                      ? 'border-slate-900 ring-2 ring-slate-900/10'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="h-56 w-full relative bg-slate-900">
                    <VideoPlayerCanvas
                      camera={cam}
                      privacyMasking={privacyMasking}
                      aiOverlaysEnabled={aiOverlaysEnabled}
                      zoomLevel={isActive ? zoomLevel : 1.0}
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 font-mono">{cam.camera_id}</span>
                      <span className="text-slate-500 ml-2 font-sans">{cam.zone}</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        cam.status === 'ALERT'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {cam.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Health & Active Stream Telemetry (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col h-full min-h-0 overflow-y-auto pr-1 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                Active Node Telemetry
              </h3>
              <span className="font-mono text-xs text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {activeCamId}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>LOCATION:</span>
                <span className="text-slate-900 font-semibold truncate max-w-[120px]">
                  {cameras.find(c => c.camera_id === activeCamId)?.location}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 font-mono">
                <span>STREAM RES:</span>
                <span className="text-slate-900 font-bold">1080P @ 30 FPS</span>
              </div>
              <div className="flex justify-between text-slate-600 font-mono">
                <span>AI LATENCY:</span>
                <span className="text-emerald-700 font-bold">12MS</span>
              </div>
              <div className="flex justify-between text-slate-600 font-mono">
                <span>DPDP MASK:</span>
                <span className={privacyMasking ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                  {privacyMasking ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading border-b border-slate-100 pb-3">
              Cluster Uptime Status
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Concourse Nodes</p>
                  <p className="text-[10px] text-slate-500 font-mono">43/45 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                  100% UP
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Platform Nodes</p>
                  <p className="text-[10px] text-slate-500 font-mono">28/30 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold font-mono">
                  93% UP
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Perimeter Nodes</p>
                  <p className="text-[10px] text-slate-500 font-mono">16/16 ACTIVE</p>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                  100% UP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
