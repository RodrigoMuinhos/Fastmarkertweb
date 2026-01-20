import React from 'react';
import { Logo } from '../../components/fastmarket/Logo';
import { Button } from '../../components/fastmarket/Button';
import { Card } from '../../components/fastmarket/Card';
import { ArrowLeft, DollarSign, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useFastMarket } from '../../context/FastMarketContext';

export function ReportsScreen() {
  const { sales, setCurrentScreen } = useFastMarket();

  // Calculate payment method totals
  const paymentMethodTotals = sales.reduce((acc, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: Smartphone, color: 'text-[#22C55E]' },
    { id: 'debit', name: 'Débito', icon: CreditCard, color: 'text-[#1F2937]' },
    { id: 'credit', name: 'Crédito', icon: CreditCard, color: 'text-[#FBBF24]' },
    { id: 'cash', name: 'Dinheiro', icon: Banknote, color: 'text-[#22C55E]' },
  ];

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

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
        <h1 className="mb-4 md:mb-8 font-bold text-[#1F2937] text-xl md:text-2xl">Relatórios</h1>

        {/* Period Filter */}
        <div className="mb-6 md:mb-8">
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs md:text-sm text-[#717182] mb-1">Período</p>
                <p className="font-semibold text-[#1F2937] text-sm md:text-base">Hoje</p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#22C55E]" />
                <div>
                  <p className="text-xs md:text-sm text-[#717182]">Total Geral</p>
                  <p className="font-bold text-[#1F2937] text-base md:text-lg">
                    R$ {totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Methods Breakdown */}
        <h2 className="mb-4 md:mb-6 font-semibold text-[#1F2937] text-lg md:text-xl">Total por Forma de Pagamento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-12">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const total = paymentMethodTotals[method.id] || 0;

            return (
              <Card key={method.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-[#F5F7FA] p-2 md:p-3 rounded-lg">
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${method.color}`} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-[#717182] mb-1">{method.name}</p>
                      <p className="font-bold text-[#1F2937] text-sm md:text-base">
                        R$ {total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Sales */}
        <h2 className="mb-4 md:mb-6 font-semibold text-[#1F2937] text-lg md:text-xl">Últimas Vendas</h2>
        <div className="space-y-3 md:space-y-4">
          {sales.slice(-10).reverse().map((sale) => (
            <Card key={sale.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1F2937] mb-1 text-sm md:text-base">
                    {sale.items.length} {sale.items.length === 1 ? 'item' : 'itens'}
                  </p>
                  <p className="text-xs md:text-sm text-[#717182]">
                    {new Date(sale.timestamp).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1F2937] mb-1 text-sm md:text-base">
                    R$ {sale.total.toFixed(2)}
                  </p>
                  <p className="text-xs md:text-sm text-[#717182] capitalize">
                    {sale.paymentMethod}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {sales.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#717182] text-sm md:text-base">Nenhuma venda registrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}