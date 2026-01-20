import React, { useState, useEffect } from 'react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Card } from '../components/fastmarket/Card';
import { CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';

type PaymentStatus = 'waiting' | 'processing' | 'approved' | 'declined';

export function CardMachineScreen() {
  const { cartTotal, completeSale, setCurrentScreen } = useFastMarket();
  const [status, setStatus] = useState<PaymentStatus>('waiting');
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'credit'>('debit');

  useEffect(() => {
    // Pega o método de pagamento da query/state
    const urlParams = new URLSearchParams(window.location.search);
    const method = urlParams.get('method') as 'debit' | 'credit';
    if (method) {
      setPaymentMethod(method);
    }
  }, []);

  useEffect(() => {
    // Simula o fluxo da SDK da maquininha
    if (status === 'waiting') {
      // Aguarda 2 segundos antes de começar o processamento
      const waitTimer = setTimeout(() => {
        setStatus('processing');
      }, 2000);
      return () => clearTimeout(waitTimer);
    }

    if (status === 'processing') {
      // Simula processamento de 3-5 segundos
      const processTimer = setTimeout(() => {
        // 90% de chance de aprovação (simulação)
        const approved = Math.random() > 0.1;
        setStatus(approved ? 'approved' : 'declined');
      }, 4000);
      return () => clearTimeout(processTimer);
    }

    if (status === 'approved') {
      // Aguarda 2 segundos e redireciona
      const approvedTimer = setTimeout(() => {
        completeSale(paymentMethod);
        setCurrentScreen('confirmation');
      }, 2000);
      return () => clearTimeout(approvedTimer);
    }
  }, [status, paymentMethod, completeSale, setCurrentScreen]);

  const handleCancel = () => {
    setCurrentScreen('payment');
  };

  const handleRetry = () => {
    setStatus('waiting');
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
          <Card>
            <div className="p-8 md:p-12 flex flex-col items-center">
              {/* Ícone da Maquininha */}
              <div className="mb-8">
                {status === 'waiting' || status === 'processing' ? (
                  <div className="relative">
                    <CreditCard className="w-24 h-24 md:w-32 md:h-32 text-[#22C55E]" />
                    {status === 'processing' && (
                      <Loader2 className="w-8 h-8 md:w-12 md:h-12 text-[#22C55E] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                    )}
                  </div>
                ) : status === 'approved' ? (
                  <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-[#22C55E]" />
                ) : (
                  <XCircle className="w-24 h-24 md:w-32 md:h-32 text-[#E53935]" />
                )}
              </div>

              {/* Título */}
              <h1 className="mb-4 font-bold text-[#1F2937] text-xl md:text-2xl text-center">
                {status === 'waiting' && 'Aguardando Maquininha...'}
                {status === 'processing' && 'Processando Pagamento'}
                {status === 'approved' && 'Pagamento Aprovado!'}
                {status === 'declined' && 'Pagamento Recusado'}
              </h1>

              {/* Subtítulo */}
              <p className="mb-8 text-sm md:text-base text-[#717182] text-center max-w-md">
                {status === 'waiting' &&
                  'Conectando com a maquininha de cartão. Por favor, aguarde...'}
                {status === 'processing' &&
                  'Processando o pagamento com a operadora. Não remova o cartão.'}
                {status === 'approved' && 'Sua transação foi aprovada com sucesso!'}
                {status === 'declined' &&
                  'Não foi possível processar o pagamento. Tente novamente ou use outro cartão.'}
              </p>

              {/* Total */}
              <div className="w-full mb-8">
                <div className="bg-[#F5F7FA] rounded-lg p-4 md:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-medium text-[#1F2937]">
                      Valor
                    </span>
                    <span className="font-bold text-[#1F2937] text-xl md:text-3xl">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm md:text-base text-[#717182]">Método</span>
                    <span className="text-sm md:text-base font-medium text-[#1F2937]">
                      {paymentMethod === 'debit' ? 'Débito' : 'Crédito'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Visual */}
              {(status === 'waiting' || status === 'processing') && (
                <div className="w-full mb-8">
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              )}

              {/* Instruções */}
              {status === 'waiting' && (
                <div className="w-full mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm md:text-base text-blue-900 text-center">
                    <strong>Aguarde:</strong> A maquininha está sendo preparada para o
                    pagamento
                  </p>
                </div>
              )}

              {status === 'processing' && (
                <div className="w-full mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm md:text-base text-yellow-900 text-center">
                    <strong>Atenção:</strong> Mantenha o cartão próximo à maquininha
                  </p>
                </div>
              )}

              {/* Botões */}
              <div className="w-full flex flex-col sm:flex-row gap-3 md:gap-4">
                {(status === 'waiting' || status === 'processing') && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    CANCELAR
                  </Button>
                )}

                {status === 'declined' && (
                  <>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      VOLTAR
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleRetry}
                      className="flex-1"
                    >
                      TENTAR NOVAMENTE
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
