import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockProducts as importedMockProducts } from '../data/products';

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  active: boolean;
  description?: string;
  dietary?: {
    hasGluten?: boolean;
    hasLactose?: boolean;
    isVegan?: boolean;
    isVegetarian?: boolean;
  };
  featured?: boolean; // Destaque na home
  bestSeller?: boolean; // Mais vendido
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  points: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  customerId?: string;
  pointsEarned?: number;
  timestamp: Date;
}

interface FastMarketContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Customer
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  
  // Sale
  currentSale: Sale | null;
  completeSale: (paymentMethod: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'points'>) => void;
  findCustomer: (cpf: string) => Customer | undefined;
  
  // Sales
  sales: Sale[];
  
  // Navigation
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  
  // Operator mode
  isOperatorMode: boolean;
  setIsOperatorMode: (value: boolean) => void;
  
  // Fast+ Rewards
  redeemReward: (rewardId: string, pointsCost: number) => void;
  
  // Cupons
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const FastMarketContext = createContext<FastMarketContextType | undefined>(undefined);

// Mock data - Produtos FastMarket
const mockProducts: Product[] = importedMockProducts;

const mockCustomers: Customer[] = [
  { id: '1', name: 'João Silva', cpf: '12345678900', phone: '11999999999', points: 1250 },
  { id: '2', name: 'Maria Santos', cpf: '98765432100', phone: '11988888888', points: 3400 },
];

export function FastMarketProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentSale, setCurrentSale] = useState<Sale | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [sales, setSales] = useState<Sale[]>([]);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isOperatorMode, setIsOperatorMode] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  // Cart calculations
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Sale functions
  const completeSale = (paymentMethod: string) => {
    const pointsEarned = currentCustomer ? Math.floor(cartTotal * 10) : 0;
    
    const sale: Sale = {
      id: `SALE-${Date.now()}`,
      items: cart,
      total: cartTotal,
      paymentMethod,
      customerId: currentCustomer?.id,
      pointsEarned,
      timestamp: new Date(),
    };

    setSales(prev => [...prev, sale]);
    setCurrentSale(sale);

    // Update customer points
    if (currentCustomer && pointsEarned > 0) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === currentCustomer.id
            ? { ...c, points: c.points + pointsEarned }
            : c
        )
      );
      setCurrentCustomer(prev =>
        prev ? { ...prev, points: prev.points + pointsEarned } : null
      );
    }

    clearCart();
  };

  // Product functions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  // Customer functions
  const addCustomer = (customer: Omit<Customer, 'id' | 'points'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: `CUST-${Date.now()}`,
      points: 0,
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const findCustomer = (cpf: string) => {
    return customers.find(c => c.cpf === cpf);
  };

  // Fast+ Rewards
  const redeemReward = (rewardId: string, pointsCost: number) => {
    if (!currentCustomer || currentCustomer.points < pointsCost) return;

    // Deduct points
    setCustomers(prev =>
      prev.map(c =>
        c.id === currentCustomer.id
          ? { ...c, points: c.points - pointsCost }
          : c
      )
    );
    setCurrentCustomer(prev =>
      prev ? { ...prev, points: prev.points - pointsCost } : null
    );
  };

  // Cupons
  const applyCoupon = (code: string): boolean => {
    const codeUpper = code.toUpperCase().trim();
    
    // Lista de cupons válidos
    const coupons: Record<string, number> = {
      'PRIMEIRA10': 10,  // 10% de desconto
      'FAST15': 15,      // 15% de desconto
      'COMBO20': 20,     // 20% de desconto
      'BEMVINDO': 5,     // 5% de desconto
      'VIP25': 25,       // 25% de desconto
    };
    
    if (coupons[codeUpper]) {
      setAppliedCoupon({ code: codeUpper, discount: coupons[codeUpper] });
      return true;
    }
    
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const value: FastMarketContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    currentCustomer,
    setCurrentCustomer,
    currentSale,
    completeSale,
    products,
    addProduct,
    updateProduct,
    customers,
    addCustomer,
    findCustomer,
    sales,
    currentScreen,
    setCurrentScreen,
    isOperatorMode,
    setIsOperatorMode,
    redeemReward,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  };

  return (
    <FastMarketContext.Provider value={value}>
      {children}
    </FastMarketContext.Provider>
  );
}

export function useFastMarket() {
  const context = useContext(FastMarketContext);
  if (!context) {
    throw new Error('useFastMarket must be used within FastMarketProvider');
  }
  return context;
}