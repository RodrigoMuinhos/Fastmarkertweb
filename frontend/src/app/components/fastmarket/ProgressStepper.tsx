import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Award, CreditCard, CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  icon: React.ElementType;
}

interface ProgressStepperProps {
  currentStep: number;
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const steps: Step[] = [
    { id: 1, name: 'Carrinho', icon: ShoppingCart },
    { id: 2, name: 'Fast+', icon: Award },
    { id: 3, name: 'Pagamento', icon: CreditCard },
    { id: 4, name: 'Confirmação', icon: CheckCircle },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 md:py-6">
      <div className="flex items-center justify-between relative">
        {/* Linha de progresso */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-[#22C55E] -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1 md:gap-2 relative z-10">
              <motion.div
                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${isCompleted ? 'bg-[#22C55E] text-white' : ''}
                  ${isCurrent ? 'bg-[#FBBF24] text-white ring-4 ring-[#FBBF24]/30' : ''}
                  ${isPending ? 'bg-gray-200 text-gray-400' : ''}
                `}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
              <span
                className={`
                  text-xs md:text-sm font-medium hidden sm:block
                  ${isCompleted || isCurrent ? 'text-[#1F2937]' : 'text-gray-400'}
                `}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
