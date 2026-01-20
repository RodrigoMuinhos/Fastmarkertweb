import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1.5 md:mb-2 font-medium text-[#1F2937] text-sm md:text-base">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-3 md:px-4 md:py-4 text-base md:text-lg bg-[#F5F7FA] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors touch-manipulation ${error ? 'border-[#E53935]' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs md:text-sm text-[#E53935]">{error}</p>
      )}
    </div>
  );
}