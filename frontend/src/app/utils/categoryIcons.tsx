import { Coffee, Sandwich, Candy, Pizza, Beer, Package, Droplets, LucideIcon } from 'lucide-react';

export interface CategoryConfig {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  gradient: string;
}

export const categoryConfigs: Record<string, CategoryConfig> = {
  'Bebidas Geladas': {
    name: 'Bebidas Geladas',
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    gradient: 'from-blue-500 to-cyan-500'
  },
  'Cafeteria': {
    name: 'Cafeteria',
    icon: Coffee,
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    gradient: 'from-amber-600 to-orange-500'
  },
  'Lanches': {
    name: 'Lanches',
    icon: Sandwich,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    gradient: 'from-orange-500 to-red-500'
  },
  'Doces': {
    name: 'Doces',
    icon: Candy,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    gradient: 'from-pink-500 to-rose-500'
  },
  'Snacks': {
    name: 'Snacks',
    icon: Pizza,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    gradient: 'from-yellow-500 to-amber-500'
  },
  'Bebidas Alcoólicas': {
    name: 'Bebidas Alcoólicas',
    icon: Beer,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    gradient: 'from-green-500 to-emerald-500'
  },
  'Combos': {
    name: 'Combos',
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    gradient: 'from-purple-500 to-indigo-500'
  }
};

export function getCategoryConfig(categoryName: string): CategoryConfig {
  return categoryConfigs[categoryName] || {
    name: categoryName,
    icon: Package,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    gradient: 'from-gray-500 to-gray-600'
  };
}
