import React, { useState } from 'react';
import { HardHat, ShieldCheck, Search, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
              WORKFORCE SAFETY
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5">
            Safety & PPE Compliance
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time safety compliance and tracking across active <strong className="text-[#111827]">{deploymentEnv}</strong> zones.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> 94% SITE SAFETY SCORE
        </div>
      </div>

      {/* PPE Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ppeStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">{stat.title}</span>
            <div className="text-2xl font-bold text-[#111827] font-heading">{stat.value}</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-[#111827]" style={{ width: `${stat.progress}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Worker Activity Log Table */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider">Worker Activity & Compliance Log</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, ID, or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-[#E5E7EB] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:border-slate-400 w-60 font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-[#111827] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-3">WORKER ID / NAME</th>
                  <th className="p-3">ROLE</th>
                  <th className="p-3">ZONE</th>
                  <th className="p-3">PPE CHECKS</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-slate-700">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-[#111827] font-heading">{w.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{w.id}</p>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{w.role}</td>
                    <td className="p-3 text-slate-600 font-medium">{w.zone}</td>
                    <td className="p-3 flex items-center space-x-2">
                      <span className={w.helmet ? 'text-emerald-600' : 'text-red-600'}>
                        {w.helmet ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </span>
                      <span className={w.vest ? 'text-emerald-600' : 'text-red-600'}>
                        {w.vest ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${w.status === 'VIOLATION'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : w.status === 'BREAK'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        }`}>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Maintenance Monitors */}
        <div className="space-y-5">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#111827] font-heading uppercase tracking-wider flex items-center justify-between">
              <span>Maintenance Stream Monitors</span>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase">
                2 Active
              </span>
            </h3>

            <div className="space-y-3">
              <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-[#E5E7EB] h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2.5 left-2.5 bg-slate-800 text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                  CAM-42 · SECTOR 4
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  ZONE SECURE
                </div>
                <p className="text-xs text-slate-200 font-medium">Crew Alpha Welding Team · Compliant</p>
              </div>

              <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-red-500 h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2.5 left-2.5 bg-slate-800 text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                  CAM-18 · PLATFORM 3
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
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
