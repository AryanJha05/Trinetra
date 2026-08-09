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
      <div className="fixed inset-y-0 right-0 z-[1100] w-full max-w-md bg-white border-l border-[#E4E4DF] shadow-2xl p-8 flex flex-col justify-between overflow-y-auto transform transition-transform animate-slideLeft font-sans text-slate-900 select-none">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md font-mono font-bold">
                {incident.severity}
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">{incident.id}</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{incident.title}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{incident.zone} · Camera: {incident.cam}</p>
          </div>

          {/* Evidence Frame Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-950 h-52 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
              <Camera className="w-8 h-8 text-railway-mint mb-2 opacity-80" />
              <span className="text-xs text-slate-200 font-mono font-semibold">High-Res Camera Evidence Frame</span>
              <span className="text-[10px] text-slate-400 font-mono mt-1">Timestamp: {incident.time}</span>
            </div>

            <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> AI Confidence: {incident.conf}
            </div>
          </div>

          <div className="bg-[#F4F4F0] border border-[#E4E4DF] rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">Detection Diagnostics</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {incident.details || 'Object stationary for > 5 minutes without owner within 10m perimeter. Verified across consecutive video frames.'}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase font-heading">Action Protocol:</span>
            <p className="text-xs text-slate-800 font-medium">{incident.recommended_action || 'Dispatch RPF Patrol Unit and cordon area.'}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-3 font-mono">
          <Button
            variant="primary"
            size="lg"
            icon={Send}
            onClick={() => {
              onDispatch(incident.id);
              onClose();
            }}
            className="w-full"
          >
            Dispatch RPF Quick Response Guard
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full"
          >
            Close Panel
          </Button>
        </div>
      </div>
    </>
  );
}
