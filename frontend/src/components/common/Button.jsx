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
  // Base classes for standard enterprise button geometry
  const baseClasses = 'inline-flex items-center justify-center font-heading font-bold text-xs rounded-xl select-none transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-navy-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none';

  // Fixed height & padding per size
  const sizeClasses = {
    sm: 'h-8 px-3 text-[11px] gap-1.5',
    md: 'h-9.5 px-4 text-xs gap-2',
    lg: 'h-11 px-5 text-xs md:text-sm gap-2.5',
  };

  // Explicit high-contrast color variants
  const variantClasses = {
    primary: 'bg-navy-900 hover:bg-navy-950 text-white shadow-sm border border-navy-900',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm border border-red-600',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-600',
    outline: 'bg-white hover:bg-slate-100 text-slate-800 border border-[#E4E4DF] shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-200/60 text-slate-800 border border-transparent',
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
