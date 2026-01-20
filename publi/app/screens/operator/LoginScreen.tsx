import React, { useState } from 'react';
import { Logo } from '../../components/fastmarket/Logo';
import { Button } from '../../components/fastmarket/Button';
import { Input } from '../../components/fastmarket/Input';
import { Lock } from 'lucide-react';
import { useFastMarket } from '../../context/FastMarketContext';

export function LoginScreen() {
  const { setIsOperatorMode, setCurrentScreen } = useFastMarket();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simple PIN verification (in production, this would be secure)
    if (pin === '1234') {
      setIsOperatorMode(true);
      setCurrentScreen('operator-dashboard');
    } else {
      setError('PIN incorreto');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="py-4 px-4 md:py-8 md:px-16 border-b border-gray-200">
        <Logo size="md" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Icon */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#1F2937]/10 rounded-full mb-4 md:mb-6">
              <Lock className="w-8 h-8 md:w-10 md:h-10 text-[#1F2937]" />
            </div>
            <h1 className="mb-2 font-bold text-[#1F2937] text-xl md:text-2xl">
              Acesso Operador
            </h1>
            <p className="text-[#717182] text-sm md:text-base">Digite o PIN para continuar</p>
          </div>

          {/* PIN Input */}
          <div className="mb-6 md:mb-8">
            <Input
              type="password"
              placeholder="Digite o PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              error={error}
              className="text-center text-xl md:text-2xl tracking-widest"
            />
            <p className="text-xs text-[#717182] mt-2 text-center">
              PIN padrão: 1234
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 md:space-y-4">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleLogin}
            >
              ENTRAR
            </Button>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => setCurrentScreen('home')}
            >
              CANCELAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}