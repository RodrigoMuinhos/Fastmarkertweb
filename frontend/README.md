# FastMarket Kiosk - Frontend

Interface web para o sistema de Kiosk FastMarket, desenvolvida com React, Vite e Tailwind CSS.

## 🚀 Deploy Vercel

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RodrigoMuinhos/Fastmarkertweb/tree/main/frontend)

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Material-UI** - Biblioteca de componentes
- **React Router** - Navegação
- **TypeScript** - Tipagem estática

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🌐 Deploy no Vercel

### Opção 1: Via Dashboard
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. Configure o root directory como `frontend`
5. Deploy!

### Opção 2: Via CLI
```bash
npm i -g vercel
cd frontend
vercel
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_API_URL=https://seu-backend.com/api
```

## 📂 Estrutura

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes React
│   │   ├── screens/        # Telas da aplicação
│   │   ├── context/        # Context API
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utilitários
│   ├── assets/             # Imagens e arquivos estáticos
│   ├── styles/             # Estilos globais
│   └── main.tsx            # Entry point
├── index.html
├── vite.config.ts
└── package.json
```

## 🎨 Features

- ✅ Interface moderna e responsiva
- ✅ Sistema de carrinho de compras
- ✅ Integração com programa de fidelidade
- ✅ Múltiplos métodos de pagamento (PIX, Cartão)
- ✅ Teclado virtual para kiosks
- ✅ Timer de inatividade
- ✅ Animações fluidas
- ✅ Dashboard administrativo

## 📱 Telas Principais

- **Home** - Tela inicial com promoções
- **Produtos** - Catálogo de produtos
- **Carrinho** - Resumo da compra
- **Pagamento** - Seleção de método de pagamento
- **FastPlus** - Programa de fidelidade
- **Admin** - Painel administrativo

## 🔗 Backend

O frontend se conecta ao backend Java Spring Boot. Consulte a pasta `/backend` para mais informações.

## 📄 Licença

Copyright © 2026 FastMarket