import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Card } from '../components/fastmarket/Card';
import { PartnersCarousel } from '../components/fastmarket/PartnersCarousel';
import { CheckCircle, Printer, Send, Star, Sparkles, PartyPopper } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import { Modal } from '../components/fastmarket/Modal';

// Componente de Confete Animado
function Confetti() {
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ['#22C55E', '#FBBF24', '#3B82F6', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: piece.rotation * 4,
            opacity: 0
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
}

export function ConfirmationScreen() {
  const { currentSale, currentCustomer, setCurrentScreen, setCurrentCustomer } = useFastMarket();
  const [showReceipt, setShowReceipt] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSendingWhatsapp, setIsSendingWhatsapp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Mostra confete por 4 segundos
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setCurrentCustomer(null);
    setCurrentScreen('home');
  };

  const handlePrintReceipt = () => {
    setShowReceipt(true);
  };

  const handleStartPrint = () => {
    setIsPrinting(true);
    
    setTimeout(() => {
      setIsPrinting(false);
      setShowReceipt(false);
    }, 3000);
  };

  const handleSendWhatsapp = () => {
    if (!phoneNumber) {
      alert('Por favor, digite um número de telefone');
      return;
    }

    setIsSendingWhatsapp(true);

    setTimeout(() => {
      setIsSendingWhatsapp(false);
      setShowWhatsappModal(false);
      setPhoneNumber('');
    }, 3000);
  };

  const shouldShowPointsQuestion = !currentCustomer && currentSale && !currentSale.customerId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="py-4 px-4 md:py-6 md:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <Logo size="md" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-auto">
        <div className="max-w-2xl w-full">
          {/* Success Icon - Animado */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl"
              >
                <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={3} />
              </motion.div>
              
              {/* Sparkles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-1 -left-2"
              >
                <PartyPopper className="w-7 h-7 text-purple-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 font-bold text-gray-800 text-2xl md:text-3xl text-center"
          >
            Pagamento Aprovado!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-center mb-6 md:mb-8"
          >
            Sua compra foi realizada com sucesso 🎉
          </motion.p>

          {/* Receipt Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="mb-6 shadow-xl border-2 border-gray-200">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="font-bold text-gray-800 text-lg md:text-xl">
                    Resumo da Compra
                  </h2>
                </div>

                {/* Items */}
                <div className="border-b border-gray-200 pb-4 mb-4 space-y-2">
                  {currentSale?.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex justify-between"
                    >
                      <span className="text-sm md:text-base text-gray-600">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-gray-800">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-4 mb-4 border-2 border-green-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <span className="font-bold text-green-600 text-2xl md:text-3xl">
                      R$ {currentSale?.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Pagamento:{' '}
                    <span className="font-semibold text-gray-800">
                      {currentSale?.paymentMethod === 'pix'
                        ? 'PIX'
                        : currentSale?.paymentMethod === 'debit'
                        ? 'Débito'
                        : currentSale?.paymentMethod === 'credit'
                        ? 'Crédito'
                        : 'Dinheiro'}
                    </span>
                  </div>
                </motion.div>

                {/* Fast+ Points - Se tiver cliente logado */}
                {currentCustomer && currentSale?.pointsEarned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                      <span className="font-bold text-gray-800">
                        Pontos Fast+ Ganhos
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600 mb-1">
                      +{currentSale.pointsEarned} pontos
                    </p>
                    <p className="text-sm text-gray-600">
                      Saldo total: <span className="font-semibold">{currentCustomer.points + currentSale.pointsEarned} pontos</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Ações */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handlePrintReceipt}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 md:py-4 px-6 rounded-xl shadow-lg border-2 border-gray-300 hover:border-green-400 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">IMPRIMIR NOTA</span>
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => setShowWhatsappModal(true)}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 md:py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">ENVIAR NO WHATSAPP</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Pergunta sobre pontos - Se NÃO tiver cliente logado */}
          {shouldShowPointsQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Card className="mb-6 border-2 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-50 to-amber-50">
                <div className="p-6 md:p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-4"
                  >
                    <Star className="w-16 h-16 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                  <h3 className="font-bold text-gray-800 mb-2 text-xl md:text-2xl">
                    Quer acumular pontos?
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-6">
                    Com o Fast+ você acumula pontos em cada compra e troca por prêmios incríveis!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setCurrentScreen('fastplus-register')}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                    >
                      CADASTRAR AGORA
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleFinish}
                      className="flex-1"
                    >
                      NÃO, OBRIGADO
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Botão Finalizar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinish}
              className="w-full mb-8"
            >
              FINALIZAR
            </Button>
          </motion.div>

          {/* Partners Carousel - PUBLICIDADE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <PartnersCarousel />
          </motion.div>
        </div>
      </div>

      {/* Modal WhatsApp */}
      <Modal
        isOpen={showWhatsappModal}
        onClose={() => !isSendingWhatsapp && setShowWhatsappModal(false)}
        title={isSendingWhatsapp ? "" : "Enviar Nota por WhatsApp"}
        maxWidth="max-w-lg"
        noPadding={isSendingWhatsapp}
      >
        {isSendingWhatsapp ? (
          <div className="p-12 md:p-16 bg-white text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Send className="w-20 h-20 md:w-24 md:h-24 text-[#25D366]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
            
            <h2 className="font-bold text-gray-800 text-xl md:text-2xl mb-3">
              Aguarde...
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-2">
              Enviando nota para o WhatsApp
            </p>
            
            <div className="flex items-center justify-center gap-1 mt-6">
              <div className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Digite o número de telefone com DDD:
            </p>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-lg mb-4 text-base md:text-lg focus:border-green-500 focus:outline-none"
              maxLength={15}
            />
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowWhatsappModal(false)}
                className="flex-1"
              >
                CANCELAR
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSendWhatsapp}
                className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]"
              >
                ENVIAR
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Comprovante de Pagamento */}
      <Modal
        isOpen={showReceipt}
        onClose={() => !isPrinting && setShowReceipt(false)}
        title={isPrinting ? "" : "Comprovante de Pagamento"}
        maxWidth="max-w-lg"
        noPadding
      >
        {isPrinting ? (
          <div className="p-12 md:p-16 bg-white text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Printer className="w-20 h-20 md:w-24 md:h-24 text-green-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
            
            <h2 className="font-bold text-gray-800 text-xl md:text-2xl mb-3">
              Aguarde...
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-2">
              Seu recibo está sendo gerado
            </p>
            
            <div className="flex items-center justify-center gap-1 mt-6">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 bg-white" id="receipt-content">
            {/* Logo e Cabeçalho */}
            <div className="text-center mb-6 pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex justify-center mb-3">
                <Logo size="sm" />
              </div>
              <h2 className="font-bold text-gray-800 text-lg mb-1">FASTMARKET</h2>
              <p className="text-xs text-gray-600">Posto de Conveniência</p>
              <p className="text-xs text-gray-600">CNPJ: 00.000.000/0001-00</p>
            </div>

            {/* Informações da Venda */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nota Fiscal:</span>
                <span className="font-semibold text-gray-800">{currentSale?.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data:</span>
                <span className="font-semibold text-gray-800">
                  {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Horário:</span>
                <span className="font-semibold text-gray-800">
                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {currentCustomer && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-semibold text-gray-800">{currentCustomer.name}</span>
                </div>
              )}
            </div>

            {/* Itens Comprados */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase border-b border-gray-200 pb-2">
                Itens Comprados
              </h3>
              <div className="space-y-2">
                {currentSale?.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">
                          {item.quantity}x {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          R$ {item.product.price.toFixed(2)} cada
                        </p>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    {index < currentSale.items.length - 1 && (
                      <div className="border-b border-gray-100 mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Totais */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-800">
                  R$ {currentSale?.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-800 text-lg">TOTAL:</span>
                <span className="font-bold text-green-600 text-2xl">
                  R$ {currentSale?.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="mb-6 p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 text-sm">Forma de Pagamento:</span>
                <span className="font-bold text-gray-800 uppercase">
                  {currentSale?.paymentMethod === 'pix'
                    ? 'PIX'
                    : currentSale?.paymentMethod === 'debit'
                    ? 'CARTÃO DÉBITO'
                    : currentSale?.paymentMethod === 'credit'
                    ? 'CARTÃO CRÉDITO'
                    : 'DINHEIRO'}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600 font-semibold">PAGAMENTO APROVADO</span>
                </div>
              </div>
            </div>

            {/* Fast+ Points */}
            {currentCustomer && currentSale?.pointsEarned && (
              <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  <span className="font-bold text-gray-800 text-sm">PROGRAMA FAST+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pontos Ganhos:</span>
                  <span className="font-bold text-yellow-600 text-lg">
                    +{currentSale.pointsEarned} pontos
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-600">Saldo Total:</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {currentCustomer.points + currentSale.pointsEarned} pontos
                  </span>
                </div>
              </div>
            )}

            {/* Rodapé */}
            <div className="text-center pt-6 border-t-2 border-dashed border-gray-300">
              <p className="text-xs text-gray-600 mb-2">Obrigado pela preferência!</p>
              <p className="text-xs text-gray-600">Volte sempre!</p>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowReceipt(false)}
                className="flex-1"
              >
                FECHAR
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartPrint}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                IMPRIMIR
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}