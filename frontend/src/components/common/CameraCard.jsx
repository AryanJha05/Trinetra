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
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden font-sans transition-all hover:border-[#CBD5E1] shadow-2xs hover:shadow-xs flex flex-col justify-between select-none">
      {/* Top Card Header */}
      <div className="px-3.5 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span className="text-xs font-bold text-[#0F172A] font-mono">{camId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase font-sans ${
              status === 'ONLINE'
                ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
            }`}
          >
            {status}
          </span>
          <MoreVertical className="w-3.5 h-3.5 text-[#64748B] cursor-pointer hover:text-[#0F172A]" />
        </div>
      </div>

      {/* 16:9 Camera Preview Wrapper */}
      <div className="w-full aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <div className="text-center p-2 z-10">
          <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
          <p className="text-[10px] font-sans text-slate-300 truncate max-w-[180px]">{location}</p>
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-sans font-medium text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-700">
          {fps} FPS · 1080P
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-sans font-medium text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-700">
          {detectionsCount} Tracked
        </div>
      </div>

      {/* Bottom Footer & Action Placement */}
      <div className="p-3.5 bg-white space-y-2.5 border-t border-[#F1F5F9]">
        <div>
          <p className="text-xs font-bold text-[#0F172A] font-sans truncate">{location}</p>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] font-sans mt-0.5">
            <span>Zone: Main Sector</span>
            <span className="text-[#047857] font-semibold">Latency: 11ms</span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={onSelect}
          className="w-full mt-1"
        >
          View Stream Feed
        </Button>
      </div>
    </div>
  );
}
