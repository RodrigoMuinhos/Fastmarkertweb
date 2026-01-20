import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-[#22C55E]',
      icon: <CheckCircle className="text-[#22C55E]" size={24} />,
      text: 'text-[#22C55E]'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-[#E53935]',
      icon: <XCircle className="text-[#E53935]" size={24} />,
      text: 'text-[#E53935]'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-[#FBBF24]',
      icon: <AlertCircle className="text-[#FBBF24]" size={24} />,
      text: 'text-[#FBBF24]'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: <Info className="text-blue-500" size={24} />,
      text: 'text-blue-500'
    }
  };
  
  const style = styles[type];
  
  return (
    <div className={`${style.bg} border-l-4 ${style.border} p-4 rounded-lg flex items-center gap-3`}>
      {style.icon}
      <p className={`flex-1 font-medium ${style.text}`}>{message}</p>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-white/50 rounded">
          <XCircle size={20} className={style.text} />
        </button>
      )}
    </div>
  );
}
