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
    <div className="bg-[#0F172A] text-white border border-[#0F172A] rounded-2xl p-4 select-none relative shadow-sm font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-semibold tracking-wider font-sans bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-0.5 rounded-full">
              ENTERPRISE VISION PIPELINE
            </span>
            <span className="text-xs font-sans text-slate-400">TRINETRA SOC OPERATIONAL FLOW</span>
          </div>
          <h2 className="text-sm font-bold text-white mt-1.5 font-sans tracking-wide">
            Proactive Surveillance & Security Operator Decision Pipeline
          </h2>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-sans text-slate-300">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>HUMAN-IN-THE-LOOP OPERATIONAL PROTOCOL</span>
        </div>
      </div>

      {/* Workflow Steps Horizontal Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/80 hover:border-slate-500 p-2.5 rounded-xl flex flex-col items-center text-center space-y-1.5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-slate-200 border border-slate-700 flex items-center justify-center group-hover:bg-slate-700 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 leading-tight font-sans">
                0{idx + 1}. {step.label}
              </span>
              <span className="text-[10px] font-sans text-slate-400">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
