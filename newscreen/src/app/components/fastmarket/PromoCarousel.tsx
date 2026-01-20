import React from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';

const promos = [
  {
    id: 1,
    title: 'Promoção Especial',
    subtitle: 'Até 50% OFF em produtos selecionados',
    image: 'https://images.unsplash.com/photo-1762417420647-45a4401b38f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsJTIwb2ZmZXIlMjBwcm9tb3Rpb258ZW58MXx8fHwxNzY4NTUzNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    title: 'Super Desconto',
    subtitle: 'Compre mais, economize mais!',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlJTIwZGlzY291bnQlMjBzaG9wcGluZ3xlbnwxfHx8fDE3Njg0NzUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Produtos Frescos',
    subtitle: 'Qualidade e frescor garantidos',
    image: 'https://images.unsplash.com/photo-1606836484371-483e90c5d19a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZvb2QlMjBtYXJrZXR8ZW58MXx8fHwxNzY4NTgxMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-green-500 to-emerald-500'
  }
];

export function PromoCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  return (
    <div className="w-full mb-6 md:mb-8 overflow-hidden rounded-2xl shadow-2xl">
      <Slider {...settings}>
        {promos.map((promo, index) => (
          <div key={promo.id}>
            <div className="relative h-32 md:h-48 lg:h-64 overflow-hidden">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${promo.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.color} opacity-60`} />
              
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="relative h-full flex flex-col items-center justify-center text-center p-4 md:p-8"
              >
                <motion.h2
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg"
                >
                  {promo.title}
                </motion.h2>
                <p className="text-base md:text-xl lg:text-2xl text-white font-semibold drop-shadow-md">
                  {promo.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}