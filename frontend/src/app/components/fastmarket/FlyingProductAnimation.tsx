import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

interface FlyingItem {
  id: string;
  image?: string;
  name: string;
  startX: number;
  startY: number;
}

interface FlyingProductAnimationProps {
  items: FlyingItem[];
  onComplete: (id: string) => void;
}

export function FlyingProductAnimation({ items, onComplete }: FlyingProductAnimationProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {items.map((item) => (
          <FlyingProduct key={item.id} item={item} onComplete={onComplete} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FlyingProduct({ item, onComplete }: { item: FlyingItem; onComplete: (id: string) => void }) {
  const [cartPosition, setCartPosition] = useState({ x: window.innerWidth - 100, y: 20 });

  useEffect(() => {
    // Atualiza posição do carrinho (canto superior direito)
    const updateCartPosition = () => {
      const isMobile = window.innerWidth < 768;
      setCartPosition({
        x: window.innerWidth - (isMobile ? 60 : 100),
        y: isMobile ? window.innerHeight - 60 : 20
      });
    };

    updateCartPosition();
    window.addEventListener('resize', updateCartPosition);
    return () => window.removeEventListener('resize', updateCartPosition);
  }, []);

  return (
    <motion.div
      initial={{
        x: item.startX,
        y: item.startY,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: cartPosition.x,
        y: cartPosition.y,
        scale: 0.3,
        opacity: 0.8,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96], // easeInOutQuart
      }}
      onAnimationComplete={() => onComplete(item.id)}
      className="absolute"
      style={{
        width: '80px',
        height: '80px',
      }}
    >
      <div className="relative w-full h-full">
        {/* Imagem do Produto */}
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl shadow-2xl border-4 border-white"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-2xl border-4 border-white flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
        )}

        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-green-400 rounded-xl blur-lg -z-10"
        />
      </div>
    </motion.div>
  );
}

// Hook para usar a animação
export function useFlyingProduct() {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  const addFlyingProduct = (product: { id: string; name: string; image?: string }, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const newItem: FlyingItem = {
      id: `${product.id}-${Date.now()}`,
      image: product.image,
      name: product.name,
      startX: rect.left + rect.width / 2 - 40,
      startY: rect.top + rect.height / 2 - 40,
    };

    setFlyingItems(prev => [...prev, newItem]);
  };

  const removeFlyingProduct = (id: string) => {
    setFlyingItems(prev => prev.filter(item => item.id !== id));
  };

  return {
    flyingItems,
    addFlyingProduct,
    FlyingAnimation: () => (
      <FlyingProductAnimation items={flyingItems} onComplete={removeFlyingProduct} />
    ),
  };
}
