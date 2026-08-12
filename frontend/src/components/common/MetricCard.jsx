import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-[#F1F5F9]',
  iconColor = 'text-[#0F172A]',
  trend,
  trendPositive = true,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E2E8F0] rounded-2xl p-4 transition-all select-none shadow-2xs ${
        onClick ? 'cursor-pointer hover:border-[#CBD5E1] hover:shadow-xs' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
        </div>
        {trend && (
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full font-sans ${
              trendPositive
                ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                : 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5]'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-[#64748B] font-sans">
          {title}
        </p>
        <div className="text-2xl font-bold text-[#0F172A] mt-1 font-sans tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-[#64748B] mt-1 font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
