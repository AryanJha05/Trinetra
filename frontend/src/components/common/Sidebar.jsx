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
      {/* Mobile / Tablet Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-[90] lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Fixed Navigation Sidebar (240px) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[100] w-[240px] bg-white text-[#0F172A] border-r border-[#E2E8F0] flex flex-col justify-between p-4 h-screen overflow-y-auto select-none transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* TRINETRA Logo Header */}
          <div className="flex items-center space-x-3 px-2 pt-1 pb-3 border-b border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs font-mono">
              T
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-[#0F172A] font-sans tracking-tight leading-none">
                TRINETRA
              </h2>
              <p className="text-[10px] text-[#64748B] font-medium tracking-wide mt-1 truncate">
                CCTV Surveillance SOC
              </p>
            </div>
          </div>

          {/* Grouped Navigation Menu */}
          <nav className="space-y-5">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-2 font-mono">
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
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? 'text-white' : 'text-[#64748B]'
                            }`}
                          />
                          <span className="truncate font-sans">{item.label}</span>
                        </div>

                        {item.count && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono flex-shrink-0 ${
                              isActive
                                ? 'bg-[#231500] text-white'
                                : 'bg-[#F1F5F9] text-[#64748B]'
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
        <div className="pt-3 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] cursor-pointer transition-colors">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 font-mono">
                AJ
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0F172A] truncate font-sans leading-tight">
                  Aryan Jha
                </p>
                <p className="text-[10px] text-[#64748B] truncate leading-none mt-0.5 font-mono">
                  Security Operator
                </p>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-[#64748B] flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
