import React, { useState } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import { Gift, Star, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useFastMarket } from '@/app/context/FastMarketContext';
import { FastPlusRegisterModal } from './FastPlusRegisterModal';
import 'slick-carousel/slick/slick.css';
import '@/styles/slick-custom.css';

interface RewardProduct {
  id: string;
  name: string;
  points: number;
  image: string;
  description: string;
}

const rewardProducts: RewardProduct[] = [
  {
    id: 'r1',
    name: 'Café Expresso Grátis',
    points: 500,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Um café quentinho por sua conta!'
  },
  {
    id: 'r2',
    name: 'Combo Lanche',
    points: 1000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Salgado + Bebida à sua escolha'
  },
  {
    id: 'r3',
    name: 'Sorvete Premium',
    points: 800,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Sorvete artesanal de qualquer sabor'
  },
  {
    id: 'r4',
    name: 'Desconto 50% Lavagem',
    points: 1500,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Metade do preço na lavagem do carro'
  },
  {
    id: 'r5',
    name: 'Abastecimento Bonus',
    points: 2000,
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'R$ 20,00 de crédito para abastecer'
  },
];

export function FastPlusRewardsCarousel() {
  const { currentCustomer, redeemReward, setCurrentScreen } = useFastMarket();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRedeem = (reward: RewardProduct) => {
    // Verifica se tem cliente logado
    if (!currentCustomer) {
      setIsRegisterModalOpen(true);
      return;
    }

    // Verifica se tem pontos suficientes
    if (currentCustomer.points < reward.points) {
      toast.error('Pontos insuficientes!', {
        description: `Você tem ${currentCustomer.points} pontos. Faltam ${reward.points - currentCustomer.points} pontos.`,
        duration: 4000,
      });
      return;
    }

    // Resgata o prêmio
    redeemReward(reward.id, reward.points);
    
    toast.success(`🎁 ${reward.name} resgatado!`, {
      description: `${reward.points} pontos debitados. Restam ${currentCustomer.points - reward.points} pontos.`,
      duration: 4000,
    });
  };

  const handleRegister = () => {
    setIsRegisterModalOpen(false);
    setCurrentScreen('fastplus-register');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-yellow-400/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Gift className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Troque Seus Pontos Fast+
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </motion.div>
          </h3>
          <p className="text-sm text-gray-600">Resgate prêmios incríveis com seus pontos!</p>
        </div>
      </div>

      {/* Carousel */}
      <Slider {...settings}>
        {rewardProducts.map((reward, index) => (
          <div key={reward.id} className="px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-yellow-400/30"
            >
              {/* Badge de Pontos */}
              <div className="absolute top-3 right-3 z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-1"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  {reward.points} pts
                </motion.div>
              </div>

              {/* Imagem */}
              <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1 line-clamp-1">
                  {reward.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
                  {reward.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  onClick={() => handleRedeem(reward)}
                >
                  <Gift className="w-4 h-4" />
                  <span className="text-sm">Resgatar</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Footer Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          💡 <span className="font-semibold">Ganhe pontos</span> a cada compra: R$ 1,00 = 10 pontos Fast+
        </p>
      </div>

      {/* Register Modal */}
      <FastPlusRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegister}
      />
    </div>
  );
}