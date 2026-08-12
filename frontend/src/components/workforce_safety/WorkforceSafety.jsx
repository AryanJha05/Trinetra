import React, { useState } from 'react';
import { HardHat, ShieldCheck, Search, CheckCircle2, XCircle, Camera } from 'lucide-react';
import DataTable from '../common/DataTable';

export default function WorkforceSafety({ deploymentEnv = 'Railway Station' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const ppeStats = [
    { title: 'OVERALL PPE COMPLIANCE', value: '94%', sub: '+2.1% this shift', progress: 94 },
    { title: 'HELMETS', value: '98%', sub: '2 violations logged', progress: 98 },
    { title: 'SAFETY VESTS', value: '91%', sub: '4 warnings issued', progress: 91 },
    { title: 'BOOTS', value: '96%', sub: 'Optimal compliance', progress: 96 },
    { title: 'EYE PROTECTION', value: '82%', sub: 'Needs enforcement', progress: 82 },
  ];

  const workers = [
    { id: 'EMP-8472', name: 'Aryan Jha', role: 'Security Operator', zone: 'Zone B - Maintenance Sector 4', activity: 'Safety Telemetry Calibration', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-9102', name: 'Mahipal', role: 'Security Operator', zone: 'Zone A - Main Concourse', activity: 'System Inspection', status: 'VIOLATION', helmet: false, vest: true, boots: true },
    { id: 'EMP-3341', name: 'Sandeep', role: 'Security Operator', zone: 'Zone D - Service Depot B', activity: 'Switch Gear Check', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-5529', name: 'Nikita', role: 'Security Operator', zone: 'Zone C - Perimeter Gate', activity: 'Compliance Inspection', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-4902', name: 'Aastha', role: 'Security Operator', zone: 'Sector 3 Alpha', activity: 'PPE Audit', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-6120', name: 'Smrutirani', role: 'Security Operator', zone: 'Control Center Node', activity: 'Safety Verification', status: 'NORMAL', helmet: true, vest: true, boots: true },
  ];

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <HardHat className="w-3.5 h-3.5 text-slate-800" />
            <span>SAFETY & COMPLIANCE</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Workforce Safety & PPE Compliance
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time automated computer vision PPE verification and worker compliance tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> 94% SAFETY SCORE
        </div>
      </div>

      {/* 2. Compact PPE Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ppeStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 space-y-1.5 hover:border-slate-300 transition-all shadow-2xs">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">{stat.title}</span>
            <div className="text-xl font-bold text-slate-900 font-heading tracking-tight">{stat.value}</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900" style={{ width: `${stat.progress}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-500 font-sans">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* 3. Main Content 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left 8 Cols: Worker Inventory Table */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 font-sans shadow-2xs lg:col-span-8">
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                WORKFORCE INVENTORY
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                Worker Activity & Compliance Log
              </h3>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search worker name, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 w-44 sm:w-52 font-medium"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 pr-1 responsive-table-wrapper max-h-[420px]">
            <table className="w-full text-left text-xs font-sans border-collapse min-w-[500px]">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 font-mono shadow-xs">
                <tr>
                  <th className="p-3">WORKER ID / NAME</th>
                  <th className="p-3">ROLE</th>
                  <th className="p-3">ZONE</th>
                  <th className="p-3">PPE CHECKS</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-slate-900 font-heading">{w.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{w.id}</p>
                    </td>
                    <td className="p-3 text-slate-600">{w.role}</td>
                    <td className="p-3 text-slate-600">{w.zone}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1.5">
                        <span className={w.helmet ? 'text-emerald-700' : 'text-red-600'} title={w.helmet ? 'Helmet OK' : 'Helmet Missing'}>
                          {w.helmet ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </span>
                        <span className={w.vest ? 'text-emerald-700' : 'text-red-600'} title={w.vest ? 'Vest OK' : 'Vest Missing'}>
                          {w.vest ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                          w.status === 'VIOLATION'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Maintenance Stream Monitors */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-slate-800" />
                <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                  PPE CCTV Monitors
                </h3>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                2 ACTIVE MONITORS
              </span>
            </div>

            <div className="space-y-3">
              {/* Structured Monitor 1 */}
              <div className="bg-slate-950 rounded-md overflow-hidden border border-slate-200 p-3 space-y-2 text-white">
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-slate-200">CAM-042 · ZONE D SECTOR 4</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    COMPLIANT
                  </span>
                </div>
                <div className="text-xs font-sans space-y-1">
                  <p className="font-semibold text-slate-200">Worker: Aryan Jha (EMP-8472)</p>
                  <p className="text-[11px] text-slate-400">PPE: Helmet (OK) · Vest (OK) · Boots (OK)</p>
                  <p className="text-[10px] text-slate-500 font-mono">Detection Time: 14:28:05 IST</p>
                </div>
              </div>

              {/* Structured Monitor 2 */}
              <div className="bg-slate-950 rounded-md overflow-hidden border border-red-500/80 p-3 space-y-2 text-white">
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-slate-200">CAM-018 · ZONE A CONCOURSE</span>
                  <span className="text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                    HELMET VIOLATION
                  </span>
                </div>
                <div className="text-xs font-sans space-y-1">
                  <p className="font-semibold text-slate-200">Worker: Mahipal (EMP-9102)</p>
                  <p className="text-[11px] text-red-300">PPE: Safety Helmet Missing</p>
                  <p className="text-[10px] text-slate-500 font-mono">Detection Time: 14:25:40 IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
