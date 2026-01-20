import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Leaf, Wheat, Milk, Check } from 'lucide-react';
import { Product } from '@/app/context/FastMarketContext';
import { Button } from './Button';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailsModal({ product, isOpen, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  // Default description if not provided
  const description = product.description || 'Produto de qualidade premium, perfeito para qualquer momento do seu dia.';

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

          {/* Modal - Slide from bottom */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Product Image */}
              <div className="h-64 md:h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Sem imagem</span>
                  </div>
                )}
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl md:text-2xl font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Category Tag */}
              <div className="inline-block bg-gray-100 px-3 py-1 rounded-full mb-3">
                <span className="text-xs font-semibold text-gray-600 uppercase">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h2>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Descrição
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Dietary Information - ANVISA */}
              {product.dietary && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Informações Nutricionais
                  </h3>
                  
                  {/* Apenas ícones - sem texto */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.dietary.hasGluten && (
                      <div className="bg-gray-200 px-3 py-2 rounded-lg flex items-center justify-center">
                        <Wheat className="w-5 h-5 text-gray-700" />
                      </div>
                    )}

                    {product.dietary.hasLactose && (
                      <div className="bg-gray-200 px-3 py-2 rounded-lg flex items-center justify-center">
                        <Milk className="w-5 h-5 text-gray-700" />
                      </div>
                    )}

                    {product.dietary.isVegan && (
                      <div className="bg-green-100 px-3 py-2 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                    )}

                    {product.dietary.isVegetarian && !product.dietary.isVegan && (
                      <div className="bg-green-100 px-3 py-2 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ANVISA Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>ANVISA:</strong> As informações nutricionais são declaradas pelo fabricante e podem sofrer alterações.
                </p>
              </div>
            </div>

            {/* Footer - Add to Cart Button */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
              >
                + ADICIONAR AO CARRINHO
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}