import React, { useState, useRef, useEffect } from 'react';
import { Search, Eye, EyeOff, Plus, Menu, X, Zap, ChevronRight, Camera, AlertTriangle, HardHat, Map, Layers, Bell, Command } from 'lucide-react';
import Button from './Button';

export default function Header({
  deploymentEnv,
  setDeploymentEnv,
  activeAlertCount = 7,
  privacyMasking,
  setPrivacyMasking,
  onCreateIncident,
  mobileMenuOpen,
  setMobileMenuOpen,
  demoMode,
  setDemoMode,
  onNavigateToTab,
  onSelectCamera
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const searchableItems = [
    { type: 'camera', id: 'CAM-001', label: 'CAM-001 · Main Entrance CCTV Node', target: 'live_monitoring', camId: 'CAM-001' },
    { type: 'camera', id: 'CAM-002', label: 'CAM-002 · High Crowd Density Zone', target: 'live_monitoring', camId: 'CAM-002' },
    { type: 'camera', id: 'CAM-003', label: 'CAM-003 · Restricted Area Access Gate', target: 'live_monitoring', camId: 'CAM-003' },
    { type: 'incident', id: 'INC-2026-001', label: 'INC-2026-001 · Unattended Object Alert', target: 'incident_alerts' },
    { type: 'incident', id: 'INC-2026-002', label: 'INC-2026-002 · Crowd Surge Alert', target: 'incident_alerts' },
    { type: 'incident', id: 'INC-2026-003', label: 'INC-2026-003 · Restricted Area Entry', target: 'incident_alerts' },
    { type: 'zone', id: 'Zone A', label: 'Zone A · Main Concourse', target: 'crowd_intelligence' },
    { type: 'worker', id: 'Aryan Jha', label: 'Aryan Jha · Security Admin (EMP-8472)', target: 'workforce_safety' },
  ];

  const searchResults = searchQuery.trim() === ''
    ? []
    : searchableItems.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (result) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    if (result.camId && onSelectCamera) {
      onSelectCamera(result.camId);
    } else if (result.target && onNavigateToTab) {
      onNavigateToTab(result.target);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[250px] z-50 h-[56px] bg-[#F8F9FA] text-[#111827] border-b border-[#E5E7EB] px-4 md:px-6 py-2 flex items-center justify-between gap-3 select-none">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-slate-600 hover:bg-[#ECEEEF] rounded-lg transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#111827]" /> : <Menu className="w-5 h-5 text-[#111827]" />}
        </button>

        {/* Reference Image Style Breadcrumb */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-slate-400">
          <span className="uppercase text-[10px] tracking-wider font-bold">OVERVIEW</span>
          <span className="text-slate-300">›</span>
          <span className="text-[#111827] font-bold">Dashboard</span>
        </div>
      </div>

      {/* Right: Search, Environment, Toggles & Primary Action Pill */}
      <div className="flex items-center space-x-2.5 text-xs">
        {/* Global Search Input Box (Reference Image Style) */}
        <div className="relative hidden lg:block" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Go to..."
              className="w-48 bg-white border border-[#E2E8F0] rounded-lg pl-8 pr-7 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827] shadow-2xs font-medium"
            />
            <div className="absolute right-2.5 flex items-center text-[10px] font-mono text-slate-400 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">
              ⌘K
            </div>
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full right-0 mt-1.5 w-72 bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden z-[500] divide-y divide-[#F1F5F9]">
              <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                TRINETRA Search Results ({searchResults.length})
              </div>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSearchResultClick(res)}
                  className="w-full text-left p-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs text-[#111827]"
                >
                  <div className="flex items-center space-x-2">
                    {res.type === 'camera' && <Camera className="w-3.5 h-3.5 text-[#111827]" />}
                    {res.type === 'incident' && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                    {res.type === 'zone' && <Map className="w-3.5 h-3.5 text-amber-500" />}
                    {res.type === 'worker' && <HardHat className="w-3.5 h-3.5 text-emerald-500" />}
                    <span className="font-medium truncate">{res.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Environment Selector Dropdown */}
        <div className="hidden xl:flex items-center space-x-1.5 bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-lg shadow-2xs h-8">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={deploymentEnv}
            onChange={(e) => setDeploymentEnv(e.target.value)}
            className="bg-transparent font-semibold text-[#111827] focus:outline-none cursor-pointer text-xs"
            title="Switch TRINETRA Deployment Site"
          >
            <option value="Railway Station">Railway Site</option>
            <option value="Airport">Airport Site</option>
            <option value="Smart City">Smart City Site</option>
            <option value="Industrial Facility">Industrial Site</option>
          </select>
        </div>

        {/* Simulation Toggle */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          className={`h-8 px-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${demoMode
              ? 'bg-[#111827] text-white border-[#111827]'
              : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-50'
            }`}
          title="Toggle Simulation"
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sim {demoMode ? 'ON' : 'OFF'}</span>
        </button>

        {/* Privacy Mask Toggle */}
        <button
          onClick={() => setPrivacyMasking(!privacyMasking)}
          className={`h-8 px-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${privacyMasking
              ? 'bg-emerald-700 text-white border-emerald-700'
              : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-50'
            }`}
          title="Toggle Privacy Blur"
        >
          {privacyMasking ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Mask</span>
        </button>

        {/* Notification Bell Badge */}
        <button className="relative w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-2xs transition-colors">
          <Bell className="w-4 h-4 text-slate-700" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
            {activeAlertCount}
          </span>
        </button>

        {/* Primary Dark Pill Button (Invite staff style from reference) */}
        <button
          onClick={onCreateIncident}
          className="h-8 px-4 bg-[#111827] text-white font-semibold text-xs rounded-full hover:bg-[#1F2937] transition-all shadow-xs flex items-center space-x-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Dispatch Security</span>
        </button>
      </div>
    </header>
  );
}

