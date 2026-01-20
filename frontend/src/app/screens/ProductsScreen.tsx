import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Badge } from '../components/fastmarket/Badge';
import { PromoCarousel } from '../components/fastmarket/PromoCarousel';
import { ProductDetailsModal } from '../components/fastmarket/ProductDetailsModal';
import { VirtualKeyboard } from '../components/fastmarket/VirtualKeyboard';
import { Plus, Minus, ShoppingCart, Package, Sparkles, ChevronLeft, ChevronRight, Home, TrendingUp, Leaf, X, Droplets, Coffee, Zap, IceCream, Cookie, Pizza, Wine, Sandwich } from 'lucide-react';
import { useFastMarket } from '../context/FastMarketContext';
import { Product } from '../context/FastMarketContext';
import { getCategoryConfig } from '../utils/categoryIcons';
import { toast } from 'sonner';

// Função para obter ícone baseado no nome do produto
const getProductIcon = (productName: string) => {
  const name = productName.toLowerCase();
  
  if (name.includes('água') || name.includes('agua')) return Droplets;
  if (name.includes('café') || name.includes('cafe') || name.includes('expresso')) return Coffee;
  if (name.includes('energético') || name.includes('energetico')) return Zap;
  if (name.includes('sorvete') || name.includes('gelado')) return IceCream;
  if (name.includes('biscoito') || name.includes('cookie') || name.includes('bolacha')) return Cookie;
  if (name.includes('pizza') || name.includes('lanche') || name.includes('hamburguer')) return Pizza;
  if (name.includes('vinho') || name.includes('cerveja') || name.includes('alcool')) return Wine;
  if (name.includes('sanduiche') || name.includes('sandwich') || name.includes('pão')) return Sandwich;
  
  // Ícone padrão
  return Package;
};

export function ProductsScreen() {
  const { products, cart, addToCart, updateQuantity, cartTotal, setCurrentScreen } = useFastMarket();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Todos');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Função para normalizar texto (remove acentos)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };
  
  // Filtrar por categoria E busca
  const filteredProducts = products.filter(p => {
    if (!p.active) return false;
    
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    
    // Normaliza a busca e os textos para comparação sem acentos
    const normalizedQuery = normalizeText(searchQuery);
    const matchesSearch = searchQuery === '' || 
      normalizeText(p.name).includes(normalizedQuery) ||
      normalizeText(p.description || '').includes(normalizedQuery) ||
      normalizeText(p.category).includes(normalizedQuery);
    
    return matchesCategory && matchesSearch;
  });

  // Paginação - 12 produtos por página
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset para página 0 ao trocar de categoria
  React.useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  const getQuantityInCart = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handlers com Toasts
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} adicionado!`, {
      description: `R$ ${product.price.toFixed(2)}`,
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find(p => p.id === productId);
    const currentQuantity = getQuantityInCart(productId);
    
    updateQuantity(productId, newQuantity);
    
    if (product) {
      if (newQuantity > currentQuantity) {
        toast.success(`+1 ${product.name}`, {
          duration: 1500,
        });
      } else if (newQuantity === 0) {
        toast.error(`${product.name} removido`, {
          duration: 1500,
        });
      } else {
        toast.info(`-1 ${product.name}`, {
          duration: 1500,
        });
      }
    }
  };

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleKeyPress = (button: string) => {
    if (button === '{bksp}') {
      setSearchQuery(prev => prev.slice(0, -1));
    } else if (button === '{space}') {
      setSearchQuery(prev => prev + ' ');
    } else if (button === '{enter}') {
      setShowKeyboard(false);
    } else if (button.length === 1) {
      setSearchQuery(prev => prev + button);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
      {/* Sidebar - Desktop & Tablet */}
      <aside className="hidden md:flex md:flex-col w-64 lg:w-80 bg-white border-r border-gray-200 shadow-lg overflow-hidden landscape-compact-section">
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-200 landscape-compact-header">
          <Logo size="md" />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Categorias</h2>
          <p className="text-sm text-gray-500">Filtre por categoria</p>
        </div>

        {/* Botões de Ação - NO TOPO */}
        <div className="p-4 space-y-3 border-b-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          {/* Botão Ver Carrinho */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={cart.length === 0}
            onClick={() => setCurrentScreen('cart')}
            className="relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {cart.length === 0 ? 'CARRINHO VAZIO' : 'VER CARRINHO'}
            </span>
            {cart.length > 0 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </Button>
        </div>

        {/* Resumo do Carrinho */}
        <div className="p-4 border-b-2 border-gray-200">
          <motion.div
            animate={{ 
              scale: totalItems > 0 ? [1, 1.02, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-500 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ 
                  rotate: totalItems > 0 ? [0, -10, 10, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 relative flex-shrink-0"
              >
                <ShoppingCart className="w-7 h-7 text-white" />
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">{totalItems}</span>
                  </motion.div>
                )}
              </motion.div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium mb-1">Total do Carrinho</p>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {cartTotal.toFixed(2)}
                </p>
              </div>
            </div>
            
            {totalItems > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-green-200"
              >
                <p className="text-xs text-gray-600 text-center">
                  {totalItems} {totalItems === 1 ? 'item adicionado' : 'itens adicionados'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Categorias Section - COM SCROLL */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-5 py-4 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Botão Voltar - FIXO NO RODAPÉ DA SIDEBAR */}
        <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentScreen('home')}
            className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-all shadow-md"
            title="Voltar"
          >
            <Home className="w-5 h-5" />
          </motion.button>
        </div>
      </aside>

      {/* Mobile Category Pills */}
      <div className="md:hidden fixed top-[88px] left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Area */}
      <div className="flex-1 overflow-y-auto pb-40 md:pb-8">
        {/* Promotional Carousel */}
        <div className="p-4 md:p-6">
          <PromoCarousel />
        </div>

        {/* Campo de Busca */}
        <div className="px-4 md:px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="🔍 Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowKeyboard(true)}
                readOnly
                className="w-full bg-white border-2 border-gray-300 focus:border-green-500 rounded-xl px-5 py-4 text-base md:text-lg font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none shadow-md focus:shadow-lg transition-all cursor-pointer"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </motion.button>
              )}
            </div>
            
            {/* Resultados da Busca */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-600 mt-2 ml-2"
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="p-4 md:p-6">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-20"
            >
              <Package className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-base md:text-lg">
                {searchQuery ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 landscape:grid-cols-4 landscape:sm:grid-cols-5 landscape:md:grid-cols-5 landscape:lg:grid-cols-6 gap-3 md:gap-4 landscape:gap-2 landscape:md:gap-3">
              {paginatedProducts.map((product, index) => {
                const quantity = getQuantityInCart(product.id);
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                      {/* Product Image */}
                      {product.image && (
                        <div 
                          onClick={() => handleOpenDetails(product)}
                          className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
                        >
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Badge MAIS VENDIDO */}
                          {product.bestSeller && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <TrendingUp className="w-3 h-3" />
                              TOP
                            </div>
                          )}

                          {/* Badge COMBO */}
                          {product.featured && product.category === 'Combos' && (
                            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              COMBO
                            </div>
                          )}

                          {/* Badge VEGANO */}
                          {product.dietary?.isVegan && (
                            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <Leaf className="w-3 h-3" />
                              VEGANO
                            </div>
                          )}
                          
                          {/* Badge de Quantidade no Carrinho */}
                          <AnimatePresence>
                            {quantity > 0 && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                className="absolute top-2 left-2"
                              >
                                <div className="bg-green-500 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                                  <ShoppingCart className="w-3 h-3" />
                                  {quantity}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="p-3 md:p-4 flex flex-col flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          {(() => {
                            const ProductIcon = getProductIcon(product.name);
                            return (
                              <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                                <ProductIcon className="w-4 h-4 text-green-600" />
                              </div>
                            );
                          })()}
                          <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight flex-1 line-clamp-2 overflow-hidden">
                            {product.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <p className="font-bold text-green-600 text-lg md:text-xl">
                            R$ {product.price.toFixed(2)}
                          </p>
                          <motion.div
                            animate={{ rotate: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                          </motion.div>
                        </div>

                        <div className="mt-auto">
                          {quantity === 0 ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm">Adicionar</span>
                            </motion.button>
                          ) : (
                            <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 border-2 border-green-500">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                                className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-gray-200"
                              >
                                <Minus className="w-4 h-4 text-gray-700" />
                              </motion.button>
                              
                              <motion.div
                                key={quantity}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="font-bold text-gray-800 text-base md:text-lg min-w-[30px] text-center"
                              >
                                {quantity}
                              </motion.div>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                                className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls - BEM VISÍVEL */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 mb-6 flex items-center justify-center gap-3"
            >
              {/* Botão Anterior */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:text-green-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              {/* Indicador de Página */}
              <div className="px-4 py-2 bg-white rounded-lg border-2 border-green-500">
                <p className="font-bold text-gray-800 text-sm">
                  {currentPage + 1} de {totalPages}
                </p>
              </div>
              
              {/* Botão Próximo */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  currentPage === totalPages - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:text-green-600'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fixed Bottom - MOBILE ONLY */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 md:hidden"
      >
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: totalItems > 0 ? [0, -10, 10, -10, 10, 0] : 0,
                  scale: totalItems > 0 ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 relative"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">{totalItems}</span>
                  </motion.div>
                )}
              </motion.div>
              
              <div>
                <p className="text-xs text-gray-600 font-medium">Seu Carrinho</p>
                <p className="text-xl font-bold text-gray-800">
                  R$ {cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled={cart.length === 0}
              onClick={() => setCurrentScreen('cart')}
            >
              <span className="text-sm">
                {cart.length === 0 ? 'VAZIO' : 'VER'}
              </span>
            </Button>
          </div>
          
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => setCurrentScreen('home')}
            className="flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">VOLTAR</span>
          </Button>
        </div>
      </motion.div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <VirtualKeyboard
          onKeyPress={handleKeyPress}
          onClose={() => setShowKeyboard(false)}
          inputName="search"
          activeFieldLabel="Buscar produtos por nome ou categoria"
        />
      )}
    </div>
  );
}