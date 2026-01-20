import { Product } from '../context/FastMarketContext';

export const mockProducts: Product[] = [
  // 🥤 BEBIDAS GELADAS (10 produtos)
  { 
    id: '1', 
    name: 'Água Mineral 500ml', 
    price: 3.50, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Água mineral natural, pura e refrescante. Perfeita para hidratar seu dia.',
    bestSeller: true,
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1564919415179-752ca9dadcdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMG1pbmVyYWx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '2', 
    name: 'Água com Gás 500ml', 
    price: 4.00, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Água gaseificada natural para quem busca mais sabor na hidratação.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1564919415179-752ca9dadcdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMG1pbmVyYWx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '3', 
    name: 'Refrigerante Lata 350ml', 
    price: 5.90, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Refrigerante gelado em lata, ideal para acompanhar seu lanche.',
    bestSeller: true,
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1596793453600-adeef0163df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '4', 
    name: 'Refrigerante 600ml', 
    price: 8.50, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Refrigerante em garrafa pet, perfeito para compartilhar ou matar a sede.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1596793453600-adeef0163df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '5', 
    name: 'Refrigerante 2L', 
    price: 11.90, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Refrigerante família 2 litros, ideal para levar para casa ou festas.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1596793453600-adeef0163df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '6', 
    name: 'Suco de Caixinha', 
    price: 5.50, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Suco natural de caixinha, sem conservantes. Sabor e saúde em cada gole.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1596793453600-adeef0163df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '7', 
    name: 'Energético Lata', 
    price: 11.90, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Energético para dar aquele up na sua energia. Ideal para viagens longas.',
    bestSeller: true,
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1580859297753-0b52fa0fc46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMHJlZCUyMGJ1bGx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '8', 
    name: 'Energético 473ml', 
    price: 15.90, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Energético tamanho grande para máxima energia e disposição.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1580859297753-0b52fa0fc46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMHJlZCUyMGJ1bGx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '9', 
    name: 'Isotônico Gatorade', 
    price: 9.50, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Bebida isotônica para reposição de sais minerais. Perfeito após atividades físicas.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1580859297753-0b52fa0fc46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMHJlZCUyMGJ1bGx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '10', 
    name: 'Chá Gelado', 
    price: 6.90, 
    category: 'Bebidas Geladas', 
    active: true,
    description: 'Chá gelado natural, refrescante e saboroso. Zero açúcar.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1564919415179-752ca9dadcdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMG1pbmVyYWx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // ☕ CAFETERIA & QUENTES (8 produtos)
  { 
    id: '11', 
    name: 'Café Expresso', 
    price: 5.90, 
    category: 'Cafeteria', 
    active: true,
    description: 'Café expresso tradicional, feito na hora. Encorpado e aromático.',
    bestSeller: true,
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '12', 
    name: 'Café com Leite', 
    price: 7.50, 
    category: 'Cafeteria', 
    active: true,
    description: 'Café com leite cremoso, perfeito para começar o dia com energia.',
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '13', 
    name: 'Cappuccino', 
    price: 8.90, 
    category: 'Cafeteria', 
    active: true,
    description: 'Cappuccino italiano com espuma cremosa e canela. Um clássico irresistível.',
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '14', 
    name: 'Chocolate Quente', 
    price: 9.50, 
    category: 'Cafeteria', 
    active: true,
    description: 'Chocolate quente cremoso feito com cacau premium. Puro conforto.',
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '15', 
    name: 'Pão de Queijo', 
    price: 6.50, 
    category: 'Cafeteria', 
    active: true,
    description: 'Pão de queijo mineiro quentinho. Feito com polvilho azedo, crocante por fora e macio por dentro.',
    bestSeller: true,
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '16', 
    name: 'Croissant Simples', 
    price: 8.90, 
    category: 'Cafeteria', 
    active: true,
    description: 'Croissant francês folhado e amanteigado. Simplesmente delicioso.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '17',
    name: 'Croissant Recheado', 
    price: 11.90, 
    category: 'Cafeteria', 
    active: true,
    description: 'Croissant recheado com chocolate ou doce de leite. Uma tentação irresistível.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '18', 
    name: 'Sanduíche Quente', 
    price: 13.90, 
    category: 'Cafeteria', 
    active: true,
    description: 'Sanduíche quente com queijo derretido e presunto. Prático e saboroso.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // 🍔 LANCHES RÁPIDOS (6 produtos)
  { 
    id: '19', 
    name: 'Hambúrguer Simples', 
    price: 14.90, 
    category: 'Lanches', 
    active: true,
    description: 'Hambúrguer artesanal com pão, carne suculenta, queijo e salada fresca.',
    bestSeller: true,
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '20', 
    name: 'Hambúrguer Completo', 
    price: 18.90, 
    category: 'Lanches', 
    active: true,
    description: 'Hambúrguer completo com bacon, ovo, queijo cheddar e molhos especiais.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '21', 
    name: 'Hot Dog', 
    price: 11.90, 
    category: 'Lanches', 
    active: true,
    description: 'Hot dog tradicional com salsicha, purê, batata palha e molhos.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '22', 
    name: 'Misto Quente', 
    price: 9.90, 
    category: 'Lanches', 
    active: true,
    description: 'Misto quente clássico na chapa com queijo derretido e presunto.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '23', 
    name: 'Wrap', 
    price: 17.90, 
    category: 'Lanches', 
    active: true,
    description: 'Wrap integral com frango grelhado, verduras frescas e molho especial.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '24', 
    name: 'Empada / Salgado', 
    price: 7.90, 
    category: 'Lanches', 
    active: true,
    description: 'Empada assada com recheios variados. Perfeito para um lanche rápido.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // 🍫 DOCES & CHOCOLATES (6 produtos)
  { 
    id: '25', 
    name: 'Chocolate Barra', 
    price: 6.90, 
    category: 'Doces', 
    active: true,
    description: 'Chocolate ao leite cremoso em barra de 90g. Perfeito para qualquer momento.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '26', 
    name: 'Chocolate Premium', 
    price: 11.90, 
    category: 'Doces', 
    active: true,
    description: 'Chocolate belga premium 70% cacau. Para paladares refinados.',
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '27', 
    name: 'Bala / Chiclete', 
    price: 3.50, 
    category: 'Doces', 
    active: true,
    description: 'Balas e chicletes sortidos. Refrescância para o dia todo.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '28', 
    name: 'Paçoca', 
    price: 3.90, 
    category: 'Doces', 
    active: true,
    description: 'Paçoca tradicional brasileira. Doce de amendoim que derrete na boca.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '29', 
    name: 'Cookies', 
    price: 6.50, 
    category: 'Doces', 
    active: true,
    description: 'Cookies recheados com gotas de chocolate. Crocantes e deliciosos.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '30', 
    name: 'Bolo Fatia', 
    price: 8.90, 
    category: 'Doces', 
    active: true,
    description: 'Fatia generosa de bolo caseiro. Sabores variados diariamente.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1632687380457-05a1271e873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBjYW5keXxlbnwxfHx8fDE3Njg1NTU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // 🍟 SNACKS (5 produtos)
  { 
    id: '31', 
    name: 'Salgadinho Pequeno', 
    price: 5.90, 
    category: 'Snacks', 
    active: true,
    description: 'Salgadinho crocante sabor queijo. Tamanho individual perfeito.',
    bestSeller: true,
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1641693148759-843d17ceac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlwcyUyMHNuYWNrcyUyMGJhZ3xlbnwxfHx8fDE3Njg1NTczMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '32', 
    name: 'Salgadinho Grande', 
    price: 9.50, 
    category: 'Snacks', 
    active: true,
    description: 'Salgadinho tamanho família para compartilhar. Diversos sabores.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1641693148759-843d17ceac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlwcyUyMHNuYWNrcyUyMGJhZ3xlbnwxfHx8fDE3Njg1NTczMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '33', 
    name: 'Batata Chips Premium', 
    price: 11.90, 
    category: 'Snacks', 
    active: true,
    description: 'Batata chips artesanal ondulada. Crocância incomparável.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1641693148759-843d17ceac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlwcyUyMHNuYWNrcyUyMGJhZ3xlbnwxfHx8fDE3Njg1NTczMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '34', 
    name: 'Amendoim', 
    price: 6.50, 
    category: 'Snacks', 
    active: true,
    description: 'Amendoim japonês crocante. Fonte de proteína e energia.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1641693148759-843d17ceac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlwcyUyMHNuYWNrcyUyMGJhZ3xlbnwxfHx8fDE3Njg1NTczMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '35', 
    name: 'Mix Nuts', 
    price: 13.90, 
    category: 'Snacks', 
    active: true,
    description: 'Mix de castanhas premium (amêndoa, castanha, nozes). Saudável e nutritivo.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1641693148759-843d17ceac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlwcyUyMHNuYWNrcyUyMGJhZ3xlbnwxfHx8fDE3Njg1NTczMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // 🍺 BEBIDAS ALCOÓLICAS (5 produtos)
  { 
    id: '36', 
    name: 'Cerveja Lata', 
    price: 6.90, 
    category: 'Bebidas Alcoólicas', 
    active: true,
    description: 'Cerveja gelada em lata 350ml. Refrescante e saborosa.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODQ4Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '37', 
    name: 'Cerveja Long Neck', 
    price: 9.50, 
    category: 'Bebidas Alcoólicas', 
    active: true,
    description: 'Cerveja long neck 330ml. Estilo e qualidade em cada gole.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODQ4Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '38', 
    name: 'Cerveja Premium', 
    price: 13.90, 
    category: 'Bebidas Alcoólicas', 
    active: true,
    description: 'Cerveja artesanal premium. Sabor marcante e encorpado.',
    dietary: {
      hasGluten: true,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODQ4Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '39', 
    name: 'Ice', 
    price: 11.90, 
    category: 'Bebidas Alcoólicas', 
    active: true,
    description: 'Bebida ice sabor limão. Refrescante e levemente alcoólica.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODQ4Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '40', 
    name: 'Vinho Pequeno', 
    price: 28.90, 
    category: 'Bebidas Alcoólicas', 
    active: true,
    description: 'Vinho tinto seco 375ml. Perfeito para ocasiões especiais.',
    dietary: {
      hasGluten: false,
      hasLactose: false,
      isVegan: true,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODQ4Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },

  // 📦 COMBOS (5 produtos) - TODOS EM DESTAQUE!
  { 
    id: '41', 
    name: 'Combo: Café + Pão de Queijo', 
    price: 10.90, 
    category: 'Combos', 
    active: true,
    featured: true,
    description: 'Café expresso quentinho + pão de queijo mineiro. Combo perfeito para o café da manhã! Economize R$ 1,50.',
    dietary: {
      hasGluten: false,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '42', 
    name: 'Combo: Refrigerante + Salgado', 
    price: 12.90, 
    category: 'Combos', 
    active: true,
    featured: true,
    description: 'Refrigerante lata gelado + salgadinho crocante. Lanche rápido e delicioso! Economize R$ 1,80.',
    bestSeller: true,
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1596793453600-adeef0163df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '43', 
    name: 'Combo: Energético + Snack', 
    price: 18.90, 
    category: 'Combos', 
    active: true,
    featured: true,
    description: 'Energético lata + salgadinho grande. Energia máxima para viagens longas! Economize R$ 2,90.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1580859297753-0b52fa0fc46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMHJlZCUyMGJ1bGx8ZW58MXx8fHwxNzY4NTk2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '44', 
    name: 'Combo: Hambúrguer + Refri', 
    price: 22.90, 
    category: 'Combos', 
    active: true,
    featured: true,
    description: 'Hambúrguer completo + refrigerante 600ml. Refeição completa e saborosa! Economize R$ 4,50.',
    bestSeller: true,
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: false
    },
    image: 'https://images.unsplash.com/photo-1614597546944-a54636047376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3Njg1OTY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '45', 
    name: 'Combo: Café + Doce', 
    price: 11.90, 
    category: 'Combos', 
    active: true,
    featured: true,
    description: 'Café com leite + croissant recheado. Pausa doce e relaxante! Economize R$ 2,50.',
    dietary: {
      hasGluten: true,
      hasLactose: true,
      isVegan: false,
      isVegetarian: true
    },
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3Njg0OTkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
];