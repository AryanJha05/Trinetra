import React from 'react';
import { Camera, Eye, MoreVertical } from 'lucide-react';
import Button from './Button';

export default function CameraCard({
  camId,
  location,
  status = 'ONLINE',
  detectionsCount = 0,
  fps = 30,
  onSelect
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden font-sans transition-all hover:border-slate-300 shadow-2xs hover:shadow-xs flex flex-col justify-between select-none">
      {/* Top Card Header */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-900 font-mono">{camId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${
              status === 'ONLINE'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {status}
          </span>
          <MoreVertical className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>

      {/* 16:9 Camera Preview Wrapper */}
      <div className="w-full aspect-video bg-slate-950 relative flex items-center justify-center overflow-hidden">
        {/* Placeholder Simulated CCTV Video Grid Line Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
        <div className="text-center p-2 z-10">
          <Camera className="w-6 h-6 text-slate-500 mx-auto mb-1" />
          <p className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">{location}</p>
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
          {fps} FPS · 1080P
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
          {detectionsCount} Tracked
        </div>
      </div>

      {/* Bottom Footer & Action Placement */}
      <div className="p-3 bg-white space-y-2 border-t border-slate-100">
        <div>
          <p className="text-xs font-bold text-slate-900 font-heading truncate">{location}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-0.5">
            <span>Zone: Main Sector</span>
            <span className="text-emerald-700 font-semibold">Latency: 11ms</span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={onSelect}
          className="w-full !h-7.5 !text-xs mt-1"
        >
          View Stream Feed
        </Button>
      </div>
    </div>
  );
}
