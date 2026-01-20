import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from './Button';

interface InactivityWarningModalProps {
  isOpen: boolean;
  onContinue: () => void;
  countdown: number;
}

export function InactivityWarningModal({ isOpen, onContinue, countdown }: InactivityWarningModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block mb-3"
                >
                  <AlertCircle className="w-16 h-16 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">
                  Ainda está aí?
                </h2>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <p className="text-gray-700 text-lg mb-4">
                  Detectamos que você está inativo há algum tempo.
                </p>
                
                {/* Countdown Circle */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#F59E0B"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ 
                        strokeDashoffset: (2 * Math.PI * 56) * (1 - countdown / 30)
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      key={countdown}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <p className="text-4xl font-bold text-gray-800">{countdown}</p>
                      <p className="text-xs text-gray-500">segundos</p>
                    </motion.div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Seu pedido será cancelado automaticamente se não houver interação.
                </p>

                {/* Botão */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={onContinue}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  SIM, ESTOU AQUI!
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
