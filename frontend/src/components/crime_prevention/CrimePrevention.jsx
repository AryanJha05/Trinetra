import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Eye, Send, Zap } from 'lucide-react';
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
    <div className="h-full max-h-full overflow-hidden flex flex-col space-y-3 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-800" />
            <span>ANOMALY DETECTION</span>
            <span>·</span>
            <span>PROACTIVE THREAT ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
            Threat Prevention & Anomaly Detection
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Automated computer vision triage for loitering, unattended objects, perimeter breach, and aggressive movement.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> YOLOv11 ENGINE ONLINE
          </span>
        </div>
      </div>

      {/* 2. Category Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-medium flex-shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all font-mono flex-shrink-0 ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Grid of Detected Events (Internal Container Scroll) */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 space-y-4 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs font-sans"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                    evt.severity === 'CRITICAL'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}
                >
                  {evt.severity}
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {evt.id} · {evt.time}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                  {evt.type}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  CAM: <span className="font-mono font-bold text-slate-900">{evt.cam}</span> · {evt.location}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 leading-relaxed font-sans">
                {evt.desc}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <span className="text-[9px] text-slate-500 block uppercase font-sans font-bold">AI CONFIDENCE</span>
                  <span className="font-bold text-emerald-700">{evt.confidence}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <span className="text-[9px] text-slate-500 block uppercase font-sans font-bold">DWELL DURATION</span>
                  <span className="font-bold text-slate-900">{evt.dwellTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => onNavigateToFeed && onNavigateToFeed(evt.cam)}
                className="flex-1 !h-8 !text-xs"
              >
                CCTV Feed
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Send}
                onClick={() => onDispatchGuard && onDispatchGuard(evt.id)}
                className="flex-1 !h-8 !text-xs"
              >
                Dispatch
              </Button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
