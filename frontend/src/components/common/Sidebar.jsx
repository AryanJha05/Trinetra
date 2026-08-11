import React from 'react';
import {
  LayoutDashboard,
  Camera,
  Users,
  ShieldAlert,
  HardHat,
  Activity,
  AlertTriangle,
  BarChart3,
  Lock,
  Settings,
  ChevronsUpDown
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) {
  const menuGroups = [
    {
      group: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'live_monitoring', label: 'Live Monitoring', icon: Camera },
        { id: 'risk_engine', label: 'Risk Intelligence', icon: Activity },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        { id: 'incident_alerts', label: 'Incidents', icon: AlertTriangle, count: 7 },
        { id: 'crowd_intelligence', label: 'Crowd Analytics', icon: Users },
        { id: 'workforce_safety', label: 'Workforce Safety', icon: HardHat },
        { id: 'crime_prevention', label: 'Threat Prevention', icon: ShieldAlert },
      ],
    },
    {
      group: 'ANALYTICS',
      items: [
        { id: 'analytics', label: 'Reports', icon: BarChart3 },
        { id: 'audit_logs', label: 'Audit Logs', icon: Lock },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-[90] md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Fixed Navigation Sidebar (250px) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[100] w-[250px] bg-[#F8F9FA] text-slate-900 border-r border-slate-200 flex flex-col justify-between p-4 h-screen overflow-y-auto select-none transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* TRINETRA Logo Header */}
          <div className="flex items-center space-x-3 px-2 pt-1 pb-3 border-b border-slate-200">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs font-mono">
              T
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 font-heading tracking-tight leading-none">
                TRINETRA
              </h2>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide mt-1 truncate">
                CCTV Surveillance SOC
              </p>
            </div>
          </div>

          {/* Grouped Navigation Menu */}
          <nav className="space-y-5">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 font-mono">
                  {group.group}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-all ${
                          isActive
                            ? 'bg-slate-200/80 text-slate-900 font-bold border border-slate-300 shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? 'text-slate-900' : 'text-slate-500'
                            }`}
                          />
                          <span className="truncate font-sans">{item.label}</span>
                        </div>

                        {item.count && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono flex-shrink-0 ${
                              isActive
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User Operator Profile Card */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 cursor-pointer transition-colors">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 font-mono">
                AJ
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate font-heading leading-tight">
                  Aryan Jha
                </p>
                <p className="text-[10px] text-slate-500 truncate leading-none mt-0.5 font-mono">
                  Security Operator
                </p>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
