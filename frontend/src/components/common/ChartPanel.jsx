import React from 'react';

export default function ChartPanel({
  title,
  subtitle,
  rightMetric,
  children,
  className = ''
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 font-sans ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
            {subtitle || 'ANALYTICS & TELEMETRY'}
          </p>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5">
            {title}
          </h3>
        </div>
        {rightMetric && (
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">{rightMetric}</span>
          </div>
        )}
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
