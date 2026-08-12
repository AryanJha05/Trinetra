import React from 'react';
import { Eye, Send } from 'lucide-react';
import Button from './Button';

export default function IncidentCard({
  id,
  title,
  severity = 'WARNING',
  location,
  time,
  desc,
  status,
  cam,
  onViewFeed,
  onDispatch
}) {
export default function IncidentCard({
  id,
  title,
  severity = 'WARNING',
  location,
  time,
  desc,
  status,
  cam,
  onViewFeed,
  onDispatch
}) {
  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]';
      case 'WARNING':
        return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]';
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-3 font-sans transition-all hover:border-[#CBD5E1] shadow-2xs">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase border font-sans ${getSeverityBadge(severity)}`}>
          {severity}
        </span>
        <span className="text-xs font-mono text-[#64748B]">{id} {time ? `· ${time}` : ''}</span>
      </div>

      <div>
        <h4 className="text-sm font-bold text-[#0F172A] font-sans leading-tight">{title}</h4>
        <p className="text-xs text-[#64748B] mt-1 font-sans">
          {cam ? <strong className="text-[#0F172A]">CAM: {cam}</strong> : null} {location ? `· ${location}` : ''}
        </p>
      </div>

      {desc && (
        <p className="text-xs text-[#334155] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] leading-relaxed font-sans">
          {desc}
        </p>
      )}

      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#F1F5F9]">
        {onViewFeed && (
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={onViewFeed}
          >
            Feed
          </Button>
        )}
        {onDispatch && (
          <Button
            variant="primary"
            size="sm"
            icon={Send}
            onClick={onDispatch}
          >
            Dispatch
          </Button>
        )}
      </div>
    </div>
  );
}
