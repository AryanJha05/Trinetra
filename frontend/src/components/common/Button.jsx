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
  // Base classes for enterprise software buttons (dimensionally stable across states)
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium text-xs rounded-xl select-none transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none tracking-tight box-border';

  // Fixed height & padding per size
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5 min-h-[32px]',
    md: 'h-9 px-4 text-xs gap-2 min-h-[36px]',
    lg: 'h-10 px-5 text-sm gap-2 min-h-[40px]',
  };

  // Reference visual variants matching the reference image buttons:
  // Primary (Dark Slate #0F172A), Secondary (Light Gray #F1F5F9), Inverted (Dark Slate #1E293B), Outlined (White w/ border), Tertiary/Accent (#231500)
  const variantClasses = {
    primary: 'bg-[#0F172A] hover:bg-slate-800 text-white border border-[#0F172A] shadow-xs',
    secondary: 'bg-[#F1F5F9] hover:bg-slate-200 text-[#64748B] hover:text-[#0F172A] border border-transparent shadow-xs',
    inverted: 'bg-[#1E293B] hover:bg-slate-700 text-white border border-[#1E293B] shadow-xs',
    tertiary: 'bg-[#231500] hover:bg-[#3D2500] text-white border border-[#231500] shadow-xs',
    accent: 'bg-[#231500] hover:bg-[#3D2500] text-white border border-[#231500] shadow-xs',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-xs',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 shadow-xs',
    outline: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
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
