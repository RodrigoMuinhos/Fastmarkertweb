import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Card } from '../components/fastmarket/Card';
import { Clock } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import QRCode from 'react-qr-code';

export function PixQRCodeScreen() {
  const { cartTotal, completeSale, setCurrentScreen } = useFastMarket();
  const [timeLeft, setTimeLeft] = useState(20); // 20 segundos para aprovação automática
  const hasApprovedRef = useRef(false); // Previne aprovação múltipla

  // Gera um código PIX fictício (em produção viria do backend)
  const pixCode = `00020126580014br.gov.bcb.pix0136${Date.now()}@fastmarket.com.br52040000530398654${(cartTotal * 100).toFixed(0).padStart(10, '0')}5802BR5913FastMarket6009SAO PAULO62070503***6304${Math.random().toString(36).substring(7).toUpperCase()}`;

  // Timer de 20 segundos - Aprova automaticamente ao chegar a 0
  useEffect(() => {
    if (timeLeft === 0 && !hasApprovedRef.current) {
      // Marca como aprovado para evitar múltiplas execuções
      hasApprovedRef.current = true;
      
      // Aprova o pagamento automaticamente
      completeSale('pix');
      setCurrentScreen('confirmation');
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]); // Removido completeSale e setCurrentScreen das dependências

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <h1 className="mb-4 md:mb-6 font-bold text-[#1F2937] text-xl md:text-2xl text-center">
            Pagamento via PIX
          </h1>

          {/* Timer */}
          <div className="mb-6 md:mb-8 flex items-center justify-center gap-2 text-[#E53935]">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-lg md:text-xl font-semibold">
              Tempo restante: {formatTime(timeLeft)}
            </span>
          </div>

          {/* QR Code Card */}
          <Card className="mb-6 md:mb-8">
            <div className="p-6 md:p-12 flex flex-col items-center">
              {/* Total */}
              <div className="mb-6 md:mb-8 w-full">
                <div className="bg-[#F5F7FA] rounded-lg p-4 md:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-medium text-[#1F2937]">
                      Total a Pagar
                    </span>
                    <span className="font-bold text-[#1F2937] text-xl md:text-3xl">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6 md:mb-8">
                <QRCode
                  value={pixCode}
                  size={200}
                  className="w-full max-w-[200px] md:max-w-[256px] h-auto"
                  level="M"
                />
              </div>

              {/* Instruções */}
              <div className="text-center max-w-md">
                <p className="text-sm md:text-base text-[#717182]">
                  Abra o app do seu banco, escolha pagar com <strong>Pix QR Code</strong> e
                  escaneie o código acima
                </p>
              </div>
            </div>
          </Card>

          {/* Botão Voltar */}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setCurrentScreen('payment')}
            className="w-full"
          >
            VOLTAR
          </Button>
        </div>
      </div>
    </div>
  );
}