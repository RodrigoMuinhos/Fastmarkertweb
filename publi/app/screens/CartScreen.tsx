import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Badge } from '../components/fastmarket/Badge';
import { Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';

export function CartScreen() {
  const { cart, cartTotal, removeFromCart, updateQuantity, setCurrentScreen } = useFastMarket();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pointsToEarn = Math.floor(cartTotal * 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="py-4 px-4 md:py-6 md:px-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10"
      >
        <Logo size="md" />
      </motion.div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-72 md:pb-56">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          {/* Header with icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-7 h-7 md:w-9 md:h-9 text-green-600" />
              <h1 className="font-bold text-gray-800 text-xl md:text-3xl">
                Resumo do Pedido
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base ml-10 md:ml-12">
              Revise seus itens antes de finalizar
            </p>
          </motion.div>

          {/* Cart Items with animations */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="bg-white rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Product Image - PEQUENA */}
                  {item.product.image && (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info Compacta */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                      <span>R$ {item.product.price.toFixed(2)}</span>
                      <span>•</span>
                      <Badge variant="info" className="text-xs">
                        {item.quantity} {item.quantity === 1 ? 'unidade' : 'unidades'}
                      </Badge>
                    </div>
                    <p className="font-bold text-green-600 text-base md:text-lg mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Botão Delete - Compacto */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 md:p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Fixo - Sempre Visível - ADAPTATIVO */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-20"
      >
        <div className="max-w-7xl mx-auto p-3 md:p-4 lg:p-6">
          {/* Resumo Compacto - Layout Adaptativo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            {/* Info do Total */}
            <div className="flex-shrink-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'} • {pointsToEarn} pts Fast+
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                R$ {cartTotal.toFixed(2)}
              </p>
            </div>
            
            {/* Botões - Adaptativo por orientação */}
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Botão Voltar - Visível em mobile */}
              <button
                onClick={() => setCurrentScreen('products')}
                className="sm:hidden text-sm text-gray-600 hover:text-gray-800 font-medium py-2"
              >
                ← Voltar
              </button>
              
              {/* Botão Pagamento - Responsivo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen('fastplus-optional')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-12 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl whitespace-nowrap"
              >
                <span>PAGAMENTO</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.button>
            </div>
          </div>
          
          {/* Botão Voltar - Desktop/Landscape */}
          <button
            onClick={() => setCurrentScreen('products')}
            className="hidden sm:block text-xs md:text-sm text-gray-500 hover:text-gray-700 font-medium w-full text-center mt-3"
          >
            ← Voltar para produtos
          </button>
        </div>
      </motion.div>
    </div>
  );
}