import React, { useState } from 'react';
import { AlertTriangle, Filter, CheckCircle, Clock, Eye, Send } from 'lucide-react';
import IncidentDetailDrawer from './IncidentDetailDrawer';
import Button from '../common/Button';

export default function IncidentAlertCenter({ onDispatchGuard }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [
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

  const filteredIncidents = selectedFilter === 'ALL'
    ? incidents
    : incidents.filter(i => i.severity === selectedFilter || i.status === selectedFilter);

  return (
    <div className="p-4 md:p-6 space-y-6 font-sans text-[#111827] select-none">
      {/* Header & Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight flex items-center gap-2 font-heading">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Incident Alert Center
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time threat detection, AI verification, and guard dispatch queue</p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto text-xs font-medium">
          {['ALL', 'CRITICAL', 'WARNING', 'NOTICE', 'RESOLVED'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${selectedFilter === f
                  ? 'bg-[#111827] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className="bg-white text-[#111827] border border-[#E5E7EB] hover:border-slate-300 rounded-xl p-5 space-y-3 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${inc.severity === 'CRITICAL'
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : inc.severity === 'WARNING'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                  {inc.severity}
                </span>
                <span className="text-xs font-bold text-slate-500">{inc.id}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{inc.time}</span>
            </div>

            <h3 className="text-base font-bold text-[#111827] font-heading leading-snug">
              {inc.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">LOCATION: <strong className="text-[#111827]">{inc.zone}</strong> · CAM: {inc.cam}</p>

            <div className="p-3 bg-slate-50 border border-[#E5E7EB] rounded-lg text-xs text-slate-600 leading-relaxed">
              <p className="line-clamp-2">{inc.details}</p>
            </div>

            <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-[11px]">CONFIDENCE: <strong className="text-emerald-600 font-mono">{inc.conf}</strong></span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIncident(inc);
                  }}
                  className="!h-7 !text-[10px]"
                >
                  Evidence
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Send}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDispatchGuard(inc.id);
                  }}
                  className="!h-7 !text-[10px]"
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
        onDispatch={(id) => onDispatchGuard(id)}
      />
    </div>
  );
}
