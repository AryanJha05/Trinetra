import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Eye, EyeOff, Plus, User, Menu, X, Zap, ChevronRight, Camera, AlertTriangle, HardHat, Map } from 'lucide-react';

export default function Header({
  selectedStation,
  setSelectedStation,
  activeAlertCount,
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

  // Search items database for instant global search
  const searchableItems = [
    { type: 'camera', id: 'CAM-202', label: 'CAM-202 · Platform 3 Sector B', target: 'live_monitoring', camId: 'CAM-202' },
    { type: 'camera', id: 'CAM-042', label: 'CAM-042 · Maintenance Yard B', target: 'live_monitoring', camId: 'CAM-042' },
    { type: 'camera', id: 'CAM-301', label: 'CAM-301 · Platform 2 North FOB', target: 'live_monitoring', camId: 'CAM-301' },
    { type: 'camera', id: 'CAM-101', label: 'CAM-101 · Platform 1 Main Entrance', target: 'live_monitoring', camId: 'CAM-101' },
    { type: 'incident', id: 'INC-2026-892', label: 'INC-2026-892 · Unattended Object Platform 3', target: 'incident_alerts' },
    { type: 'incident', id: 'INC-2026-887', label: 'INC-2026-887 · Unauthorized Yard Access', target: 'incident_alerts' },
    { type: 'zone', id: 'Platform 4', label: 'Platform 4 · High Crowd Density Zone (1,800 pax)', target: 'crowd_intelligence' },
    { type: 'zone', id: 'Foot Overbridge', label: 'Foot Overbridge Links · Commuter Flow Area', target: 'crowd_intelligence' },
    { type: 'worker', id: 'Mahipal', label: 'Mahipal · Track Maintenance Lead (EMP-9102)', target: 'workforce_safety' },
    { type: 'worker', id: 'Aryan Jha', label: 'Aryan Jha · Signal Technician (EMP-8472)', target: 'workforce_safety' },
    { type: 'worker', id: 'Sandeep', label: 'Sandeep · Electrical Tech (EMP-3341)', target: 'workforce_safety' }
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
    <header className="fixed top-0 right-0 left-0 md:left-[260px] z-20 h-[72px] bg-[#F4F4F0] border-b border-[#E4E4DF] px-4 md:px-8 py-3 flex items-center justify-between gap-4 shadow-sm select-none">
      {/* Mobile Drawer Toggle & Interactive Search Bar */}
      <div className="flex items-center space-x-3 flex-1 max-w-xl relative" ref={searchRef}>
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-[#E8E8E2] rounded-xl transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
        </button>

        {/* Global Search Input Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search cameras (CAM-202), incidents (INC-892), zones, workers..."
            className="w-full bg-white border border-[#E4E4DF] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-sm font-sans"
          />

          {/* Autocomplete Floating Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E4E4DF] rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-100 max-h-80 overflow-y-auto">
              <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Found {searchResults.length} System Records
              </div>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSearchResultClick(res)}
                  className="w-full text-left p-3 hover:bg-[#F4F4F0] flex items-center justify-between transition-colors text-xs text-slate-800"
                >
                  <div className="flex items-center space-x-2.5">
                    {res.type === 'camera' && <Camera className="w-4 h-4 text-blue-600" />}
                    {res.type === 'incident' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    {res.type === 'zone' && <Map className="w-4 h-4 text-amber-600" />}
                    {res.type === 'worker' && <HardHat className="w-4 h-4 text-emerald-600" />}
                    <span className="font-medium font-sans">{res.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Bar Controls */}
      <div className="flex items-center space-x-2 md:space-x-3 text-xs font-mono">
        {/* Live Demo Mode Simulation Toggle */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          className={`px-3 py-2 rounded-xl border flex items-center space-x-1.5 transition-all text-xs font-bold shadow-sm ${
            demoMode
              ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
              : 'bg-white text-slate-700 border-[#E4E4DF] hover:bg-slate-50'
          }`}
          title="Toggle Dynamic Real-Time Simulation for SIH Demonstration"
        >
          <Zap className={`w-3.5 h-3.5 ${demoMode ? 'text-slate-950 fill-current' : 'text-amber-500'}`} />
          <span className="hidden xl:inline">Demo Mode: <strong>{demoMode ? 'LIVE SIM' : 'OFF'}</strong></span>
        </button>

        {/* Station Selector */}
        <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-[#E4E4DF] shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-railway-navy flex-shrink-0" />
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1 text-xs"
          >
            <option value="New Delhi Central">New Delhi Central (NDLS)</option>
            <option value="Mumbai CST">Mumbai CSMT (CSMT)</option>
            <option value="Howrah Junction">Howrah Junction (HWH)</option>
            <option value="Chennai Central">Chennai Central (MAS)</option>
          </select>
        </div>

        {/* DPDP Face Blur Toggle Button */}
        <button
          onClick={() => setPrivacyMasking(!privacyMasking)}
          className={`px-3 py-2 rounded-xl border flex items-center space-x-2 transition-all text-xs font-semibold shadow-sm ${
            privacyMasking
              ? 'bg-navy-900 text-white border-navy-900'
              : 'bg-white text-slate-700 border-[#E4E4DF] hover:bg-slate-50'
          }`}
        >
          {privacyMasking ? <EyeOff className="w-3.5 h-3.5 text-railway-mint" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
          <span className="hidden lg:inline">Privacy Face Blur: <strong>{privacyMasking ? 'ON' : 'OFF'}</strong></span>
          <span className="lg:hidden">Blur: <strong>{privacyMasking ? 'ON' : 'OFF'}</strong></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-[#E4E4DF] shadow-sm">
          <div className="w-5 h-5 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-bold">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-slate-900 hidden sm:inline font-sans">Mahipal</span>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onCreateIncident}
          className="bg-navy-900 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all shadow-sm font-heading"
        >
          <Plus className="w-4 h-4 text-railway-mint flex-shrink-0" />
          <span className="hidden md:inline">New Incident Report</span>
          <span className="md:hidden">New Incident</span>
        </button>
      </div>
    </header>
  );
}
