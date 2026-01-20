import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { ShoppingCart, Award, Sparkles, TrendingUp, Package, ChevronRight, Flame } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import { getCategoryConfig } from '../utils/categoryIcons';
import { toast } from 'sonner';

export function HomeScreen() {
  const { products, setCurrentScreen, addToCart, setSelectedCategory } = useFastMarket();

  const handleLogoLongPress = () => {
    setCurrentScreen('operator-login');
  };

  // Filtrar produtos
  const featuredCombos = products.filter(p => p.featured && p.category === 'Combos').slice(0, 3);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 6);
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleQuickAdd = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} adicionado!`, {
      duration: 1500,
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-4 px-4 md:py-6 md:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20"
      >
        <Logo size="md" onLongPress={handleLogoLongPress} />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
          
          {/* Hero Section - Compacto em landscape */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-4 sm:mb-6 landscape:mb-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-2 sm:mb-3"
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Bem-vindo ao FastMarket
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Escolha o que deseja e finalize seu pedido rapidamente
            </p>
          </motion.div>

          {/* Botão Principal - Adaptativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentScreen('products')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl shadow-xl py-5 sm:py-6 md:py-8 landscape:py-4 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold relative z-10">VER TODOS OS PRODUTOS</span>
            </motion.button>
          </motion.div>

          {/* Combos em Destaque */}
          {featuredCombos.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Combos em Destaque</h2>
                </div>
                <button
                  onClick={() => setCurrentScreen('products')}
                  className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                >
                  Ver todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredCombos.map((combo, index) => (
                  <motion.div
                    key={combo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-4 border-2 border-purple-200 cursor-pointer group relative overflow-hidden"
                    onClick={() => {
                      setSelectedCategory('Combos');
                      setCurrentScreen('products');
                    }}
                  >
                    {/* Badge Combo */}
                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      COMBO
                    </div>

                    {/* Imagem */}
                    {combo.image && (
                      <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={combo.image}
                          alt={combo.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Info */}
                    <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {combo.description}
                    </p>

                    {/* Preço e Botão */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">
                        R$ {combo.price.toFixed(2)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory('Combos');
                          setCurrentScreen('products');
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Mais Vendidos */}
          {bestSellers.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Mais Vendidos</h2>
                </div>
                <button
                  onClick={() => setCurrentScreen('products')}
                  className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                >
                  Ver todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {bestSellers.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-3 cursor-pointer group relative"
                    onClick={() => {
                      setSelectedCategory('Todos');
                      setCurrentScreen('products');
                    }}
                  >
                    {/* Badge Mais Vendido */}
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      TOP
                    </div>

                    {/* Imagem */}
                    {product.image && (
                      <div className="w-full h-20 mb-2 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Info */}
                    <h3 className="font-bold text-gray-800 text-xs mb-1 line-clamp-2 min-h-[2rem]">
                      {product.name}
                    </h3>

                    {/* Preço */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-500 rounded-full p-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory('Todos');
                          setCurrentScreen('products');
                        }}
                      >
                        <ShoppingCart className="w-3 h-3 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Categorias */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Categorias</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {categories.map((category, index) => {
                const config = getCategoryConfig(category);
                const Icon = config.icon;
                
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentScreen('products');
                    }}
                    className={`${config.bgColor} rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-all border-2 border-transparent hover:border-gray-300`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`${config.color} font-semibold text-xs text-center line-clamp-2`}>
                      {category}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>

          {/* Fast+ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentScreen('fastplus-query')}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-xl shadow-lg py-5 flex items-center justify-center gap-3"
            >
              <Award className="w-6 h-6" />
              <span className="font-bold text-lg">CONSULTAR PROGRAMA FAST+</span>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}