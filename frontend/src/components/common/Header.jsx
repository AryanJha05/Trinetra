import React, { useState, useRef, useEffect } from 'react';
import { Search, Eye, EyeOff, Plus, Menu, X, Zap, ChevronRight, Camera, AlertTriangle, HardHat, Map, Layers, Bell } from 'lucide-react';
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
    { type: 'worker', id: 'Aryan Jha', label: 'Aryan Jha · Security Operator (EMP-8472)', target: 'workforce_safety' },
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
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] z-40 h-[64px] bg-[#F8F9FA] text-slate-900 border-b border-slate-200 px-3 sm:px-4 lg:px-6 grid grid-cols-[minmax(160px,1fr)_auto_auto] sm:grid-cols-[minmax(220px,1fr)_auto_auto] items-center gap-2 sm:gap-4 select-none font-sans">
      {/* Left: Mobile/Tablet Menu Toggle & Global Search */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 max-w-md">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-200 rounded-md transition-colors flex-shrink-0"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
        </button>

        {/* Global Search Input Box */}
        <div className="relative w-full" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search cameras, alerts, zones..."
              className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-8 sm:pr-12 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 shadow-2xs font-medium"
            />
            <div className="hidden sm:flex absolute right-2.5 items-center text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              ⌘K
            </div>
          </div>

          {/* Autocomplete Dropdown Overlay */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-[500] divide-y divide-slate-100 max-h-80 overflow-y-auto">
              <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSearchResultClick(res)}
                  className="w-full text-left p-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs text-slate-900"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    {res.type === 'camera' && <Camera className="w-4 h-4 text-slate-800 flex-shrink-0" />}
                    {res.type === 'incident' && <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                    {res.type === 'zone' && <Map className="w-4 h-4 text-amber-600 flex-shrink-0" />}
                    {res.type === 'worker' && <HardHat className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    <span className="font-medium truncate">{res.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Deployment Environment Selector */}
      <div className="hidden xl:flex items-center space-x-2 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-2xs h-9">
        <Layers className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Deployment:</span>
        <select
          value={deploymentEnv}
          onChange={(e) => setDeploymentEnv(e.target.value)}
          className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer text-xs font-heading"
          title="Switch TRINETRA Deployment Site"
        >
          <option value="Railway Station Demo">Railway Station Demo</option>
          <option value="Airport Demo">Airport Demo</option>
          <option value="Smart City Demo">Smart City Demo</option>
          <option value="Industrial Facility Demo">Industrial Facility Demo</option>
          <option value="Campus Demo">Campus Demo</option>
        </select>
      </div>

      {/* Right: Toggles & Primary Action Button */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs flex-shrink-0">
        {/* Simulation / Demo Mode Toggle */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          className={`h-9 px-2 sm:px-3 sm:w-36 justify-center rounded-md border text-xs font-semibold flex items-center space-x-1.5 transition-colors font-mono select-none ${
            demoMode
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Toggle Demo Mode Simulation"
        >
          <Zap className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline font-mono">{demoMode ? 'Demo Mode ON' : 'Demo Mode OFF'}</span>
        </button>

        {/* Privacy Mask Toggle */}
        <button
          onClick={() => setPrivacyMasking(!privacyMasking)}
          className={`h-9 px-2 sm:px-3 sm:w-36 justify-center rounded-md border text-xs font-semibold flex items-center space-x-1.5 transition-colors font-mono select-none ${
            privacyMasking
              ? 'bg-emerald-700 text-white border-emerald-700'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Toggle DPDP Compliance Privacy Masking"
        >
          {privacyMasking ? <EyeOff className="w-3.5 h-3.5 flex-shrink-0" /> : <Eye className="w-3.5 h-3.5 flex-shrink-0" />}
          <span className="hidden sm:inline font-mono">{privacyMasking ? 'Privacy Mask ON' : 'Privacy Mask OFF'}</span>
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          title="Alert Notifications"
          onClick={() => onNavigateToTab && onNavigateToTab('incident_alerts')}
        >
          <Bell className="w-4 h-4 text-slate-700" />
          {activeAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white font-bold text-[9px] font-mono rounded-full flex items-center justify-center">
              {activeAlertCount}
            </span>
          )}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onCreateIncident}
          className="h-9 px-3 sm:px-4 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-all shadow-xs flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Dispatch Unit</span>
        </button>
      </div>
    </header>
  );
}
