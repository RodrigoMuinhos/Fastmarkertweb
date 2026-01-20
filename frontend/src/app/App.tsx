import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastMarketProvider, useFastMarket } from './context/FastMarketContext';
import { Toaster } from 'sonner';

// Customer Screens
import { HomeScreen } from './screens/HomeScreen';
import { ProductsScreen } from './screens/ProductsScreen';
import { CartScreen } from './screens/CartScreen';
import { FastPlusOptionalScreen } from './screens/FastPlusOptionalScreen';
import { FastPlusRegisterScreen } from './screens/FastPlusRegisterScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PixQRCodeScreen } from './screens/PixQRCodeScreen';
import { CardMachineScreen } from './screens/CardMachineScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { FastPlusQueryScreen } from './screens/FastPlusQueryScreen';

// Operator Screens
import { LoginScreen } from './screens/operator/LoginScreen';
import { DashboardScreen } from './screens/operator/DashboardScreen';
import { ProductsScreen as OperatorProductsScreen } from './screens/operator/ProductsScreen';
import { CustomersScreen } from './screens/operator/CustomersScreen';
import { ReportsScreen } from './screens/operator/ReportsScreen';

function AppContent() {
  const { currentScreen } = useFastMarket();

  const renderScreen = () => {
    switch (currentScreen) {
      // Customer screens
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'fastplus-optional':
        return <FastPlusOptionalScreen />;
      case 'fastplus-register':
        return <FastPlusRegisterScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'pix-qrcode':
        return <PixQRCodeScreen />;
      case 'card-machine':
        return <CardMachineScreen />;
      case 'confirmation':
        return <ConfirmationScreen />;
      case 'fastplus-query':
        return <FastPlusQueryScreen />;
      
      // Operator screens
      case 'operator-login':
        return <LoginScreen />;
      case 'operator-dashboard':
        return <DashboardScreen />;
      case 'operator-products':
        return <OperatorProductsScreen />;
      case 'operator-customers':
        return <CustomersScreen />;
      case 'operator-reports':
        return <ReportsScreen />;
      
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Toaster 
        position="top-right"
        richColors
        expand={false}
        duration={2000}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <FastMarketProvider>
      <AppContent />
    </FastMarketProvider>
  );
}