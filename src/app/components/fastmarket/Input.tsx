import React, { useState, useRef, useEffect } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { Keyboard } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  enableVirtualKeyboard?: boolean;
  onVirtualKeyboardChange?: (value: string) => void;
}

export function Input({ label, error, className = '', enableVirtualKeyboard = true, onVirtualKeyboardChange, value, onChange, ...props }: InputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [layoutName, setLayoutName] = useState<'default' | 'shift'>('default');
  const [internalValue, setInternalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincroniza valor externo com interno
  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  // Scroll automático para o campo quando o teclado aparecer
  useEffect(() => {
    if (showKeyboard && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 150);
    }
  }, [showKeyboard]);

  const handleKeyPress = (button: string) => {
    let newValue = typeof internalValue === 'string' ? internalValue : '';

    if (button === '{bksp}') {
      newValue = newValue.slice(0, -1);
    } else if (button === '{space}') {
      newValue += ' ';
    } else if (button === '{shift}') {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default');
      return;
    } else if (button.length === 1) {
      newValue += button;
    }

    setInternalValue(newValue);
    
    if (onVirtualKeyboardChange) {
      onVirtualKeyboardChange(newValue);
    }
    
    // Simula evento de mudança para compatibilidade
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue, name: props.name }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (enableVirtualKeyboard) {
      setShowKeyboard(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div ref={containerRef} className="w-full transition-all duration-300">
        {label && (
          <label className={`block mb-1.5 md:mb-2 font-bold text-sm md:text-base transition-all duration-300 ${
            isFocused || showKeyboard ? 'text-orange-600 scale-105' : 'text-[#1F2937]'
          }`}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={inputRef}
            className={`w-full px-3 py-3 md:px-4 md:py-4 text-base md:text-lg rounded-lg outline-none transition-all duration-300 touch-manipulation ${
              showKeyboard || isFocused
                ? 'bg-orange-50 border-3 border-orange-500 ring-4 ring-orange-100 shadow-lg shadow-orange-200'
                : 'bg-[#F5F7FA] border-2 border-transparent hover:border-orange-400'
            } ${error ? 'border-[#E53935]' : ''} ${enableVirtualKeyboard ? 'pr-12' : ''} ${className}`}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={showKeyboard}
            {...props}
          />
          {enableVirtualKeyboard && (
            <button
              type="button"
              onClick={() => setShowKeyboard(!showKeyboard)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
                showKeyboard 
                  ? 'bg-orange-500 text-white shadow-lg scale-110 rotate-12' 
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white hover:scale-110'
              }`}
            >
              <Keyboard className="w-6 h-6 drop-shadow-sm" />
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs md:text-sm text-[#E53935]">{error}</p>
        )}
        {showKeyboard && (
          <div className="mt-2 flex items-center gap-2 text-orange-600 animate-pulse">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs md:text-sm font-semibold">✏️ Editando com teclado virtual</span>
          </div>
        )}
      </div>

      {showKeyboard && enableVirtualKeyboard && (
        <VirtualKeyboard
          onKeyPress={handleKeyPress}
          onClose={() => setShowKeyboard(false)}
          inputName={props.name || 'input'}
          layoutName={layoutName}
          activeFieldLabel={label}
        />
      )}
    </>
  );
}