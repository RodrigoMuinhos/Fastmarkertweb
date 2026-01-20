import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | string;
  noPadding?: boolean;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'md', noPadding = false }: ModalProps) {
  if (!isOpen) return null;
  
  const widthStyles: Record<string, string> = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };
  
  const widthClass = widthStyles[maxWidth] || maxWidth;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className={`bg-white rounded-lg shadow-xl w-full ${widthClass} max-h-[90vh] overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-[#1F2937]">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors"
            >
              <X size={24} className="text-[#1F2937]" />
            </button>
          </div>
        )}
        <div className={noPadding ? "p-0" : "p-8"}>
          {children}
        </div>
      </div>
    </div>
  );
}