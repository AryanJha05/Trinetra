import React from 'react';
import { Search, MapPin, Eye, EyeOff, Plus, User, Menu, X } from 'lucide-react';

export default function Header({
  selectedStation,
  setSelectedStation,
  activeAlertCount,
  privacyMasking,
  setPrivacyMasking,
  onCreateIncident,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-[260px] z-20 h-[72px] bg-[#F4F4F0] border-b border-[#E4E4DF] px-4 md:px-8 py-3 flex items-center justify-between gap-4 shadow-sm select-none">
      {/* Mobile Drawer Toggle & Search Bar */}
      <div className="flex items-center space-x-3 flex-1 max-w-xl">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-[#E8E8E2] rounded-xl transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
        </button>

        {/* Search Input Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search cameras, station zones, incident IDs..."
            className="w-full bg-white border border-[#E4E4DF] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-sm font-sans"
          />
        </div>
      </div>

      {/* Action Bar Controls */}
      <div className="flex items-center space-x-2 md:space-x-3 text-xs font-mono">
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
          <span className="font-semibold text-slate-900 hidden sm:inline font-sans">Aryan Jha</span>
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
