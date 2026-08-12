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
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] z-40 h-[64px] bg-white text-[#0F172A] border-b border-[#E2E8F0] px-3 sm:px-4 lg:px-6 grid grid-cols-[minmax(160px,1fr)_auto_auto] sm:grid-cols-[minmax(220px,1fr)_auto_auto] items-center gap-2 sm:gap-4 select-none font-sans shadow-2xs">
      {/* Left: Mobile/Tablet Menu Toggle & Global Search */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 max-w-md">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors flex-shrink-0"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#0F172A]" /> : <Menu className="w-5 h-5 text-[#0F172A]" />}
        </button>

        {/* Global Search Input Box (Reference input style) */}
        <div className="relative w-full" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#64748B] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search cameras, alerts, zones..."
              className="w-full bg-[#F1F5F9] focus:bg-white border border-[#CBD5E1] rounded-xl pl-10 pr-8 sm:pr-12 py-2 text-xs text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all font-medium"
            />
            <div className="hidden sm:flex absolute right-2.5 items-center text-[10px] font-mono text-[#64748B] bg-white px-1.5 py-0.5 rounded-md border border-[#E2E8F0]">
              ⌘K
            </div>
          </div>

          {/* Autocomplete Dropdown Overlay */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden z-[500] divide-y divide-[#F1F5F9] max-h-80 overflow-y-auto">
              <div className="p-2 bg-[#F8FAFC] text-[10px] font-bold text-[#64748B] uppercase tracking-wider font-mono">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSearchResultClick(res)}
                  className="w-full text-left p-2.5 hover:bg-[#F1F5F9] flex items-center justify-between transition-colors text-xs text-[#0F172A]"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    {res.type === 'camera' && <Camera className="w-4 h-4 text-[#0F172A] flex-shrink-0" />}
                    {res.type === 'incident' && <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                    {res.type === 'zone' && <Map className="w-4 h-4 text-amber-600 flex-shrink-0" />}
                    {res.type === 'worker' && <HardHat className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    <span className="font-medium truncate">{res.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#64748B] flex-shrink-0 ml-1" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Deployment Environment Selector */}
      <div className="hidden xl:flex items-center space-x-2 bg-[#F1F5F9] border border-[#CBD5E1] px-3 py-1.5 rounded-xl h-9">
        <Layers className="w-4 h-4 text-[#64748B] flex-shrink-0" />
        <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">Deployment:</span>
        <select
          value={deploymentEnv}
          onChange={(e) => setDeploymentEnv(e.target.value)}
          className="bg-transparent font-bold text-[#0F172A] focus:outline-none cursor-pointer text-xs font-sans"
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
          className={`h-9 px-3 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-colors font-sans select-none ${
            demoMode
              ? 'bg-[#0F172A] text-white border-[#0F172A]'
              : 'bg-[#F1F5F9] text-[#64748B] border-transparent hover:bg-slate-200 hover:text-[#0F172A]'
          }`}
          title="Toggle Demo Mode Simulation"
        >
          <Zap className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">{demoMode ? 'Demo ON' : 'Demo OFF'}</span>
        </button>

        {/* Privacy Mask Toggle */}
        <button
          onClick={() => setPrivacyMasking(!privacyMasking)}
          className={`h-9 px-3 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-colors font-sans select-none ${
            privacyMasking
              ? 'bg-[#10B981] text-white border-[#10B981]'
              : 'bg-[#F1F5F9] text-[#64748B] border-transparent hover:bg-slate-200 hover:text-[#0F172A]'
          }`}
          title="Toggle Privacy Masking"
        >
          {privacyMasking ? <EyeOff className="w-3.5 h-3.5 flex-shrink-0" /> : <Eye className="w-3.5 h-3.5 flex-shrink-0" />}
          <span className="hidden sm:inline">{privacyMasking ? 'Privacy ON' : 'Privacy OFF'}</span>
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 rounded-xl bg-[#F1F5F9] hover:bg-slate-200 flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-colors"
          title="Alert Notifications"
          onClick={() => onNavigateToTab && onNavigateToTab('incident_alerts')}
        >
          <Bell className="w-4 h-4 text-current" />
          {activeAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white font-bold text-[9px] font-mono rounded-full flex items-center justify-center">
              {activeAlertCount}
            </span>
          )}
        </button>

        {/* Primary Action Button */}
        <Button
          onClick={onCreateIncident}
          variant="primary"
          icon={Plus}
          size="md"
        >
          <span className="hidden sm:inline">Dispatch Unit</span>
        </Button>
      </div>
    </header>
  );
}
