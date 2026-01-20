# 🚀 FastMarket Kiosk - Sistema Completo

Sistema de autoatendimento (kiosk) moderno e completo para FastMarket, com frontend web, backend Java Spring Boot e app mobile.

## 📦 Estrutura do Projeto

```
FastMarket/
├── frontend/          # 🌐 Frontend React + Vite (Deploy Vercel)
├── backend/           # ☕ Backend Java Spring Boot + PostgreSQL
├── mobile/            # 📱 App React Native/Expo
├── electron/          # 🖥️  Desktop app (Electron)
└── guidelines/        # 📋 Documentação de design
```

## 🚀 Quick Start

### Frontend (Web)
```bash
cd frontend
npm install
npm run dev
```
**Deploy**: Pronto para Vercel! Consulte [frontend/README.md](frontend/README.md)

### Backend (API)
```bash
cd backend
mvn spring-boot:run
```
**Requisitos**: Java 21, Maven 3.9+, PostgreSQL (ou H2 para testes)

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## 🛠️ Tecnologias

### Frontend
- React 19 + Vite
- Tailwind CSS + Radix UI
- Material-UI
- TypeScript

### Backend
- Java 21
- Spring Boot 3.3.6
- PostgreSQL + Flyway
- Spring Security

### Mobile
- React Native
- Expo
- TypeScript

## 🌐 Deploy

- **Frontend**: Vercel (recomendado)
- **Backend**: Railway, Render, AWS
- **Database**: Neon, Supabase, AWS RDS

## 📱 Features

✅ Sistema de carrinho de compras  
✅ Múltiplos métodos de pagamento (PIX, Cartão, Dinheiro)  
✅ Programa de fidelidade (FastPlus)  
✅ Dashboard administrativo  
✅ Gestão de produtos e clientes  
✅ Relatórios de vendas  
✅ Interface responsiva e acessível  
✅ Suporte a kiosks touchscreen  

## 🔗 Links Úteis

- **Repositório**: https://github.com/RodrigoMuinhos/Fastmarkertweb
- **Design Figma**: https://www.figma.com/design/T5V13oE1acOupF7BR0ZOMU/FastMarket-Kiosk-Frontend-Design

## 📄 Licença

Copyright © 2026 FastMarket. Todos os direitos reservados.
