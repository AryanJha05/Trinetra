import React from 'react';

export default function ChartPanel({
  title,
  subtitle,
  rightMetric,
  children,
  className = ''
}) {
  return (
    <div className={`bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans shadow-2xs ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#64748B]">
            {subtitle || 'Analytics & Telemetry'}
          </p>
          <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
            {title}
          </h3>
        </div>
        {rightMetric && (
          <div className="text-right">
            <span className="text-xs text-[#64748B] font-medium">{rightMetric}</span>
          </div>
        )}
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
