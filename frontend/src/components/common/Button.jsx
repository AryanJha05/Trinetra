import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  minWidth = '',
  className = '',
  type = 'button',
  onClick,
  title,
  ...props
}) {
  // Base classes for enterprise software buttons
  const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold text-xs rounded-lg select-none transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#111827] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none tracking-tight';

  // Fixed height & padding per size
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-9 px-4 text-xs gap-2',
    lg: 'h-10 px-5 text-sm gap-2',
  };

  // Reference visual variants
  const variantClasses = {
    primary: 'bg-[#111827] hover:bg-[#1F2937] text-white border border-[#111827] shadow-2xs',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-[#E2E8F0] shadow-2xs',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-2xs',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 shadow-2xs',
    outline: 'bg-white hover:bg-slate-50 text-[#111827] border border-[#E2E8F0] shadow-2xs',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      title={title}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${minWidth} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
          <span className="truncate">{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 flex-shrink-0 text-current" />}
          <span className="truncate">{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 flex-shrink-0 text-current" />}
        </>
      )}
    </button>
  );
}
