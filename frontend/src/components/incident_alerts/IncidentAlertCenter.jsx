import React, { useState } from 'react';
import { AlertTriangle, Filter, Eye, Send } from 'lucide-react';
import IncidentDetailDrawer from './IncidentDetailDrawer';
import Button from '../common/Button';

export default function IncidentAlertCenter({ onDispatchGuard, incidents = [], setIncidents }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const defaultIncidents = [
    {
      id: 'INC-2026-892',
      title: 'Unattended Object Detected in Public Zone',
      cam: 'CAM-001',
      zone: 'Public Zone B (Concourse)',
      time: '10:42 AM (8 mins ago)',
      severity: 'CRITICAL',
      conf: '96.4%',
      status: 'ACTIVE',
      assigned: 'Security Response Unit 4',
      recommended_action: 'Dispatch security team & inspect unattended object.',
      details: 'Unattended object detected in Public Zone B stationary for > 5 minutes without owner presence.',
    },
    {
      id: 'INC-2026-887',
      title: 'Unauthorized Access Attempt',
      cam: 'CAM-003',
      zone: 'Zone D (Service Facility Yard)',
      time: '10:15 AM (35 mins ago)',
      severity: 'CRITICAL',
      conf: '92.1%',
      status: 'ACKNOWLEDGED',
      assigned: 'Facility Security Desk',
      recommended_action: 'Verify credentials via intercom & dispatch perimeter guard.',
      details: 'Unidentified individual breached restricted perimeter gate past authorized operating hours.',
    },
    {
      id: 'INC-2026-881',
      title: 'High Crowd Density & Area Congestion',
      cam: 'CAM-002',
      zone: 'Zone B Transit Corridor',
      time: '09:50 AM (1 hr ago)',
      severity: 'WARNING',
      conf: '88.5%',
      status: 'ACTIVE',
      assigned: 'Security Operations Center',
      recommended_action: 'Activate crowd diversion gates toward secondary exit hall.',
      details: 'Density exceeds 3.8 persons/m². Area congestion detected in Zone B during peak operational hours.',
    },
    {
      id: 'INC-2026-875',
      title: 'Staff PPE Safety Helmet Violation',
      cam: 'CAM-004',
      zone: 'Service Hall B - Maintenance Depot',
      time: '08:30 AM (2 hrs ago)',
      severity: 'NOTICE',
      conf: '94.2%',
      status: 'RESOLVED',
      assigned: 'Safety Compliance Officer',
      recommended_action: 'Issue safety compliance warning to Tech EMP-9102.',
      details: 'Worker detected in active maintenance sector without high-visibility helmet.',
    }
  ];

  const activeIncidentsList = incidents && incidents.length > 0 ? incidents : defaultIncidents;

  const filteredIncidents = selectedFilter === 'ALL'
    ? activeIncidentsList
    : activeIncidentsList.filter(i => i.severity === selectedFilter || i.status === selectedFilter);

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>OPERATIONS QUEUE</span>
            <span>·</span>
            <span>{activeIncidentsList.length} TOTAL LOGGED</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Incident Management Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time threat triage, computer vision verification, and automated guard dispatch queue.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-medium pb-1">
          {['ALL', 'CRITICAL', 'WARNING', 'NOTICE', 'RESOLVED'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all font-mono ${
                selectedFilter === f
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Incidents Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className="bg-white text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg p-4 space-y-2.5 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                    inc.severity === 'CRITICAL'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : inc.severity === 'WARNING'
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {inc.severity}
                </span>
                <span className="text-xs font-bold text-slate-500">{inc.id}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{inc.time}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
              {inc.title}
            </h3>
            <p className="text-xs text-slate-600">
              LOCATION: <strong className="text-slate-900">{inc.zone}</strong> · CAM: <span className="font-mono">{inc.cam}</span>
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 leading-relaxed font-sans">
              <p className="line-clamp-2">{inc.details || inc.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-xs">
                CONFIDENCE: <strong className="text-emerald-700">{inc.conf || '95.0%'}</strong>
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIncident(inc);
                  }}
                  className="!h-7 !px-2.5 !text-xs"
                >
                  Evidence
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Send}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDispatchGuard) onDispatchGuard(inc.id);
                  }}
                  className="!h-7 !px-3 !text-xs"
                >
                  Dispatch
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <IncidentDetailDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onDispatch={(id) => onDispatchGuard && onDispatchGuard(id)}
      />
    </div>
  );
}
