import React from 'react';
import { motion } from 'motion/react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'danger';
  pulse?: boolean;
  className?: string;
}

export function Badge({ children, variant = 'success', pulse = false, className = '' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <motion.div
          className="w-2 h-2 rounded-full bg-white mr-2"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {children}
    </motion.div>
  );
}
