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
    <div className="w-full space-y-4 font-sans text-[#0F172A] select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#64748B] mb-1 font-sans">
            <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="font-semibold text-[#0F172A]">OPERATIONS QUEUE</span>
            <span>·</span>
            <span>{activeIncidentsList.length} TOTAL LOGGED</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
            Incident Management Center
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time threat triage, computer vision verification, and automated guard dispatch queue.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs font-medium pb-1">
          {['ALL', 'CRITICAL', 'WARNING', 'NOTICE', 'RESOLVED'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all font-sans ${
                selectedFilter === f
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className="bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-4 space-y-3 cursor-pointer transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase font-sans border ${
                      inc.severity === 'CRITICAL'
                        ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]'
                        : inc.severity === 'WARNING'
                        ? 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                        : 'bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]'
                    }`}
                  >
                    {inc.severity}
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">{inc.id}</span>
                </div>
                <span className="text-xs text-[#64748B] font-sans">{inc.time}</span>
              </div>

              <h3 className="text-sm font-bold text-[#0F172A] font-sans leading-snug">
                {inc.title}
              </h3>
              <p className="text-xs text-[#64748B] font-sans">
                LOCATION: <strong className="text-[#0F172A]">{inc.zone}</strong> · CAM: <span className="font-mono">{inc.cam}</span>
              </p>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#334155] leading-relaxed font-sans">
                <p className="line-clamp-2">{inc.details || inc.desc}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-sans text-xs">
                CONF: <strong className="text-[#047857]">{inc.conf || '95.0%'}</strong>
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
