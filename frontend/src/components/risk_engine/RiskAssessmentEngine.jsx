import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, Sliders } from 'lucide-react';
import Button from '../common/Button';

export default function RiskAssessmentEngine({ onNavigateToFeed }) {
  const [crowdWeight, setCrowdWeight] = useState(35);
  const [motionWeight, setMotionWeight] = useState(25);
  const [restrictedWeight, setRestrictedWeight] = useState(27);

  const calculatedRisk = crowdWeight + motionWeight + restrictedWeight;
  const getSeverityLabel = (score) => {
    if (score >= 80) return { label: 'CRITICAL', color: 'bg-red-600 text-white font-bold' };
    if (score >= 60) return { label: 'HIGH RISK', color: 'bg-amber-500 text-slate-950 font-bold' };
    if (score >= 40) return { label: 'MEDIUM', color: 'bg-blue-600 text-white font-bold' };
    return { label: 'LOW', color: 'bg-emerald-600 text-white font-bold' };
  };

  const severity = getSeverityLabel(calculatedRisk);

  const xaiCases = [
    {
      id: 'XAI-CASE-101',
      title: 'Zone B Public Hall Overcrowding',
      score: 87,
      factors: [
        { factor: 'Crowd Density > 3.8 pax/m²', contrib: '+35%' },
        { factor: 'Unusual Backward Movement Vectors', contrib: '+25%' },
        { factor: 'Close Proximity to Restricted Perimeter', contrib: '+27%' },
      ],
      recommendation: 'Immediate perimeter barrier deployment & redirection to exit hall.',
      status: 'HIGH SEVERITY',
      cam: 'CAM-002',
    },
    {
      id: 'XAI-CASE-102',
      title: 'Restricted Gate Unattended Package Alert',
      score: 94,
      factors: [
        { factor: 'Unattended Object > 4m Dwell Time', contrib: '+45%' },
        { factor: 'Restricted Access Zone Location', contrib: '+35%' },
        { factor: 'Owner Abandonment Velocity Vector', contrib: '+14%' },
      ],
      recommendation: 'Dispatch Security Response Unit & Inspect Zone A Concourse.',
      status: 'CRITICAL',
      cam: 'CAM-001',
    },
    {
      id: 'XAI-CASE-103',
      title: 'Ticket Vending Machine Suspicious Loitering',
      score: 58,
      factors: [
        { factor: 'Stationary Dwell Time > 12 mins', contrib: '+30%' },
        { factor: 'Low Commuter Flow Area', contrib: '+15%' },
        { factor: 'Frequent Backward Glances Observed', contrib: '+13%' },
      ],
      recommendation: 'Issue automated audio prompt & log for supervisor review.',
      status: 'MEDIUM SEVERITY',
      cam: 'CAM-003',
    },
  ];

  return (
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <Cpu className="w-3.5 h-3.5 text-slate-800" />
            <span>EXPLAINABLE AI ENGINE</span>
            <span>·</span>
            <span>REAL-TIME THREAT MATRICES</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Dynamic Risk Assessment & XAI Engine
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Algorithmic risk weighting, multi-factor anomaly calculation, and transparent Explainable AI decision trees.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold ${severity.color}`}>
            AGGREGATE SCORE: {calculatedRisk}/100 ({severity.label})
          </span>
        </div>
      </div>

      {/* 2. Interactive Risk Formula Tuner Card */}
      <div className="bg-slate-900 text-white border border-slate-900 rounded-lg p-6 space-y-6 font-sans shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-bold text-white font-heading tracking-wider uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" /> Interactive XAI Risk Formula Tuner
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Adjust parameters below to evaluate synthesized real-time threat scores.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono">
            <span className="text-xs text-slate-400 uppercase">Synthesized Risk:</span>
            <div className={`px-3 py-1 rounded text-xs uppercase font-bold font-mono ${severity.color}`}>
              {calculatedRisk}% · {severity.label}
            </div>
          </div>
        </div>

        {/* Formula Synthesis Row */}
        <div className="bg-slate-800/90 border border-slate-700/90 p-4 rounded-md flex flex-col md:flex-row items-center justify-around gap-4 font-mono text-xs">
          <div className="text-center">
            <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">CROWD DENSITY</span>
            <span className="text-emerald-400 font-bold text-base">+{crowdWeight}%</span>
          </div>
          <span className="text-slate-500 text-lg font-bold">+</span>
          <div className="text-center">
            <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">UNUSUAL MOTION</span>
            <span className="text-sky-400 font-bold text-base">+{motionWeight}%</span>
          </div>
          <span className="text-slate-500 text-lg font-bold">+</span>
          <div className="text-center">
            <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">RESTRICTED ZONE</span>
            <span className="text-amber-400 font-bold text-base">+{restrictedWeight}%</span>
          </div>
          <span className="text-slate-500 text-lg font-bold">=</span>
          <div className="text-center bg-slate-900 px-4 py-2 rounded border border-slate-700">
            <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">FINAL RISK SCORE</span>
            <span className="text-red-400 font-bold text-lg">{calculatedRisk}%</span>
          </div>
        </div>

        {/* Weight Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-300 font-medium">Crowd Density Weight:</span>
              <span className="text-emerald-400 font-bold font-mono">{crowdWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={crowdWeight}
              onChange={(e) => setCrowdWeight(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-300 font-medium">Motion Vector Anomaly:</span>
              <span className="text-sky-400 font-bold font-mono">{motionWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={motionWeight}
              onChange={(e) => setMotionWeight(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-300 font-medium">Restricted Zone Entry:</span>
              <span className="text-amber-400 font-bold font-mono">{restrictedWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={restrictedWeight}
              onChange={(e) => setRestrictedWeight(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. XAI Case Studies & Breakdown Cards (12 Column Responsive Layout: 4 columns each) */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
          Live XAI Threat Factor Breakdowns
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {xaiCases.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 space-y-4 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs font-sans"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">{cs.id}</span>
                  <span className="text-[9px] font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded font-mono uppercase">
                    Risk {cs.score}%
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 font-heading leading-snug">
                  {cs.title}
                </h4>

                {/* Factors List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                    CONTRIBUTING FACTORS
                  </span>
                  {cs.factors.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 text-xs font-medium">
                      <span className="text-slate-700 truncate max-w-[170px]">{f.factor}</span>
                      <span className="text-slate-900 font-bold font-mono">{f.contrib}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 text-white p-3.5 rounded-md text-xs space-y-1 font-sans">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    RECOMMENDED ACTION
                  </span>
                  <p className="text-slate-200 leading-snug font-medium">{cs.recommendation}</p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigateToFeed && onNavigateToFeed(cs.cam)}
                  className="w-full !h-8 !text-xs"
                >
                  View Camera Feed ({cs.cam})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
