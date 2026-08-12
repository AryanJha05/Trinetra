import React from 'react';
import { Clock } from 'lucide-react';

export default function Timeline({ items = [] }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 font-sans space-y-3 h-full flex flex-col shadow-2xs">
      <div className="flex items-center space-x-2 border-b border-[#F1F5F9] pb-2.5 flex-shrink-0">
        <Clock className="w-4 h-4 text-[#0F172A]" />
        <h4 className="text-xs font-bold text-[#0F172A] tracking-wider font-sans">
          Operational Timeline
        </h4>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 relative pl-5 space-y-4 pt-1 internal-scroll-area">
        {/* Timeline vertical bar centered at 8px */}
        <div className="absolute left-[7px] top-2.5 bottom-2.5 w-0.5 bg-[#E2E8F0]" />

        {items.map((item, idx) => (
          <div key={item.id || idx} className="relative space-y-0.5">
            {/* Timeline dot centered at 8px */}
            <div className={`absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
              item.severity === 'CRITICAL' ? 'bg-[#EF4444]' : item.severity === 'WARNING' ? 'bg-[#F59E0B]' : 'bg-[#94A3B8]'
            }`} />
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#0F172A]">{item.title}</span>
              <span className="text-[#64748B] text-[11px]">{item.time}</span>
            </div>
            <p className="text-xs text-[#64748B] font-sans leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
