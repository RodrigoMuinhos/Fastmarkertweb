import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40',
    secondary: 'bg-gradient-to-br from-white to-gray-50 text-[#1F2937] border-2 border-gray-200 hover:border-gray-300 shadow-md',
    danger: 'bg-gradient-to-r from-[#E53935] to-[#C62828] text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
    accent: 'bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#1F2937] shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-sm md:px-5',
    md: 'px-5 py-3 text-sm md:px-7 md:py-3.5 md:text-base',
    lg: 'px-6 py-3.5 text-base md:px-9 md:py-5 md:text-lg',
    xl: 'px-8 py-5 text-lg md:px-12 md:py-7 md:text-xl lg:text-2xl'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      <motion.span
        className="relative z-10"
        initial={false}
        animate={!disabled ? { opacity: 1 } : { opacity: 0.5 }}
      >
        {children}
      </motion.span>
      
      {/* Ripple effect background */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: 'inherit' }}
        />
      )}
    </motion.button>
  );
}