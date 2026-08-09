import React from 'react';
import { LayoutDashboard, Camera, Users, AlertTriangle, HardHat, BarChart3, Lock, Settings, Shield, Train, ChevronRight } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const primaryMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live_monitoring', label: 'Live CCTV Monitoring', icon: Camera },
    { id: 'crowd_intelligence', label: 'Crowd Analytics', icon: Users },
    { id: 'incident_alerts', label: 'Incident Management', icon: AlertTriangle, count: 4 },
    { id: 'workforce_safety', label: 'Workforce Safety', icon: HardHat },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'audit_logs', label: 'Audit & Compliance', icon: Lock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stationZones = [
    { name: 'Platform 1-4 Concourse', count: 42 },
    { name: 'Maintenance Yards', count: 18 },
    { name: 'Foot Overbridge Links', count: 12 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E4E4DF] flex flex-col justify-between p-6 min-h-[calc(100vh-80px)] select-none">
      <div className="space-y-6">
        {/* Brand Header matching user requested project title */}
        <div className="flex items-center space-x-3 pb-3 border-b border-[#E4E4DF]">
          <div className="w-9 h-9 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-sm flex-shrink-0">
            <Train className="w-5 h-5 text-railway-mint" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-slate-900 leading-tight font-heading">Trinetra</h1>
            <p className="text-[10px] font-semibold text-slate-500 font-sans leading-tight">Intelligent CCTV Surveillance & Safety Platform</p>
          </div>
        </div>

        {/* Primary Navigation Menu */}
        <nav className="space-y-1">
          {primaryMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#E8E8E2] text-slate-900 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-[#F4F4F0] hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900 stroke-[2.5]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count && (
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-700 border border-[#E4E4DF]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Section Header: Station Zones */}
        <div className="pt-4 border-t border-[#E4E4DF] space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">Station Zones</p>
          <div className="space-y-1">
            {stationZones.map((zone, idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                <span className="font-medium">{zone.name}</span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">{zone.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RPF Duty Unit Profile Card */}
      <div className="pt-4 border-t border-[#E4E4DF] space-y-2">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">RPF Security Desk</p>
        <div className="flex items-center space-x-3 p-2 bg-[#F4F4F0] rounded-xl border border-[#E4E4DF]">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
            RPF
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900 font-heading">Control Room 4</p>
            <p className="text-[10px] text-slate-500 font-mono">Shift Active · 8 Ops</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
