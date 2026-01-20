import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Badge } from '../components/fastmarket/Badge';
import { QrCode, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';

export function PaymentScreen() {
  const { cartTotal, completeSale, setCurrentScreen } = useFastMarket();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    { 
      id: 'pix', 
      name: 'PIX', 
      icon: QrCode, 
      gradient: 'from-green-500 to-emerald-600',
      description: 'Instantâneo e sem taxas'
    },
    { 
      id: 'debit', 
      name: 'Débito', 
      icon: CreditCard, 
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Pagamento à vista'
    },
    { 
      id: 'credit', 
      name: 'Crédito', 
      icon: CreditCard, 
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Parcelamento disponível'
    },
  ];

  const handleConfirm = () => {
    if (!selectedMethod) return;
    
    // Se for PIX, vai para a tela de QR Code
    if (selectedMethod === 'pix') {
      setCurrentScreen('pix-qrcode');
      return;
    }
    
    // Se for débito ou crédito, vai para a tela da maquininha
    if (selectedMethod === 'debit' || selectedMethod === 'credit') {
      setCurrentScreen('card-machine');
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="py-4 px-4 md:py-8 md:px-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      >
        <Logo size="md" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 lg:p-16 flex items-center justify-center overflow-auto">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-7 h-7 md:w-9 md:h-9 text-blue-600" />
              <h1 className="font-bold text-gray-800 text-xl md:text-3xl">
                Forma de Pagamento
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base ml-10 md:ml-12">
              Escolha como deseja pagar sua compra
            </p>
          </motion.div>

          {/* Total Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 md:p-8 mb-8 md:mb-12 shadow-2xl shadow-purple-500/30"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100 text-sm md:text-lg font-medium mb-2">
                  Total a Pagar
                </p>
                <motion.p
                  key={cartTotal}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-white text-3xl md:text-5xl"
                >
                  R$ {cartTotal.toFixed(2)}
                </motion.p>
              </div>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Wallet className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative bg-white rounded-2xl p-6 md:p-8 cursor-pointer transition-all shadow-lg border-2 ${
                      isSelected 
                        ? 'border-green-500 shadow-2xl shadow-green-500/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Selection indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col items-center text-center">
                      {/* Icon with gradient background */}
                      <motion.div
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`bg-gradient-to-br ${method.gradient} rounded-2xl p-5 md:p-6 mb-4 shadow-xl`}
                      >
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </motion.div>

                      {/* Method name */}
                      <h3 className="font-bold text-gray-800 text-lg md:text-2xl mb-2">
                        {method.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 text-xs md:text-sm">
                        {method.description}
                      </p>

                      {/* Selected badge */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4"
                          >
                            <Badge variant="success" pulse>
                              Selecionado
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setCurrentScreen('cart')}
              className="flex-1"
            >
              VOLTAR
            </Button>

            <motion.div
              className="flex-1"
              animate={!selectedMethod ? { 
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!selectedMethod}
                onClick={handleConfirm}
              >
                {selectedMethod ? 'CONFIRMAR PAGAMENTO' : 'SELECIONE UM MÉTODO'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
