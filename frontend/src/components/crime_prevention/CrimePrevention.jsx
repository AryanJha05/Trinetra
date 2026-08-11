import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Eye, Lock, RefreshCw, Send, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Button from '../common/Button';

export default function CrimePrevention({ onNavigateToFeed, onDispatchGuard }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Detections (12)' },
    { id: 'LOITERING', label: 'Loitering & Suspicious (3)' },
    { id: 'UNATTENDED', label: 'Unattended Luggage (2)' },
    { id: 'RESTRICTED', label: 'Restricted Access (4)' },
    { id: 'VIOLENCE', label: 'Violence & Motion (2)' },
    { id: 'COUNTERFLOW', label: 'Counter-Flow Movement (1)' },
  ];

  const crimeEvents = [
    {
      id: 'EVT-901',
      category: 'UNATTENDED',
      type: 'Unattended Object Detection',
      severity: 'CRITICAL',
      cam: 'CAM-001',
      location: 'Public Zone B Concourse',
      confidence: '96.4%',
      dwellTime: '4m 12s',
      time: '14:28:10',
      status: 'Active Alert',
      desc: 'Unattended object detected in Public Zone B without owner presence for > 4 minutes.',
    },
    {
      id: 'EVT-902',
      category: 'RESTRICTED',
      type: 'Restricted Area Perimeter Breach',
      severity: 'CRITICAL',
      cam: 'CAM-003',
      location: 'Restricted Area Gate Compound A',
      confidence: '98.1%',
      dwellTime: '1m 45s',
      time: '14:25:30',
      status: 'Guard Dispatched',
      desc: 'Unauthorized individual scaled perimeter fence into restricted access zone.',
    },
    {
      id: 'EVT-903',
      category: 'LOITERING',
      type: 'Suspicious Loitering Pattern',
      severity: 'WARNING',
      cam: 'CAM-002',
      location: 'Public Access Queue Area 4',
      confidence: '89.7%',
      dwellTime: '12m 30s',
      time: '14:18:05',
      status: 'Monitoring',
      desc: 'Person observed hovering near transaction terminals without activity for > 12 mins.',
    },
    {
      id: 'EVT-904',
      category: 'VIOLENCE',
      type: 'Aggressive Arm Motion & Altercation',
      severity: 'CRITICAL',
      cam: 'CAM-004',
      location: 'Zone B Public Hall',
      confidence: '94.2%',
      dwellTime: '45s',
      time: '14:12:00',
      status: 'Guard Dispatched',
      desc: 'Computer vision optical flow detected rapid, erratic limb motions indicative of physical altercation.',
    },
    {
      id: 'EVT-905',
      category: 'COUNTERFLOW',
      type: 'Wrong-Direction Movement Detection',
      severity: 'WARNING',
      cam: 'CAM-005',
      location: 'Exit Turnstile Gate 2',
      confidence: '91.8%',
      dwellTime: '20s',
      time: '14:05:44',
      status: 'Active Alert',
      desc: 'Individual moving against unidirectional exit flow toward entry gate during peak hour.',
    },
  ];

  const filteredEvents = activeCategory === 'ALL'
    ? crimeEvents
    : crimeEvents.filter(e => e.category === activeCategory);

  return (
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      {/* Header Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
              THREAT & ANOMALY DETECTION
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            Crime Prevention & Threat Detection
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Automated computer vision detection for unattended objects, perimeter breach, loitering, and motion anomalies.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="bg-[#111827] text-white border border-[#111827] px-3.5 py-2 rounded-full shadow-2xs flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> YOLOv11 THREAT ENGINE
          </span>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex-shrink-0 ${activeCategory === cat.id
                ? 'bg-[#111827] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Detected Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-xl p-5 space-y-3 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${evt.severity === 'CRITICAL'
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                  {evt.severity}
                </span>
                <span className="text-xs font-mono text-slate-400 font-medium">{evt.id} · {evt.time}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#111827] font-heading leading-snug">{evt.type}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">CAM: <strong className="text-[#111827]">{evt.cam}</strong> · {evt.location}</p>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-[#E5E7EB]">
                {evt.desc}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E5E7EB]">
                  <span className="text-[9px] text-slate-400 block uppercase font-sans font-bold">AI Confidence</span>
                  <span className="font-bold text-emerald-600">{evt.confidence}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E5E7EB]">
                  <span className="text-[9px] text-slate-400 block uppercase font-sans font-bold">Dwell / Duration</span>
                  <span className="font-bold text-[#111827]">{evt.dwellTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => onNavigateToFeed && onNavigateToFeed(evt.cam)}
                className="flex-1 !h-8 !text-[11px]"
              >
                CCTV Feed
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => onDispatchGuard && onDispatchGuard(evt.id)}
                className="flex-1 !h-8 !text-[11px]"
              >
                Dispatch
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
