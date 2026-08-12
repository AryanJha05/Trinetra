import React, { useState } from 'react';
import { ShieldAlert, Video, Radio, Search, Filter, AlertTriangle, Eye } from 'lucide-react';
import Button from '../common/Button';

export default function CrimePrevention({ deploymentEnv = 'Railway Station', onNavigateToFeed, onOpenDispatchModal }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const detections = [
    {
      id: 'EVT-2026-881',
      title: 'Unattended Baggage Detected',
      category: 'UNATTENDED_OBJECT',
      cam: 'CAM-002',
      zone: 'Zone B Public Gathering Area',
      confidence: '96.4%',
      dwell: '4m 12s',
      timestamp: '14:28:10 IST',
      status: 'CRITICAL',
      evidence: 'Snapshot #881 (2.4MB)',
    },
    {
      id: 'EVT-2026-880',
      title: 'Loitering Near Restricted Gate',
      category: 'SUSPICIOUS_LOITERING',
      cam: 'CAM-003',
      zone: 'Zone C Restricted Facility Gate',
      confidence: '91.8%',
      dwell: '12m 45s',
      timestamp: '14:25:30 IST',
      status: 'WARNING',
      evidence: 'Snapshot #880 (1.8MB)',
    },
    {
      id: 'EVT-2026-879',
      title: 'Restricted Perimeter Boundary Cross',
      category: 'PERIMETER_BREACH',
      cam: 'CAM-006',
      zone: 'Perimeter Gate 2 Yard',
      confidence: '98.1%',
      dwell: '0m 45s',
      timestamp: '14:21:05 IST',
      status: 'CRITICAL',
      evidence: 'Snapshot #879 (3.1MB)',
    },
    {
      id: 'EVT-2026-878',
      title: 'Crowd Gathering Density Spike',
      category: 'CROWD_SURGE',
      cam: 'CAM-001',
      zone: 'Zone A Main Concourse',
      confidence: '88.5%',
      dwell: '6m 20s',
      timestamp: '14:18:00 IST',
      status: 'NOTICE',
      evidence: 'Snapshot #878 (2.0MB)',
    },
  ];

  const filteredDetections = detections.filter(d => {
    const matchesCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.cam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-800" />
            <span>THREAT PREVENTION</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Automated Threat & Anomaly Prevention
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time automated incident detection, confidence scoring, and rapid dispatch workflow.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> AI THREAT DETECTION ONLINE
          </span>
        </div>
      </div>

      {/* 2. Controls & Filtering Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-2xs">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'UNATTENDED_OBJECT', 'SUSPICIOUS_LOITERING', 'PERIMETER_BREACH', 'CROWD_SURGE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded font-mono transition-all uppercase whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search anomaly, CAM, Event ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 w-full sm:w-60 font-medium"
          />
        </div>
      </div>

      {/* 3. Detections Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDetections.map((det) => (
          <div
            key={det.id}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 space-y-4 transition-all shadow-2xs font-sans flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Event Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-900">{det.id}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-mono font-semibold text-slate-600">{det.cam}</span>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                    det.status === 'CRITICAL'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : det.status === 'WARNING'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  {det.status}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="text-base font-bold text-slate-900 font-heading leading-tight">
                {det.title}
              </h3>

              {/* Detailed Anomaly Information */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sans pt-1">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[9px] text-slate-500 font-mono uppercase font-bold block">LOCATION / ZONE</span>
                  <span className="font-semibold text-slate-900 text-xs">{det.zone}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[9px] text-slate-500 font-mono uppercase font-bold block">AI CONFIDENCE</span>
                  <span className="font-bold text-emerald-700 text-xs font-mono">{det.confidence}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[9px] text-slate-500 font-mono uppercase font-bold block">DWELL DURATION</span>
                  <span className="font-semibold text-slate-900 text-xs font-mono">{det.dwell}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[9px] text-slate-500 font-mono uppercase font-bold block">EVIDENCE SOURCE</span>
                  <span className="font-mono text-slate-700 text-[11px]">{det.evidence}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Dispatch = Primary, CCTV Feed = Secondary */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenDispatchModal && onOpenDispatchModal(det)}
                className="flex-1 !h-8.5 !text-xs font-semibold"
              >
                Dispatch Response Unit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => onNavigateToFeed && onNavigateToFeed(det.cam)}
                className="!h-8.5 !text-xs"
              >
                CCTV Feed
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
