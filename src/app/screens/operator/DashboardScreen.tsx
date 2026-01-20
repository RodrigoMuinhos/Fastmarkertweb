import React from 'react';
import { Logo } from '../../components/fastmarket/Logo';
import { Button } from '../../components/fastmarket/Button';
import { Card } from '../../components/fastmarket/Card';
import { DollarSign, ShoppingBag, TrendingUp, Package, Users, FileText, LogOut } from 'lucide-react';
import { useFastMarket } from '../../context/FastMarketContext';

export function DashboardScreen() {
  const { sales, setCurrentScreen, setIsOperatorMode } = useFastMarket();

  const todaySales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageTicket = todaySales > 0 ? totalRevenue / todaySales : 0;

  const handleLogout = () => {
    setIsOperatorMode(false);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-4 px-4 md:py-8 md:px-16 border-b border-gray-200 flex items-center justify-between">
        <Logo size="md" />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 lg:p-16 overflow-auto">
        <h1 className="mb-6 md:mb-8 font-bold text-[#1F2937] text-xl md:text-2xl">Dashboard Operador</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#717182] mb-1 md:mb-2 text-xs md:text-sm">Vendas do Dia</p>
                <p className="font-bold text-[#1F2937] text-xl md:text-2xl">{todaySales}</p>
              </div>
              <div className="bg-[#22C55E]/10 p-2 md:p-3 rounded-lg">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#22C55E]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#717182] mb-1 md:mb-2 text-xs md:text-sm">Total Faturado</p>
                <p className="font-bold text-[#1F2937] text-xl md:text-2xl">
                  R$ {totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#FBBF24]/10 p-2 md:p-3 rounded-lg">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#FBBF24]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#717182] mb-1 md:mb-2 text-xs md:text-sm">Ticket Médio</p>
                <p className="font-bold text-[#1F2937] text-xl md:text-2xl">
                  R$ {averageTicket.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#1F2937]/10 p-2 md:p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#1F2937]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Menu */}
        <h2 className="mb-4 md:mb-6 font-semibold text-[#1F2937] text-lg md:text-xl">Menu Operador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card hover onClick={() => setCurrentScreen('operator-products')}>
            <div className="flex flex-col items-center text-center py-6 md:py-8">
              <div className="bg-[#22C55E]/10 rounded-full p-4 md:p-6 mb-3 md:mb-4">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-[#22C55E]" />
              </div>
              <span className="font-semibold text-[#1F2937] text-sm md:text-base">Produtos</span>
            </div>
          </Card>

          <Card hover onClick={() => setCurrentScreen('operator-customers')}>
            <div className="flex flex-col items-center text-center py-6 md:py-8">
              <div className="bg-[#FBBF24]/10 rounded-full p-4 md:p-6 mb-3 md:mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-[#FBBF24]" />
              </div>
              <span className="font-semibold text-[#1F2937] text-sm md:text-base">Clientes</span>
            </div>
          </Card>

          <Card hover onClick={() => setCurrentScreen('operator-reports')}>
            <div className="flex flex-col items-center text-center py-6 md:py-8">
              <div className="bg-[#1F2937]/10 rounded-full p-4 md:p-6 mb-3 md:mb-4">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#1F2937]" />
              </div>
              <span className="font-semibold text-[#1F2937] text-sm md:text-base">Relatórios</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}