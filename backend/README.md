# FastMarket Backend (Java + SQL)

Backend REST para o sistema FastMarket (kiosk/app), com persistência em banco SQL (PostgreSQL) e migrações.

## Requisitos

- Java 21+
- Maven 3.9+
- Docker Desktop (para o PostgreSQL em dev)

## Subir o banco (dev)

```bash
docker compose up -d
```

## Rodar o backend

```bash
mvn spring-boot:run
```

Por padrão, o backend sobe em `http://localhost:8080`.

## Variáveis de ambiente

O backend usa estas variáveis (com defaults para dev):

- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)
- `DB_NAME` (default: `fastmarket`)
- `DB_USER` (default: `fastmarket`)
- `DB_PASSWORD` (default: `fastmarket`)
- `CORS_ALLOWED_ORIGINS` (default: `*`)

## Endpoints (MVP)

- `GET /api/products` (lista produtos; query: `active`, `category`)
- `POST /api/products` (cria produto)
- `PATCH /api/products/{id}` (atualiza produto)

- `GET /api/customers/lookup?cpfOrPhone=...` (busca Fast+)
- `POST /api/customers` (cadastra cliente Fast+)

- `POST /api/sales` (cria venda e registra itens; calcula pontos)

> Pagamentos (PIX/cartão) estão como **simulação** no MVP, alinhado ao design atual.
