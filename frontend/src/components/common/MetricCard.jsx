import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-slate-100',
  iconColor = 'text-slate-700',
  trend,
  trendPositive = true,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 rounded-lg p-3 transition-all select-none ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-2xs' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-7 h-7 rounded-md ${iconBg} flex items-center justify-center`}>
          {Icon && <Icon className={`w-3.5 h-3.5 ${iconColor}`} />}
        </div>
        {trend && (
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md font-mono ${
              trendPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider font-sans">
          {title}
        </p>
        <div className="text-xl font-bold text-slate-900 mt-0.5 font-heading tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
