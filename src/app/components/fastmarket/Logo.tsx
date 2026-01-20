import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onLongPress?: () => void;
}

export function Logo({ size = 'md', onLongPress }: LogoProps) {
  const [pressTimer, setPressTimer] = React.useState<NodeJS.Timeout | null>(null);
  
  const sizes = {
    sm: { icon: 20, iconMd: 24, text: 'text-lg md:text-xl', padding: 'p-1.5 md:p-2', gap: 'gap-1.5 md:gap-2' },
    md: { icon: 24, iconMd: 32, text: 'text-xl md:text-2xl', padding: 'p-2 md:p-2.5', gap: 'gap-2 md:gap-2.5' },
    lg: { icon: 32, iconMd: 48, text: 'text-2xl md:text-4xl', padding: 'p-2 md:p-3', gap: 'gap-2 md:gap-3' }
  };
  
  const handleMouseDown = () => {
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 3000);
      setPressTimer(timer);
    }
  };
  
  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };
  
  const handleTouchStart = () => {
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 3000);
      setPressTimer(timer);
    }
  };
  
  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };
  
  return (
    <div 
      className={`flex items-center ${sizes[size].gap} select-none`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className={`bg-[#22C55E] rounded-lg ${sizes[size].padding}`}>
        <Zap size={sizes[size].icon} className="text-white md:hidden" fill="white" />
        <Zap size={sizes[size].iconMd} className="text-white hidden md:block" fill="white" />
      </div>
      <span className={`${sizes[size].text} font-bold text-[#1F2937]`}>
        Fast<span className="text-[#22C55E]">Market</span>
      </span>
    </div>
  );
}