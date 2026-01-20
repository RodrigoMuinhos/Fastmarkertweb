import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/fastmarket/Logo';
import { Button } from '../components/fastmarket/Button';
import { Input } from '../components/fastmarket/Input';
import { PartnersCarousel } from '../components/fastmarket/PartnersCarousel';
import { useFastMarket } from '../context/FastMarketContext';
import { Award, Gift, Star, Zap, TrendingUp, Users } from 'lucide-react';

export function FastPlusRegisterScreen() {
  const { addCustomer, setCurrentCustomer, customers, setCurrentScreen } = useFastMarket();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Digite seu nome';
    if (!cpf) newErrors.cpf = 'Digite seu CPF';
    if (!phone) newErrors.phone = 'Digite seu telefone';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add customer
    addCustomer({ name, cpf, phone });

    // Find the newly added customer
    const newCustomer = customers.find(c => c.cpf === cpf);
    if (newCustomer) {
      setCurrentCustomer(newCustomer);
    }

    setCurrentScreen('payment');
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Ganhe Pontos',
      description: 'R$ 1,00 = 10 pontos',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      title: 'Prêmios Exclusivos',
      description: 'Troque por produtos',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Zap,
      title: 'Rápido e Fácil',
      description: 'Cadastro em 1 minuto',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: TrendingUp,
      title: 'Mais Vantagens',
      description: 'Ofertas especiais',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="py-4 px-4 md:py-6 md:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <Logo size="md" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-auto">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mb-4 shadow-xl"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="mb-3 font-bold text-gray-800 text-2xl md:text-4xl">
              Cadastro Fast+
            </h1>
            <p className="text-gray-600 text-base md:text-xl max-w-2xl mx-auto">
              Preencha seus dados e comece a acumular pontos agora mesmo!
            </p>
          </motion.div>

          {/* Benefits Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`${benefit.bgColor} rounded-xl p-4 border-2 border-gray-200 hover:border-green-400 transition-all cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 md:p-8 mb-6"
          >
            {/* Stats */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-green-600">15K+</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 justify-center">
                    <Users className="w-3 h-3" />
                    Clientes Fast+
                  </p>
                </div>
                <div className="h-12 w-px bg-green-300"></div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-green-600">50K+</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 justify-center">
                    <Gift className="w-3 h-3" />
                    Prêmios Resgatados
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5 mb-6">
              <Input
                label="Nome Completo"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: '' });
                }}
                error={errors.name}
              />

              <Input
                label="CPF"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => {
                  setCpf(e.target.value);
                  setErrors({ ...errors, cpf: '' });
                }}
                error={errors.cpf}
              />

              <Input
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors({ ...errors, phone: '' });
                }}
                error={errors.phone}
              />
            </div>

            {/* Trust Badge */}
            <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
              <p className="text-xs text-center text-gray-600">
                🔒 Seus dados estão seguros e protegidos pela LGPD
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleSubmit}
              >
                SALVAR E CONTINUAR
              </Button>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setCurrentScreen('fastplus-optional')}
              >
                VOLTAR
              </Button>
            </div>
          </motion.div>

          {/* Partners Carousel - PUBLICIDADE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PartnersCarousel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
