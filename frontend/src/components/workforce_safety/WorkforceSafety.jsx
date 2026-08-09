import React, { useState } from 'react';
import { HardHat, ShieldCheck, Search, CheckCircle2, XCircle } from 'lucide-react';

export default function WorkforceSafety() {
  const [searchTerm, setSearchTerm] = useState('');

  const ppeStats = [
    { title: 'OVERALL PPE COMPLIANCE', value: '94%', sub: '+2.1% this shift', progress: 94 },
    { title: 'HELMETS', value: '98%', sub: '2 violations logged', progress: 98 },
    { title: 'SAFETY VESTS', value: '91%', sub: '4 warnings issued', progress: 91 },
    { title: 'BOOTS', value: '96%', sub: 'Optimal compliance', progress: 96 },
    { title: 'EYE PROTECTION', value: '82%', sub: 'Needs enforcement', progress: 82 },
  ];

  const workers = [
    { id: 'EMP-8472', name: 'Aryan Jha', role: 'Signal Technician', zone: 'Track A - Sector 4', activity: 'Signal Calibration', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-9102', name: 'Mahipal', role: 'Track Maintenance', zone: 'Platform 3 - North', activity: 'Track Welding', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-3341', name: 'Sandeep', role: 'Electrical Tech', zone: 'Depot Yard B', activity: 'Switch Gear Check', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-5529', name: 'Nikita', role: 'Track Worker', zone: 'Track A - Sector 5', activity: 'Rail Inspection', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-4902', name: 'Aastha', role: 'Safety Inspector', zone: 'Sector 3 Alpha', activity: 'PPE Inspection', status: 'NORMAL', helmet: true, vest: true, boots: true },
    { id: 'EMP-6120', name: 'Smurtirani', role: 'Control Inspector', zone: 'Control Center Node', activity: 'Safety Verification', status: 'NORMAL', helmet: true, vest: true, boots: true },
  ];

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 font-heading">
            <HardHat className="w-5 h-5 text-railway-navy" />
            Workforce Safety & PPE Compliance
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Real-time safety compliance and tracking across track-side operational zones</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold shadow-sm font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-700" /> 94% Station Safety Score
        </div>
      </div>

      {/* PPE Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ppeStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#E4E4DF] rounded-2xl p-5 space-y-3 shadow-sm">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-heading">{stat.title}</span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stat.value}</div>
            <div className="w-full bg-[#ECECE7] h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full" style={{ width: `${stat.progress}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Worker Activity Log Table */}
        <div className="lg:col-span-2 bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Worker Activity & Compliance Log</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Name / ID / Zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#F4F4F0] border border-[#E4E4DF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 w-56 font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F4F4F0] text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-[#E4E4DF]">
                <tr>
                  <th className="p-3">Worker ID / Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Zone</th>
                  <th className="p-3">PPE Checks</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <p className="font-extrabold text-slate-900 font-heading">{w.name}</p>
                      <p className="text-[10px] text-slate-500">{w.id}</p>
                    </td>
                    <td className="p-3 font-sans text-slate-700">{w.role}</td>
                    <td className="p-3 font-sans text-slate-700">{w.zone}</td>
                    <td className="p-3 flex items-center space-x-2">
                      <span className={w.helmet ? 'text-emerald-600' : 'text-red-600'}>
                        {w.helmet ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </span>
                      <span className={w.vest ? 'text-emerald-600' : 'text-red-600'}>
                        {w.vest ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${w.status === 'VIOLATION'
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : w.status === 'BREAK'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
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
        <div className="space-y-6">
          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center justify-between">
              <span>Track-Side Maintenance Monitors</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-mono font-bold">
                2 Active
              </span>
            </h3>

            <div className="space-y-3">
              <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-700 h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  CAM-42 · Track A Sector 4
                </div>
                <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow">
                  ZONE SECURE
                </div>
                <p className="text-xs text-slate-300 font-mono">Crew Alpha Welding Team · Compliant</p>
              </div>

              <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-red-500 h-36 flex items-center justify-center p-3 text-center">
                <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  CAM-18 · Platform 3 North
                </div>
                <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow">
                  VIOLATION LOGGED
                </div>
                <p className="text-xs text-red-400 font-mono">EMP-9102 Mahipal hardhat advisory logged</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
