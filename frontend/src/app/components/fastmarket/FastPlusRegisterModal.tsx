import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Star, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from './Button';

interface FastPlusRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export function FastPlusRegisterModal({ isOpen, onClose, onRegister }: FastPlusRegisterModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header com Gradiente */}
              <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 p-8 text-center relative overflow-hidden">
                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"
                />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-xl relative z-10"
                >
                  <Gift className="w-10 h-10 text-yellow-500" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                  </motion.div>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">
                  Você precisa estar cadastrado!
                </h2>
                <p className="text-white/90 text-sm md:text-base relative z-10">
                  Faça seu cadastro para resgatar prêmios incríveis
                </p>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Benefits */}
                <div className="space-y-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Cadastro Rápido</h3>
                      <p className="text-sm text-gray-600">Apenas CPF e telefone. Leva menos de 1 minuto!</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Ganhe Pontos</h3>
                      <p className="text-sm text-gray-600">R$ 1,00 = 10 pontos em todas as compras</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Prêmios Exclusivos</h3>
                      <p className="text-sm text-gray-600">Troque pontos por cafés, lanches, descontos e mais!</p>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 mb-6 border-2 border-yellow-400/30"
                >
                  <p className="text-center text-sm text-gray-700">
                    <span className="font-bold text-yellow-600">✨ É grátis!</span> Comece a acumular pontos agora mesmo.
                  </p>
                </motion.div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="accent"
                    size="lg"
                    fullWidth
                    onClick={onRegister}
                  >
                    FAZER CADASTRO
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={onClose}
                  >
                    Agora Não
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
