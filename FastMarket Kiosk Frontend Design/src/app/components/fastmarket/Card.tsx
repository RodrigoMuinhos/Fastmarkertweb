import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  gradient?: boolean;
  delay?: number;
}

export function Card({ children, className = '', onClick, hover = false, gradient = false, delay = 0 }: CardProps) {
  const hoverStyles = hover ? 'cursor-pointer touch-manipulation' : '';
  const gradientBg = gradient 
    ? 'bg-gradient-to-br from-white via-gray-50 to-gray-100' 
    : 'bg-white';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(34, 197, 94, 0.1)'
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={`${gradientBg} rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 ${hoverStyles} ${className}`}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}