import React, { useEffect } from 'react';
import { X, AlertTriangle, Send, Camera } from 'lucide-react';
import Button from '../common/Button';

export default function IncidentDetailDrawer({ incident, onClose, onDispatch }) {
  useEffect(() => {
    if (incident) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [incident]);

  if (!incident) return null;

  return (
    <>
      {/* Fixed Backdrop Overlay: z-[1000] */}
      <div
        className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel: z-[1100] */}
      <div className="fixed inset-y-0 right-0 z-[1100] w-full max-w-md bg-white border-l border-[#D1D5DB] p-6 flex flex-col justify-between overflow-y-auto font-sans text-[#111827] select-none">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded-[2px] font-mono font-bold uppercase">
                {incident.severity}
              </span>
              <span className="text-xs font-mono text-[#C85A17] font-bold">{incident.id}</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-[2px] text-slate-500 hover:text-[#111827] hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#111827] font-heading uppercase leading-snug">{incident.title}</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">{incident.zone} · CAM: {incident.cam}</p>
          </div>

          {/* Evidence Frame Preview */}
          <div className="relative rounded-[4px] overflow-hidden border border-[#374151] bg-[#0B0F17] h-52 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0B0F17] flex flex-col items-center justify-center p-4 text-center">
              <Camera className="w-8 h-8 text-[#C85A17] mb-2 opacity-90" />
              <span className="text-xs text-slate-200 font-mono font-bold uppercase tracking-wider">High-Res Camera Evidence Frame</span>
              <span className="text-[10px] text-slate-400 font-mono mt-1">TIMESTAMP: {incident.time}</span>
            </div>

            <div className="absolute bottom-3 left-3 bg-[#DC2626] text-white text-[10px] font-bold px-2.5 py-1 rounded-[2px] flex items-center gap-1 font-mono uppercase">
              <AlertTriangle className="w-3.5 h-3.5" /> AI CONFIDENCE: {incident.conf}
            </div>
          </div>

          <div className="bg-[#F7F6F2] border border-[#D1D5DB] rounded-[4px] p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-heading">Detection Diagnostics</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {incident.details || 'Object stationary for > 5 minutes without owner within 10m perimeter. Verified across consecutive video frames.'}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-[4px] p-4 space-y-1">
            <span className="text-[10px] font-bold text-amber-900 uppercase font-mono">Action Protocol:</span>
            <p className="text-xs text-slate-900 font-semibold">{incident.recommended_action || 'Dispatch Security Response Unit and cordon area.'}</p>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-200 space-y-2.5 font-mono">
          <Button
            variant="danger"
            size="md"
            icon={Send}
            onClick={() => {
              onDispatch(incident.id);
              onClose();
            }}
            className="w-full !h-10 !text-xs uppercase tracking-wider"
          >
            Dispatch Security Response Team
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full !h-9 !text-xs uppercase tracking-wider"
          >
            Close Panel
          </Button>
        </div>
      </div>
    </>
  );
}
