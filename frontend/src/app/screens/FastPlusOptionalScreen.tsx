import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Input } from '../components/fastmarket/Input';
import { FastPlusRewardsCarousel } from '../components/fastmarket/FastPlusRewardsCarousel';
import { Award, Gift } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import { maskCpf, maskPhone } from '../utils/lgpd';

export function FastPlusOptionalScreen() {
  const { cartTotal, setCurrentScreen, findCustomer, setCurrentCustomer } = useFastMarket();
  const [cpf, setCpf] = useState('');
  const [cpfDisplay, setCpfDisplay] = useState(''); // Valor com máscara para exibição
  const [isFocused, setIsFocused] = useState(false); // Controla se o campo está focado
  const [error, setError] = useState('');

  const pointsToEarn = Math.floor(cartTotal * 10);

  // Aplica máscara LGPD ao valor
  const applyMask = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 11 && numbers.length === value.replace(/\D/g, '').length) {
      // Se parece ser CPF
      if (value.includes('.') || value.includes('-')) {
        return maskCpf(value);
      }
      // Se for só números, pode ser CPF ou celular
      if (numbers[2] === '9' || numbers[2] === '8' || numbers[2] === '7') {
        return maskPhone(value); // Provavelmente telefone
      }
      return maskCpf(value); // Provavelmente CPF
    } else if (numbers.length === 10) {
      return maskPhone(value); // Telefone fixo
    }
    
    return value;
  };

  const handleFocus = () => {
    setIsFocused(true);
    setCpfDisplay(cpf); // Mostra valor real ao focar
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (cpf) {
      setCpfDisplay(applyMask(cpf)); // Aplica máscara ao desfocar
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(value);
    if (isFocused) {
      setCpfDisplay(value); // Atualiza display durante digitação
    }
    setError('');
  };

  const handleConfirm = () => {
    if (!cpf) {
      setError('Digite seu CPF');
      return;
    }

    const customer = findCustomer(cpf);
    
    if (customer) {
      setCurrentCustomer(customer);
      setCurrentScreen('payment');
    } else {
      // Customer not found, go to registration
      setCurrentScreen('fastplus-register');
    }
  };

  const handleSkip = () => {
    setCurrentCustomer(null);
    setCurrentScreen('payment');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="py-4 px-4 md:py-8 md:px-16 border-b border-gray-200">
        <Logo size="md" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 lg:p-16 flex items-center justify-center overflow-auto">
        <div className="max-w-2xl w-full">
          {/* Icon and Title */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-[#FBBF24]/20 rounded-full mb-4 md:mb-6">
              <Award className="w-8 h-8 md:w-12 md:h-12 text-[#FBBF24]" />
            </div>
            <h1 className="mb-3 md:mb-4 font-bold text-[#1F2937] text-xl md:text-2xl">
              Deseja acumular pontos Fast+?
            </h1>
            <p className="text-[#717182] text-base md:text-xl">
              Ganhe benefícios exclusivos a cada compra
            </p>
          </div>

          {/* Points Info */}
          <div className="bg-[#FBBF24]/10 rounded-lg p-4 md:p-6 mb-6 md:mb-8 text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-[#FBBF24]" />
              <span className="font-bold text-[#FBBF24] text-sm md:text-base">
                Você vai ganhar {pointsToEarn} pontos!
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#717182]">R$ 1,00 = 10 pontos</p>
          </div>

          {/* Carousel de Recompensas Fast+ */}
          <div className="mb-6 md:mb-8">
            <FastPlusRewardsCarousel />
          </div>

          {/* CPF Input */}
          <div className="mb-6 md:mb-8">
            <Input
              label="CPF ou Telefone"
              placeholder="Digite seu CPF ou telefone"
              value={isFocused ? cpf : cpfDisplay}
              onChange={handleChange}
              error={error}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 md:space-y-4">
            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handleConfirm}
            >
              CONFIRMAR
            </Button>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleSkip}
            >
              PULAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}