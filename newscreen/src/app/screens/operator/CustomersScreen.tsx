import React, { useState } from 'react';
import { Logo } from '../../components/fastmarket/Logo';
import { Button } from '../../components/fastmarket/Button';
import { Card } from '../../components/fastmarket/Card';
import { Input } from '../../components/fastmarket/Input';
import { ArrowLeft, Search, Award } from 'lucide-react';
import { useFastMarket } from '../../context/FastMarketContext';
import { maskCpf, maskPhone } from '../../utils/lgpd';

export function CustomersScreen() {
  const { customers, setCurrentScreen } = useFastMarket();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cpf.includes(searchTerm) ||
      customer.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-4 px-4 md:py-8 md:px-16 border-b border-gray-200 flex items-center gap-2 md:gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentScreen('operator-dashboard')}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        <Logo size="md" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 lg:p-16 overflow-auto">
        <h1 className="mb-4 md:mb-8 font-bold text-[#1F2937] text-xl md:text-2xl">Clientes Fast+</h1>

        {/* Search */}
        <div className="mb-6 md:mb-8 max-w-2xl">
          <Input
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Customers List */}
        <div className="space-y-3 md:space-y-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <h3 className="font-semibold text-[#1F2937] mb-2 text-sm md:text-base">
                    {customer.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-xs md:text-sm text-[#717182]">
                    <span>CPF: {maskCpf(customer.cpf)}</span>
                    <span>Tel: {maskPhone(customer.phone)}</span>
                  </div>
                </div>

                <div className="bg-[#FBBF24]/10 rounded-lg px-4 py-3 md:px-6 md:py-4 text-center flex-shrink-0">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-[#FBBF24]" />
                    <span className="text-xs md:text-sm text-[#717182]">Pontos</span>
                  </div>
                  <p className="font-bold text-[#FBBF24] text-base md:text-lg">
                    {customer.points}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#717182] text-sm md:text-base">Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}