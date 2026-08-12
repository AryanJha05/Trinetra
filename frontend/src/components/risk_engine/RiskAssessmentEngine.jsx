import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, SlidersHorizontal, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function RiskAssessmentEngine({ onNavigateToFeed }) {
  const [crowdWeight, setCrowdWeight] = useState(35);
  const [motionWeight, setMotionWeight] = useState(25);
  const [restrictedWeight, setRestrictedWeight] = useState(27);

  const calculatedRisk = crowdWeight + motionWeight + restrictedWeight;
  const getSeverityLabel = (score) => {
    if (score >= 80) return { label: 'CRITICAL', color: 'bg-red-100 text-red-700 border-red-200 font-bold' };
    if (score >= 60) return { label: 'HIGH RISK', color: 'bg-amber-100 text-amber-800 border-amber-200 font-bold' };
    if (score >= 40) return { label: 'MEDIUM', color: 'bg-blue-100 text-blue-700 border-blue-200 font-bold' };
    return { label: 'LOW', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 font-bold' };
  };

  const severity = getSeverityLabel(calculatedRisk);

  const riskCases = [
    {
      id: 'RISK-CASE-101',
      title: 'Zone B Public Hall Overcrowding',
      score: 87,
      confidence: '96.2%',
      factors: [
        { factor: 'Crowd Density > 3.8 pax/m²', contrib: '+35%' },
        { factor: 'Unusual Counter-Flow Vectors', contrib: '+25%' },
        { factor: 'Proximity to Restricted Perimeter', contrib: '+27%' },
      ],
      recommendation: 'Deploy perimeter barrier & redirect crowd flow to secondary exit hall.',
      status: 'HIGH SEVERITY',
      cam: 'CAM-002',
    },
    {
      id: 'RISK-CASE-102',
      title: 'Restricted Gate Unattended Package Alert',
      score: 94,
      confidence: '98.4%',
      factors: [
        { factor: 'Unattended Object Dwell Time > 4m', contrib: '+45%' },
        { factor: 'Restricted Access Zone Location', contrib: '+35%' },
        { factor: 'Owner Abandonment Velocity Vector', contrib: '+14%' },
      ],
      recommendation: 'Dispatch Security Response Unit & inspect Zone A Concourse.',
      status: 'CRITICAL',
      cam: 'CAM-001',
    },
    {
      id: 'RISK-CASE-103',
      title: 'Vending Machine Area Suspicious Loitering',
      score: 58,
      confidence: '89.1%',
      factors: [
        { factor: 'Stationary Dwell Time > 12 mins', contrib: '+30%' },
        { factor: 'Low Commuter Flow Sector', contrib: '+15%' },
        { factor: 'Repeated Glances Observed', contrib: '+13%' },
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
            <span>RISK INTELLIGENCE</span>
            <span>·</span>
            <span>REAL-TIME THREAT SCORING</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Dynamic Risk Assessment & Threat Analysis
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Multi-factor anomaly calculation, risk weighting, and transparent decision breakdown.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1.5 rounded-md text-xs font-mono border ${severity.color}`}>
            AGGREGATE THREAT SCORE: {calculatedRisk}/100 ({severity.label})
          </span>
        </div>
      </div>

      {/* 2. Light Enterprise Risk Factor Analysis Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 font-sans shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-900 font-heading tracking-wider uppercase flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-900" /> Risk Factor Analysis & Weighting
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust threat parameters to synthesize real-time risk index across all active cameras.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono">
            <span className="text-xs text-slate-500 font-medium">Synthesized Score:</span>
            <div className={`px-2.5 py-1 rounded text-xs uppercase font-bold border font-mono ${severity.color}`}>
              {calculatedRisk}% · {severity.label}
            </div>
          </div>
        </div>

        {/* Formula Breakdown Row */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-md flex flex-col md:flex-row items-center justify-around gap-4 font-mono text-xs">
          <div className="text-center">
            <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">CROWD DENSITY</span>
            <span className="text-slate-900 font-bold text-base">+{crowdWeight}%</span>
          </div>
          <span className="text-slate-400 text-lg font-bold">+</span>
          <div className="text-center">
            <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">MOTION VECTOR ANOMALY</span>
            <span className="text-slate-900 font-bold text-base">+{motionWeight}%</span>
          </div>
          <span className="text-slate-400 text-lg font-bold">+</span>
          <div className="text-center">
            <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">RESTRICTED ZONE ENTRY</span>
            <span className="text-slate-900 font-bold text-base">+{restrictedWeight}%</span>
          </div>
          <span className="text-slate-400 text-lg font-bold">=</span>
          <div className="text-center bg-white px-4 py-2 rounded border border-slate-300 shadow-2xs">
            <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">FINAL RISK INDEX</span>
            <span className="text-red-700 font-bold text-lg">{calculatedRisk}%</span>
          </div>
        </div>

        {/* Weight Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-700 font-medium">Crowd Density Weight:</span>
              <span className="text-slate-900 font-bold font-mono">{crowdWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={crowdWeight}
              onChange={(e) => setCrowdWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-700 font-medium">Motion Vector Anomaly:</span>
              <span className="text-slate-900 font-bold font-mono">{motionWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={motionWeight}
              onChange={(e) => setMotionWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="text-slate-700 font-medium">Restricted Zone Entry:</span>
              <span className="text-slate-900 font-bold font-mono">{restrictedWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={restrictedWeight}
              onChange={(e) => setRestrictedWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 3. Risk Factor Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider">
          Active Threat Case Breakdowns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskCases.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 space-y-4 flex flex-col justify-between transition-all shadow-2xs font-sans"
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
                    CONTRIBUTING FACTORS (CONFIDENCE: {cs.confidence})
                  </span>
                  {cs.factors.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 text-xs font-medium">
                      <span className="text-slate-700 truncate max-w-[170px]">{f.factor}</span>
                      <span className="text-slate-900 font-bold font-mono">{f.contrib}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-xs space-y-1 font-sans">
                  <span className="text-[9px] font-mono text-slate-900 font-bold uppercase tracking-wider block">
                    RECOMMENDED ACTION
                  </span>
                  <p className="text-slate-700 leading-snug font-medium">{cs.recommendation}</p>
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
