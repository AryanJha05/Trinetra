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
  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'WARNING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 font-sans transition-all hover:border-slate-300">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${getSeverityBadge(severity)}`}>
          {severity}
        </span>
        <span className="text-xs font-mono text-slate-500">{id} {time ? `· ${time}` : ''}</span>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-900 font-heading leading-tight">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">
          {cam ? <strong className="text-slate-800">CAM: {cam}</strong> : null} {location ? `· ${location}` : ''}
        </p>
      </div>

      {desc && (
        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
          {desc}
        </p>
      )}

      <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-100">
        {onViewFeed && (
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={onViewFeed}
            className="!h-7 !px-2.5 !text-xs"
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
            className="!h-7 !px-3 !text-xs"
          >
            Dispatch
          </Button>
        )}
      </div>
    </div>
  );
}
