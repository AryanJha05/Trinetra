import React from 'react';
import { Clock } from 'lucide-react';

export default function Timeline({ items = [] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 font-sans space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
        <Clock className="w-4 h-4 text-slate-700" />
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
          Operational Timeline
        </h4>
      </div>

      <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="relative space-y-1">
            <div className={`absolute -left-4 top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
              item.severity === 'CRITICAL' ? 'bg-red-500' : item.severity === 'WARNING' ? 'bg-amber-500' : 'bg-slate-400'
            }`} />
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-900">{item.title}</span>
              <span className="text-slate-500">{item.time}</span>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
