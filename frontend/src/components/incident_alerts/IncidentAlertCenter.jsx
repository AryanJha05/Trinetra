import React, { useState } from 'react';
import { AlertTriangle, Eye, Send, Filter } from 'lucide-react';
import IncidentDetailDrawer from './IncidentDetailDrawer';

export default function IncidentAlertCenter({ onDispatchGuard }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [
    {
      id: 'INC-2026-892',
      title: 'Unattended Object Detected',
      cam: 'CAM-202',
      zone: 'Platform 3, Zone B (Near Pillar 12)',
      time: '10:42 AM (8 mins ago)',
      severity: 'CRITICAL',
      conf: '96.4%',
      status: 'ACTIVE',
      assigned: 'RPF Unit 4',
      recommended_action: 'Dispatch immediate bomb disposal & cordon Platform 3 North.',
      details: 'Black backpack stationary for > 5 minutes without owner within 10m radius. Dimensions approx 60cm x 30cm x 30cm.',
    },
    {
      id: 'INC-2026-887',
      title: 'Unauthorized Access Attempt',
      cam: 'CAM-042',
      zone: 'Zone 4 (Maintenance Yard B)',
      time: '10:15 AM (35 mins ago)',
      severity: 'CRITICAL',
      conf: '92.1%',
      status: 'ACKNOWLEDGED',
      assigned: 'Yard Security B',
      recommended_action: 'Verify credentials via intercom & dispatch perimeter guard.',
      details: 'Unidentified individual in non-uniform jacket breached perimeter gate past 22:00 hours.',
    },
    {
      id: 'INC-2026-881',
      title: 'High Crowd Density Warning',
      cam: 'CAM-301',
      zone: 'Platform 2 North End Staircase',
      time: '09:50 AM (1 hr ago)',
      severity: 'WARNING',
      conf: '88.5%',
      status: 'ACTIVE',
      assigned: 'Station Control Desk',
      recommended_action: 'Activate crowd diversion gates toward FOB 2.',
      details: 'Density exceeds 3.8 persons/m². Commuter wave buildup due to delayed Express Train 1204.',
    },
    {
      id: 'INC-2026-875',
      title: 'Staff PPE Safety Helmet Violation',
      cam: 'CAM-200',
      zone: 'Service Hall B - Maintenance Depot',
      time: '08:30 AM (2 hrs ago)',
      severity: 'NOTICE',
      conf: '94.2%',
      status: 'RESOLVED',
      assigned: 'Safety Compliance Officer',
      recommended_action: 'Issue safety compliance warning to Tech EMP-9102.',
      details: 'Worker detected in active maintenance track without high-visibility helmet.',
    }
  ];

  const filteredIncidents = selectedFilter === 'ALL'
    ? incidents
    : incidents.filter(i => i.severity === selectedFilter || i.status === selectedFilter);

  return (
    <div className="p-8 space-y-8">
      {/* Header & Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 font-heading">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Incident Management & Security Triage Center
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Automated detection verification feed and RPF guard dispatch workflow</p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto font-mono text-xs">
          {['ALL', 'CRITICAL', 'WARNING', 'NOTICE', 'RESOLVED'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                selectedFilter === f
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-[#E4E4DF] hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Grid - All Clean Uniform White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className="bg-white text-slate-900 border border-[#E4E4DF] hover:border-slate-400 rounded-2xl p-6 space-y-3 cursor-pointer transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase ${
                  inc.severity === 'CRITICAL' 
                    ? 'bg-red-100 text-red-800 border border-red-200' 
                    : inc.severity === 'WARNING' 
                    ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {inc.severity}
                </span>
                <span className="text-xs font-semibold text-slate-500">{inc.id}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">{inc.time}</span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 font-heading leading-snug group-hover:text-railway-navy transition-colors">
              {inc.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono">Location: <strong>{inc.zone}</strong> · Cam: {inc.cam}</p>

            <div className="p-3.5 bg-[#F4F4F0] border border-[#E4E4DF] rounded-xl text-xs font-sans text-slate-700 leading-relaxed">
              <p className="line-clamp-2">{inc.details}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">Confidence: <strong className="text-slate-900">{inc.conf}</strong></span>
              <div className="flex items-center space-x-2 font-mono">
                <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-1 transition-all">
                  <Eye className="w-3.5 h-3.5 text-slate-600" /> Evidence
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDispatchGuard(inc.id);
                  }}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <IncidentDetailDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onDispatch={(id) => onDispatchGuard(id)}
      />
    </div>
  );
}
