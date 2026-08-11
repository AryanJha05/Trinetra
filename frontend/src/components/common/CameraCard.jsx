import React from 'react';
import { Camera, Eye } from 'lucide-react';
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
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 font-sans transition-all hover:border-slate-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-bold text-slate-900 font-mono">{camId}</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${
            status === 'ONLINE'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {status}
        </span>
      </div>

      <div>
        <p className="text-xs text-slate-700 font-medium">{location}</p>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-1 font-mono">
          <span>{fps} FPS Stream</span>
          <span>{detectionsCount} Objects Tracked</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={onSelect}
          className="w-full !h-8 !text-xs"
        >
          View Stream Feed
        </Button>
      </div>
    </div>
  );
}
