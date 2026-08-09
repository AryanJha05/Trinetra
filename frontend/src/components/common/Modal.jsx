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
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 select-none animate-fadeInSmooth"
      onClick={onClose}
    >
      {/* Modal Dialog Window: z-[1100] centered, floating above backdrop without layout displacement */}
      <div
        className={`relative z-[1100] bg-[#F4F4F0] border border-[#E4E4DF] rounded-2xl w-full ${maxWidth} shadow-2xl overflow-hidden text-slate-900 font-sans transform transition-all duration-200 animate-scaleUpSmooth`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="w-5 h-5 text-railway-mint flex-shrink-0" />}
            <div>
              <h3 className="text-base font-extrabold font-heading leading-tight">{title}</h3>
              {subtitle && <p className="text-[11px] text-slate-300 font-sans font-medium mt-0.5">{subtitle}</p>}
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
          <div className="px-6 py-3.5 bg-[#ECECE7] border-t border-[#E4E4DF] flex items-center justify-end space-x-3 font-mono text-xs">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
}
