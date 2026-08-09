import React from 'react';
import { Camera, AlertTriangle, Users, ShieldCheck, ArrowRight, Eye, Send, MoreVertical, Clock, AlertCircle } from 'lucide-react';
import StationBlueprintMap from './StationBlueprintMap';
import Button from '../common/Button';

export default function CommandDashboard({
  onNavigateToFeed,
  onNavigateToAlerts,
  onDispatchGuard,
  onNavigateToCrowd,
  onNavigateToSafety,
  incidentsList = []
}) {
  const platformsOverview = [
    { name: 'Platform 1', pax: 450, risk: 'Low', status: 'Safe', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { name: 'Platform 2', pax: 780, risk: 'Medium', status: 'Moderate', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { name: 'Platform 3', pax: 1200, risk: 'High', status: 'Advisory', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { name: 'Platform 4', pax: 1800, risk: 'Critical', status: 'Overcrowded', color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  return (
    <div className="p-8 space-y-8 select-none">
      {/* Top Banner Hero KPI Cards matching visual language */}
      <div className="bg-[#ECECE7] border border-[#E4E4DF] rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
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

        {/* Center Semi-Circle Gauge Widget */}
        <div
          onClick={() => onNavigateToSafety && onNavigateToSafety()}
          className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-1 border-y lg:border-y-0 lg:border-x border-[#D8D8D0] py-4 lg:py-0 px-4 cursor-pointer group hover:bg-[#E4E4DE] transition-colors rounded-2xl"
          title="Click to view Workforce Safety Compliance"
        >
          <div className="relative w-44 h-24 flex flex-col items-center justify-end">
            <svg className="w-44 h-22" viewBox="0 0 100 55">
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#D4D4CE" 
                strokeWidth="9" 
                strokeLinecap="round" 
              />
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
          <p className="text-xs font-bold text-slate-700 group-hover:text-navy-900 font-sans flex items-center gap-1">
            Station Safety Score Index <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>

        {/* Right Numerical Metrics */}
        <div className="lg:col-span-4 flex items-center justify-around">
          {/* Interactive Camera Counter Card */}
          <div
            onClick={() => onNavigateToFeed && onNavigateToFeed('CAM-101')}
            className="text-center p-3 rounded-2xl hover:bg-[#E4E4DE] cursor-pointer transition-colors group"
            title="Click to view Live CCTV Monitoring"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-mono group-hover:text-blue-900">1,248</div>
            <p className="text-xs text-slate-600 font-medium mt-1 font-sans flex items-center justify-center gap-1">
              <Camera className="w-3.5 h-3.5 text-slate-500" /> Cameras (1239 Active)
            </p>
          </div>

          <div className="h-12 w-px bg-[#D8D8D0]"></div>

          {/* Interactive Incidents Counter Card */}
          <div
            onClick={() => onNavigateToAlerts && onNavigateToAlerts()}
            className="text-center p-3 rounded-2xl hover:bg-[#E4E4DE] cursor-pointer transition-colors group"
            title="Click to view Active Incidents"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-red-700 tracking-tight font-mono group-hover:scale-105 transition-transform">{incidentsList.length}</div>
            <p className="text-xs text-slate-600 font-medium mt-1 font-sans flex items-center justify-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Active Incidents
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Platform Crowd Status Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
            <Users className="w-4 h-4 text-navy-900" /> Live Platform Crowd Status Overview
          </h3>
          <button
            onClick={() => onNavigateToCrowd && onNavigateToCrowd()}
            className="text-xs font-bold text-slate-900 hover:underline font-mono flex items-center gap-1"
          >
            Open Crowd Analytics <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformsOverview.map((p, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateToCrowd && onNavigateToCrowd()}
              className="bg-white border border-[#E4E4DF] hover:border-slate-400 p-4 rounded-2xl space-y-2 cursor-pointer transition-all shadow-sm group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm font-heading">{p.name}</span>
                <span className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-md border ${p.color}`}>
                  {p.risk} Risk
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">{p.pax.toLocaleString()}</span>
                <span className="text-xs text-slate-500 font-medium font-sans">commuters</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    p.risk === 'Critical' ? 'bg-red-600' : p.risk === 'High' ? 'bg-amber-500' : p.risk === 'Medium' ? 'bg-blue-600' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (p.pax / 2000) * 100)}%` }}
                />
              </div>
            </div>
          ))}
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

        {/* Right 5 Cols: Live Incidents Stack */}
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

          {/* Cards Stack */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
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
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onNavigateToFeed(inc.cam)}
                      className="min-w-[75px]"
                    >
                      Feed
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Send}
                      onClick={() => onDispatchGuard(inc.id)}
                      className="min-w-[95px]"
                    >
                      Dispatch
                    </Button>
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
