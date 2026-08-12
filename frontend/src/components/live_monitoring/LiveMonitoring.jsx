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
    { camera_id: 'CAM-007', location: 'Baggage Handling Bay 3', zone: 'Zone D - Maintenance', status: 'ONLINE' },
    { camera_id: 'CAM-008', location: 'Platform 2 North Corridor', zone: 'Zone B - Concourse', status: 'ONLINE' },
    { camera_id: 'CAM-009', location: 'South Gate Vehicle Entry', zone: 'Perimeter', status: 'ONLINE' },
  ];

  const displayedCameras = cameras.slice(0, gridLayout);

  return (
    <div className="w-full space-y-4 font-sans text-[#0F172A] select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#64748B] mb-1 font-sans">
            <Camera className="w-3.5 h-3.5 text-[#0F172A]" />
            <span className="font-semibold text-[#0F172A]">LIVE MONITORING</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
            Live Surveillance Matrix
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time multi-camera CCTV feeds, object tracking overlays, and privacy compliance controls.
          </p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {/* Grid Layout Toggle */}
          <div className="flex items-center bg-[#F1F5F9] rounded-full p-1 border border-[#E2E8F0]">
            <button
              onClick={() => setGridLayout(4)}
              className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                gridLayout === 4 ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Grid className="w-3 h-3" /> 2x2 Grid
            </button>
            <button
              onClick={() => setGridLayout(9)}
              className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                gridLayout === 9 ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Grid className="w-3 h-3" /> 3x3 Grid
            </button>
          </div>

          {/* AI Overlays Toggle */}
          <button
            onClick={() => setAiOverlaysEnabled(!aiOverlaysEnabled)}
            className={`h-8 px-3 rounded-full text-xs font-semibold transition-all border ${
              aiOverlaysEnabled
                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                : 'bg-white text-[#64748B] border-[#CBD5E1] hover:bg-[#F8FAFC]'
            }`}
          >
            AI Overlays: <strong>{aiOverlaysEnabled ? 'ON' : 'OFF'}</strong>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full px-2 py-1 text-xs font-sans text-[#64748B]">
            <ZoomIn className="w-3.5 h-3.5 text-[#64748B]" />
            <button
              onClick={() => setZoomLevel(1.0)}
              className={`px-2 py-0.5 rounded-full ${zoomLevel === 1.0 ? 'bg-[#0F172A] text-white font-bold' : 'text-[#64748B]'}`}
            >
              1.0x
            </button>
            <button
              onClick={() => setZoomLevel(1.5)}
              className={`px-2 py-0.5 rounded-full ${zoomLevel === 1.5 ? 'bg-[#0F172A] text-white font-bold' : 'text-[#64748B]'}`}
            >
              1.5x
            </button>
            <button
              onClick={() => setZoomLevel(2.0)}
              className={`px-2 py-0.5 rounded-full ${zoomLevel === 2.0 ? 'bg-[#0F172A] text-white font-bold' : 'text-[#64748B]'}`}
            >
              2.0x
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Multi-Camera Streams Grid (9 Columns) */}
        <div className="lg:col-span-9">
          <div className={`grid gap-4 ${gridLayout === 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
            {displayedCameras.map((cam) => {
              const isActive = activeCamId === cam.camera_id;
              return (
                <div
                  key={cam.camera_id}
                  onClick={() => setActiveCamId(cam.camera_id)}
                  className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all shadow-2xs ${
                    isActive
                      ? 'border-[#0F172A] ring-2 ring-[#0F172A]/10'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  {/* Strict 16:9 Aspect Video Container */}
                  <div className="w-full aspect-video relative bg-slate-900 overflow-hidden">
                    <VideoPlayerCanvas
                      camera={cam}
                      privacyMasking={privacyMasking}
                      aiOverlaysEnabled={aiOverlaysEnabled}
                      zoomLevel={isActive ? zoomLevel : 1.0}
                    />
                  </div>

                  {/* Standardized Card Footer */}
                  <div className="p-3.5 bg-white border-t border-[#F1F5F9] flex items-center justify-between text-xs font-sans">
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-[#0F172A] font-mono">{cam.camera_id}</span>
                      <span className="text-[#64748B] ml-2 font-sans truncate inline-block max-w-[140px] align-bottom">{cam.zone}</span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase border font-sans flex-shrink-0 ${
                        cam.status === 'ALERT'
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]'
                          : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
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

        {/* Node Telemetry & Uptime Status (3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
              <h3 className="text-xs font-bold text-[#0F172A] tracking-wider">
                Active Camera Status
              </h3>
              <span className="font-mono text-xs text-[#0F172A] font-bold bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                {activeCamId}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#64748B]">
                <span>LOCATION:</span>
                <span className="text-[#0F172A] font-semibold truncate max-w-[120px]">
                  {cameras.find(c => c.camera_id === activeCamId)?.location}
                </span>
              </div>
              <div className="flex justify-between text-[#64748B] font-sans">
                <span>STREAM RES:</span>
                <span className="text-[#0F172A] font-bold">1080P @ 30 FPS</span>
              </div>
              <div className="flex justify-between text-[#64748B] font-sans">
                <span>PROCESSING TIME:</span>
                <span className="text-[#047857] font-bold">12MS</span>
              </div>
              <div className="flex justify-between text-[#64748B] font-sans">
                <span>PRIVACY MASK:</span>
                <span className={privacyMasking ? 'text-[#047857] font-bold' : 'text-[#64748B]'}>
                  {privacyMasking ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans shadow-2xs">
            <h3 className="text-xs font-bold text-[#0F172A] tracking-wider border-b border-[#F1F5F9] pb-2.5">
              System Uptime Status
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">Concourse Nodes</p>
                  <p className="text-xs text-[#64748B]">43/45 ACTIVE</p>
                </div>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full font-semibold font-sans">
                  100% UP
                </span>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">Platform Nodes</p>
                  <p className="text-xs text-[#64748B]">28/30 ACTIVE</p>
                </div>
                <span className="text-[10px] bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] px-2.5 py-0.5 rounded-full font-semibold font-sans">
                  93% UP
                </span>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">Perimeter Nodes</p>
                  <p className="text-xs text-[#64748B]">16/16 ACTIVE</p>
                </div>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full font-semibold font-sans">
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
