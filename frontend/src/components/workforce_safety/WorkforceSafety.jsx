import React, { useState } from 'react';
import { HardHat, ShieldCheck, Search, CheckCircle2, XCircle } from 'lucide-react';
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
    { id: 'EMP-8472', name: 'Aryan Jha', role: 'Senior Systems Lead', zone: 'Zone B - Maintenance Sector 4', activity: 'AI Telemetry Calibration', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-9102', name: 'Mahipal', role: 'Operations Manager', zone: 'Zone A - Main Concourse', activity: 'System Inspection', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-3341', name: 'Sandeep', role: 'AI Vision Engineer', zone: 'Zone D - Service Depot B', activity: 'Switch Gear Check', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-5529', name: 'Nikita', role: 'Safety Compliance Officer', zone: 'Zone C - Perimeter Gate', activity: 'Compliance Inspection', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-4902', name: 'Aastha', role: 'Risk Assessment Analyst', zone: 'Sector 3 Alpha', activity: 'PPE Audit', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-6120', name: 'Smurtirani', role: 'Control Room Supervisor', zone: 'Control Center Node', activity: 'Safety Verification', status: 'NORMAL', helmet: true, vest: true, boots: true },
  ];

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full max-h-full overflow-hidden flex flex-col space-y-3 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <HardHat className="w-3.5 h-3.5 text-slate-800" />
            <span>SAFETY & COMPLIANCE</span>
            <span>·</span>
            <span>SITE: {deploymentEnv.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 flex-shrink-0">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Left 8 Cols: Worker Inventory Table (Internal Scroll) */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 font-sans shadow-2xs flex-1 overflow-hidden flex flex-col lg:col-span-8">
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
                className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 w-52 font-medium"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 pr-1">
            <table className="w-full text-left text-xs font-sans border-collapse">
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
                        <span className={w.helmet ? 'text-emerald-700' : 'text-red-600'}>
                          {w.helmet ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </span>
                        <span className={w.vest ? 'text-emerald-700' : 'text-red-600'}>
                          {w.vest ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                          w.status === 'VIOLATION'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : w.status === 'BREAK'
                            ? 'bg-slate-100 text-slate-700 border border-slate-200'
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
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
                Maintenance Monitors
              </h3>
              <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                2 ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <div className="relative bg-slate-900 rounded-md overflow-hidden border border-slate-200 h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2.5 left-2.5 bg-slate-800 text-white text-[9px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  CAM-42 · SECTOR 4
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  ZONE SECURE
                </div>
                <p className="text-xs text-slate-200 font-medium">Crew Alpha Welding Team · Compliant</p>
              </div>

              <div className="relative bg-slate-900 rounded-md overflow-hidden border border-red-500 h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2.5 left-2.5 bg-slate-800 text-white text-[9px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  CAM-18 · PLATFORM 3
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-red-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  VIOLATION LOGGED
                </div>
                <p className="text-xs text-red-300 font-medium">EMP-9102 Mahipal hardhat advisory logged</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
