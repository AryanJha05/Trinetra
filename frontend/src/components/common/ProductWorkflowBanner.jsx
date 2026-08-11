import React from 'react';
import { Camera, Cpu, Zap, Activity, AlertTriangle, ShieldCheck, UserCheck, FileText } from 'lucide-react';

export default function ProductWorkflowBanner() {
  const steps = [
    { label: 'CCTV Cameras', icon: Camera, desc: 'Passive Streams' },
    { label: 'Video Processing', icon: Cpu, desc: '30 FPS Telemetry' },
    { label: 'AI Detection Engine', icon: Zap, desc: 'YOLOv11 & ByteTrack' },
    { label: 'Event Analysis', icon: Activity, desc: 'Multi-Frame Check' },
    { label: 'Risk Assessment', icon: AlertTriangle, desc: 'Explainable AI' },
    { label: 'Smart Alerts', icon: ShieldCheck, desc: 'Priority Triage' },
    { label: 'Human Response', icon: UserCheck, desc: 'Operator Action' },
    { label: 'Analytics & Audit', icon: FileText, desc: 'Audit & Learning' },
  ];

  return (
    <div className="bg-[#111827] text-white border border-[#374151] rounded-[4px] p-4 select-none relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#374151] pb-3 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono bg-[#1F2937] text-[#C85A17] border border-[#374151] px-2 py-0.5 rounded-[2px]">
              ENTERPRISE VISION PIPELINE
            </span>
            <span className="text-xs font-mono text-slate-400">TRINETRA SOC OPERATIONAL FLOW</span>
          </div>
          <h2 className="text-sm font-bold text-white mt-1 font-heading uppercase tracking-wide">
            Proactive Surveillance & Security Operator Decision Pipeline
          </h2>
        </div>
        <div className="flex items-center space-x-2 bg-[#1F2937] border border-[#374151] px-3 py-1 rounded-[4px] text-xs font-mono text-slate-300">
          <UserCheck className="w-3.5 h-3.5 text-[#C85A17]" />
          <span>HUMAN-IN-THE-LOOP OPERATIONAL PROTOCOL</span>
        </div>
      </div>

      {/* Workflow Steps Horizontal Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-[#1F2937] border border-[#374151] hover:border-[#C85A17] p-2.5 rounded-[4px] flex flex-col items-center text-center space-y-1 transition-colors group"
            >
              <div className="w-7 h-7 rounded-[2px] bg-[#111827] text-[#C85A17] border border-[#374151] flex items-center justify-center group-hover:bg-[#C85A17] group-hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 leading-tight font-heading uppercase tracking-wider">
                0{idx + 1}. {step.label}
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
