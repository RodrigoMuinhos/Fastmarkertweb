import React, { useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';

interface VirtualKeyboardProps {
  onKeyPress: (button: string) => void;
  onClose: () => void;
  inputName: string;
  layoutName?: 'default' | 'shift';
  activeFieldLabel?: string;
}

export function VirtualKeyboard({ onKeyPress, onClose, inputName, layoutName = 'default', activeFieldLabel }: VirtualKeyboardProps) {
  const keyboard = useRef<any>(null);

  // Adiciona padding no body quando o teclado abre para evitar que o conteúdo fique escondido
  useEffect(() => {
    const keyboardHeight = 480; // Altura aproximada do teclado
    document.body.style.paddingBottom = `${keyboardHeight}px`;
    
    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, []);

  const handleKeyPress = (button: string) => {
    if (button === '{close}') {
      onClose();
      return;
    }
    onKeyPress(button);
  };

  return (
    <>
      {/* Backdrop transparente */}
      <div 
        className="fixed inset-0 bg-black/5 z-40" 
        onClick={onClose}
      ></div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-orange-50 via-white to-amber-50 border-t-4 border-orange-500 shadow-[0_-10px_40px_rgba(249,115,22,0.3)] z-[45] p-8 animate-slide-up">
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .hg-theme-default {
          background: linear-gradient(145deg, #ffffff 0%, #fff7ed 50%, #ffffff 100%);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 
            0 8px 32px rgba(249, 115, 22, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .hg-button {
          background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
          border: 2.5px solid #fed7aa;
          box-shadow: 
            0 4px 12px rgba(249, 115, 22, 0.15),
            0 2px 4px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          font-size: 22px;
          font-weight: 700;
          color: #1f2937;
          height: 68px;
          margin: 7px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }
        
        .hg-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .hg-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .hg-button:hover {
          background: linear-gradient(145deg, #fff7ed 0%, #fed7aa 100%);
          border-color: #fdba74;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 
            0 8px 24px rgba(249, 115, 22, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        .hg-button:active {
          background: linear-gradient(145deg, #f97316 0%, #ea580c 100%);
          color: white;
          border-color: #ea580c;
          transform: translateY(-1px) scale(0.99);
          box-shadow: 
            0 4px 12px rgba(249, 115, 22, 0.4),
            inset 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .hg-red {
          background: linear-gradient(145deg, #f97316 0%, #ea580c 100%) !important;
          color: white !important;
          border-color: #fdba74 !important;
          font-weight: 900 !important;
          box-shadow: 
            0 4px 16px rgba(249, 115, 22, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        .hg-red:hover {
          background: linear-gradient(145deg, #ea580c 0%, #c2410c 100%) !important;
          border-color: #fb923c !important;
          box-shadow: 
            0 8px 28px rgba(234, 88, 12, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
        }
        
        .hg-red:active {
          background: linear-gradient(145deg, #c2410c 0%, #9a3412 100%) !important;
        }
        
        .hg-button.hg-functionBtn {
          background: linear-gradient(145deg, #f97316 0%, #ea580c 100%);
          color: white;
          border-color: #fdba74;
          font-weight: 900;
          font-size: 18px;
          box-shadow: 
            0 4px 16px rgba(249, 115, 22, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .hg-button.hg-functionBtn:hover {
          background: linear-gradient(145deg, #ea580c 0%, #c2410c 100%);
          border-color: #fb923c;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 
            0 8px 28px rgba(234, 88, 12, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .hg-button.hg-functionBtn:active {
          background: linear-gradient(145deg, #c2410c 0%, #9a3412 100%);
          transform: translateY(-1px) scale(0.99);
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-5 border-orange-200">
          <div>
            <h3 className="text-3xl font-black text-gray-900 flex items-center gap-4">
              <span className="text-5xl">⌨️</span>
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                Teclado Virtual
              </span>
            </h3>
            {activeFieldLabel && (
              <p className="text-sm text-gray-600 mt-3 ml-16 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-300"></span>
                Editando: <span className="font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">{activeFieldLabel}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 active:from-orange-700 active:via-orange-800 active:to-orange-900 text-white font-black py-5 px-10 rounded-3xl transition-all shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 active:scale-95 flex items-center gap-3 text-xl border-2 border-orange-400"
          >
            <span className="text-3xl">✕</span>
            Fechar
          </button>
        </div>
        <Keyboard
          keyboardRef={(r: any) => (keyboard.current = r)}
          layoutName={layoutName}
          onKeyPress={handleKeyPress}
          layout={{
            default: [
              '1 2 3 4 5 6 7 8 9 0 {bksp}',
              'q w e r t y u i o p',
              'a s d f g h j k l',
              '{shift} z x c v b n m , .',
              '{space} @ . {close}'
            ],
            shift: [
              '! @ # $ % & * ( ) {bksp}',
              'Q W E R T Y U I O P',
              'A S D F G H J K L',
              '{shift} Z X C V B N M , .',
              '{space} @ . {close}'
            ]
          }}
          display={{
            '{bksp}': '⌫ Apagar',
            '{shift}': '⇧ Maiúscula',
            '{space}': 'Espaço',
            '{close}': '✕ Fechar'
          }}
          theme="hg-theme-default hg-layout-default"
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "{close}"
            }
          ]}
        />
        </div>
      </div>
    </>
  );
}
