import React from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import { ExternalLink } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import '@/styles/slick-custom.css';

interface Partner {
  id: string;
  name: string;
  logo: string;
  tagline: string;
}

const partners: Partner[] = [
  {
    id: 'p1',
    name: 'Shell',
    logo: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tagline: 'Combustível de qualidade'
  },
  {
    id: 'p2',
    name: 'Coca-Cola',
    logo: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tagline: 'Abra a felicidade'
  },
  {
    id: 'p3',
    name: 'Nestlé',
    logo: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tagline: 'Good food, good life'
  },
  {
    id: 'p4',
    name: 'PepsiCo',
    logo: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tagline: 'Snacks e bebidas'
  },
  {
    id: 'p5',
    name: 'Ambev',
    logo: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tagline: 'Sempre presente'
  },
];

export function PartnersCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 py-6 border-t border-gray-200">
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
          Marcas Parceiras
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-16"></div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-16"></div>
        </div>
      </div>

      {/* Carousel */}
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={partner.id} className="px-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-28 flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Logo */}
              <div className="relative w-full h-16 mb-2 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              
              {/* Tagline */}
              <p className="text-xs text-gray-500 text-center line-clamp-1">
                {partner.tagline}
              </p>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Footer Text */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-400">
          Anuncie sua marca aqui • Fale conosco
        </p>
      </div>
    </div>
  );
}
