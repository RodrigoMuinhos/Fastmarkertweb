import React, { useState } from 'react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Input } from '../components/fastmarket/Input';
import { Card } from '../components/fastmarket/Card';
import { Award, User, Phone } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import type { Customer } from '../context/FastMarketContext';
import { maskCpf, maskPhone } from '../utils/lgpd';

export function FastPlusQueryScreen() {
  const { findCustomer, setCurrentScreen } = useFastMarket();
  const [cpf, setCpf] = useState('');
  const [cpfDisplay, setCpfDisplay] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [foundCustomer, setFoundCustomer] = useState<Customer | null>(null);

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
    setCpfDisplay(cpf);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (cpf) {
      setCpfDisplay(applyMask(cpf));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(value);
    if (isFocused) {
      setCpfDisplay(value);
    }
    setError('');
    setFoundCustomer(null);
  };

  const handleSearch = () => {
    if (!cpf) {
      setError('Digite um CPF ou telefone');
      return;
    }

    const customer = findCustomer(cpf);
    
    if (customer) {
      setFoundCustomer(customer);
      setError('');
    } else {
      setError('Cliente não encontrado');
      setFoundCustomer(null);
    }
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
              Consultar Fast+
            </h1>
            <p className="text-[#717182] text-sm md:text-xl px-4">
              Digite seu CPF ou telefone para consultar seus pontos
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 md:mb-8">
            <Input
              label="CPF ou Telefone"
              placeholder="Digite seu CPF ou telefone"
              value={cpfDisplay}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={error}
            />
          </div>

          <Button
            variant="accent"
            size="lg"
            fullWidth
            onClick={handleSearch}
            className="mb-6 md:mb-8"
          >
            CONSULTAR
          </Button>

          {/* Customer Info */}
          {foundCustomer && (
            <Card className="mb-6 md:mb-8">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#1F2937]" />
                  <div>
                    <p className="text-xs md:text-sm text-[#717182]">Nome</p>
                    <p className="font-semibold text-[#1F2937] text-sm md:text-base">{foundCustomer.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#1F2937]" />
                  <div>
                    <p className="text-xs md:text-sm text-[#717182]">Telefone</p>
                    <p className="font-semibold text-[#1F2937] text-sm md:text-base">{maskPhone(foundCustomer.phone)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-6">
                  <div className="bg-[#FBBF24]/10 rounded-lg p-4 md:p-6 text-center">
                    <p className="text-[#717182] mb-2 text-xs md:text-sm">Pontos Acumulados</p>
                    <p className="font-bold text-[#FBBF24] text-xl md:text-3xl">
                      {foundCustomer.points} pontos
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Back Button */}
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => setCurrentScreen('home')}
          >
            VOLTAR
          </Button>
        </div>
      </div>
    </div>
  );
}