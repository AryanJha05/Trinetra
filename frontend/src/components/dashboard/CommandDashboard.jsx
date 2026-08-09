import React from 'react';
import { Camera, AlertTriangle, Users, ShieldCheck, ArrowRight, Eye, Send, MoreVertical, Clock } from 'lucide-react';
import StationBlueprintMap from './StationBlueprintMap';

export default function CommandDashboard({ onNavigateToFeed, onNavigateToAlerts, onDispatchGuard }) {
  const incidentsList = [
    {
      id: 'INC-2026-892',
      title: 'Unattended Object Detected',
      desc: 'Black backpack stationary for >5 mins near Platform 3 Pillar 12 without owner in 10m perimeter.',
      cam: 'CAM-202',
      zone: 'Platform 3, Sector B',
      time: '10:42 AM',
      severity: 'CRITICAL',
      conf: '96.4%',
    },
    {
      id: 'INC-2026-887',
      title: 'Unauthorized Perimeter Access',
      desc: 'Individual detected in non-uniform clothing breaching maintenance yard Gate 4.',
      cam: 'CAM-042',
      zone: 'Maintenance Yard B',
      time: '10:15 AM',
      severity: 'CRITICAL',
      conf: '92.1%',
    },
    {
      id: 'INC-2026-881',
      title: 'High Crowd Surge Warning',
      desc: 'Commuter density exceeded 3.8 pax/m² near North FOB staircase due to delayed Express Train 1204.',
      cam: 'CAM-301',
      zone: 'Platform 2 North',
      time: '09:50 AM',
      severity: 'WARNING',
      conf: '88.5%',
    },
    {
      id: 'INC-2026-875',
      title: 'PPE Helmet Compliance Violation',
      desc: 'Technician working track maintenance line without high-visibility helmet.',
      cam: 'CAM-200',
      zone: 'Service Hall B',
      time: '08:30 AM',
      severity: 'NOTICE',
      conf: '94.2%',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Top Banner Card matching exact visual language of reference image hero banner */}
      <div className="bg-[#ECECE7] border border-[#E4E4DF] rounded-3xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Bar Chart Widget */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-extrabold text-slate-600 uppercase tracking-wider font-heading">Weekly Incident Trends</p>
          <div className="flex items-end space-x-3 h-24 pt-2">
            {[
              { day: 'Mon', h: 'h-12' },
              { day: 'Tue', h: 'h-20' },
              { day: 'Wed', h: 'h-10' },
              { day: 'Thu', h: 'h-16' },
              { day: 'Fri', h: 'h-22' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full ${bar.h} bg-navy-900 rounded-t-md`}></div>
                <span className="text-[10px] font-semibold text-slate-600 font-mono">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Semi-Circle Gauge Widget - Fixed SVG Arc Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-1 border-y lg:border-y-0 lg:border-x border-[#D8D8D0] py-4 lg:py-0 px-4">
          <div className="relative w-44 h-24 flex flex-col items-center justify-end">
            <svg className="w-44 h-22" viewBox="0 0 100 55">
              {/* Background Arc Track */}
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#D4D4CE" 
                strokeWidth="9" 
                strokeLinecap="round" 
              />
              {/* Active Progress Arc (88% of 180 degrees) */}
              <path 
                d="M 10 50 A 40 40 0 0 1 87.2 35.3" 
                fill="none" 
                stroke="#0A192F" 
                strokeWidth="9" 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute bottom-0 text-center">
              <span className="text-3xl font-extrabold text-slate-900 leading-none font-mono">88%</span>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-700 font-sans">Station Safety Score Index</p>
        </div>

        {/* Right Numerical Metrics matching reference image */}
        <div className="lg:col-span-4 flex items-center justify-around">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono">1,248</div>
            <p className="text-xs text-slate-600 font-medium mt-1 font-sans">Cameras Connected</p>
          </div>
          <div className="h-12 w-px bg-[#D8D8D0]"></div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono">4</div>
            <p className="text-xs text-slate-600 font-medium mt-1 font-sans">Active Incidents</p>
          </div>
        </div>
      </div>

      {/* Main Section: Interactive Blueprint & Incident Triage Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Blueprint & CCTV Nodes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-heading">
              Station Operational Blueprint Map
            </h3>
            <span className="text-xs font-semibold text-slate-500 font-mono">New Delhi Central (NDLS)</span>
          </div>

          <StationBlueprintMap onSelectCamera={(camId) => onNavigateToFeed(camId)} />
        </div>

        {/* Right 5 Cols: Live Incidents Grid - All Clean Uniform White Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Incident Triage List</h3>
              <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                {incidentsList.length}
              </span>
            </div>
            <button
              onClick={() => onNavigateToAlerts()}
              className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 font-mono"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards Stack: All Clean White Cards */}
          <div className="space-y-4">
            {incidentsList.map((inc) => (
              <div
                key={inc.id}
                className="bg-white text-slate-900 border border-[#E4E4DF] hover:border-slate-400 rounded-2xl p-5 space-y-3 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-mono">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase ${
                      inc.severity === 'CRITICAL' 
                        ? 'bg-red-100 text-red-800 border border-red-200' 
                        : inc.severity === 'WARNING' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {inc.severity}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {inc.id}
                    </span>
                  </div>
                  <MoreVertical className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-700" />
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 font-heading leading-snug">{inc.title}</h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {inc.desc}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-3 font-mono text-[11px]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {inc.time}</span>
                    <span>{inc.zone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onNavigateToFeed(inc.cam)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-1 transition-all font-mono"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" /> Feed
                    </button>
                    <button
                      onClick={() => onDispatchGuard(inc.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm font-mono"
                    >
                      <Send className="w-3.5 h-3.5" /> Dispatch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
