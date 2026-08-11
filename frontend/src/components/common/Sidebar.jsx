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
  ChevronsUpDown,
  Eye
} from 'lucide-react';
import trinetraLogo from '../../assets/trinetra_logo.png';

export default function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) {
  const menuGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'live_monitoring', label: 'Live Monitoring', icon: Camera },
        { id: 'risk_engine', label: 'Risk Intelligence', icon: Activity },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        { id: 'incident_alerts', label: 'Incident Management', icon: AlertTriangle, count: 7 },
        { id: 'crowd_intelligence', label: 'Crowd Analytics', icon: Users },
        { id: 'workforce_safety', label: 'Workforce Safety', icon: HardHat },
        { id: 'crime_prevention', label: 'Threat Prevention', icon: ShieldAlert },
      ],
    },
    {
      group: 'GOVERNANCE',
      items: [
        { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'audit_logs', label: 'Audit Logs', icon: Lock },
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
      {/* Mobile Dark Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-[90] md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Fixed Navigation Sidebar (250px) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[100] w-[250px] bg-[#F8F9FA] text-[#111827] border-r border-[#E5E7EB] flex flex-col justify-between p-3.5 h-screen overflow-y-auto select-none transition-transform duration-200 ease-in-out ${mobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="space-y-5">
          {/* TRINETRA Brand Header */}
          <div className="flex items-center space-x-2.5 px-2 pt-1 pb-2 border-b border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-lg bg-[#111827] text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs">
              T
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-[#111827] font-heading tracking-tight leading-none">
                TRINETRA
              </h2>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5 truncate">
                AI Surveillance Platform
              </p>
            </div>
          </div>

          {/* Grouped Navigation Menu */}
          <nav className="space-y-4">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 font-sans mb-1">
                  {group.group}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-all ${isActive
                            ? 'bg-[#ECEEEF] text-[#111827] font-semibold border border-[#E2E4E6] shadow-2xs'
                            : 'text-slate-600 hover:bg-[#F1F3F5] hover:text-[#111827] font-medium'
                          }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#111827]' : 'text-slate-400'
                              }`}
                          />
                          <span className="truncate font-sans">{item.label}</span>
                        </div>

                        {item.count && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${isActive
                                ? 'bg-[#111827] text-white'
                                : 'bg-[#E2E8F0] text-slate-700'
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

        {/* User Profile Card (Reference Image Style) */}
        <div className="pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F3F5] cursor-pointer transition-colors">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                AJ
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#111827] truncate font-heading leading-tight">
                  Aryan Jha
                </p>
                <p className="text-[10px] text-slate-400 truncate leading-none mt-0.5">
                  Security Admin
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

