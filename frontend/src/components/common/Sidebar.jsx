import React from 'react';
import { LayoutDashboard, Camera, Users, AlertTriangle, HardHat, BarChart3, Lock, Settings } from 'lucide-react';
import trinetraLogo from '../../assets/trinetra_logo.png';

export default function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) {
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

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Fixed Navigation Sidebar (260px) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-[260px] bg-white border-r border-[#E4E4DF] flex flex-col justify-between p-5 h-screen overflow-y-auto select-none transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-5">
          {/* Official TRINETRA Brand Header - Full Area Logo Display */}
          <div className="pb-3 border-b border-[#E4E4DF] flex items-center justify-center px-1">
            <img
              src={trinetraLogo}
              alt="TRINETRA Official Logo"
              className="w-full max-h-16 object-contain"
            />
          </div>

          {/* Primary Navigation Menu */}
          <nav className="space-y-1">
            {primaryMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
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
          <div className="pt-3 border-t border-[#E4E4DF] space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 font-mono">Station Zones</p>
            <div className="space-y-1">
              {stationZones.map((zone, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer rounded-lg hover:bg-slate-50">
                  <span className="font-medium">{zone.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">{zone.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Trinetra Credits */}
        <div className="pt-3 border-t border-[#E4E4DF] space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 font-mono">SIH 2026 Team</p>
          <div className="flex items-center space-x-3 p-2 bg-[#F4F4F0] rounded-xl border border-[#E4E4DF]">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center font-mono flex-shrink-0">
              SIH
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900 font-heading">Team Trinetra</p>
              <p className="text-[10px] text-slate-500 font-mono">Mahipal · Aryan Jha · Sandeep · Nikita · Aastha · Smrutirani</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
