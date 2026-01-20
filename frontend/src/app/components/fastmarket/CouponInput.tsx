import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, X, Check, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface CouponInputProps {
  onApply: (code: string) => boolean;
  onRemove: () => void;
  appliedCoupon: { code: string; discount: number } | null;
}

export function CouponInput({ onApply, onRemove, appliedCoupon }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    if (!code.trim()) {
      setError('Digite um código');
      return;
    }

    const success = onApply(code);
    
    if (success) {
      setCode('');
      setError('');
      setIsExpanded(false);
    } else {
      setError('Cupom inválido');
    }
  };

  const handleRemove = () => {
    onRemove();
    setCode('');
    setError('');
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Tag className="w-5 h-5 text-purple-600" />
          </motion.div>
          <h3 className="font-bold text-purple-800 text-sm">Cupom de Desconto</h3>
        </div>

        {!appliedCoupon && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700"
          >
            {isExpanded ? 'Fechar' : 'Tenho cupom'}
          </button>
        )}
      </div>

      {/* Applied Coupon */}
      <AnimatePresence>
        {appliedCoupon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-100 border-2 border-green-500 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-bold text-green-800 text-sm">
                  {appliedCoupon.code}
                </p>
                <p className="text-xs text-green-700">
                  {appliedCoupon.discount}% de desconto aplicado!
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-green-200 hover:bg-green-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-green-700" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Form */}
      <AnimatePresence>
        {isExpanded && !appliedCoupon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError('');
                  }}
                  placeholder="Digite o código"
                  className={`w-full px-4 py-3 rounded-lg border-2 font-bold text-sm uppercase focus:outline-none transition-all ${
                    error
                      ? 'border-red-400 bg-red-50'
                      : 'border-purple-300 focus:border-purple-500 bg-white'
                  }`}
                  maxLength={15}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-1 ml-1"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleApply}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="w-4 h-4" />
                APLICAR CUPOM
              </Button>

              {/* Cupons Disponíveis */}
              <div className="bg-white/50 rounded-lg p-2">
                <p className="text-xs text-purple-700 font-semibold mb-1">Cupons disponíveis:</p>
                <div className="flex flex-wrap gap-1">
                  {['PRIMEIRA10', 'FAST15', 'COMBO20', 'VIP25'].map((couponCode) => (
                    <button
                      key={couponCode}
                      onClick={() => setCode(couponCode)}
                      className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded font-mono transition-colors"
                    >
                      {couponCode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
