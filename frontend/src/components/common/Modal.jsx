import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  children,
  maxWidth = 'max-w-xl',
  footerActions
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* Modal Backdrop Layer: z-[1000] fixed top-0 left-0 right-0 bottom-0 */
    <div
      className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-200 select-none animate-fadeInSmooth"
      onClick={onClose}
    >
      {/* Modal Dialog Window: z-[1100] centered, floating above backdrop without layout displacement */}
      <div
        className={`relative z-[1100] bg-white border border-[#E2E8F0] rounded-3xl w-full ${maxWidth} shadow-2xl overflow-hidden text-[#0F172A] font-sans transform transition-all duration-200 animate-scaleUpSmooth`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-[#0F172A]">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
            <div>
              <h3 className="text-base font-bold font-sans leading-tight">{title}</h3>
              {subtitle && <p className="text-xs text-slate-300 font-sans font-medium mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Modal Footer Actions (Optional) */}
        {footerActions && (
          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end space-x-3 text-xs">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
}
