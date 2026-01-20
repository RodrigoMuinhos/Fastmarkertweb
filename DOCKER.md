# Docker (FastMarket)

## Pré-requisitos
- Docker Desktop instalado e rodando
- Docker Compose (já vem no Docker Desktop)

## Subir tudo (padrão, sem Neon)
O `docker-compose.yml` está configurado para subir o backend com perfil **H2** por padrão, então funciona sem `.env`.

1) Na pasta do projeto, rode:

```bash
docker compose up --build
```

2) Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:8082

> Observação: por padrão, o backend usa a porta 8082 no host. Se precisar trocar, defina `BACKEND_PORT` (ex: `BACKEND_PORT=8090`).

## Subir usando Neon (Postgres)
1) Copie o arquivo `.env.example` para `.env`
2) Edite o `.env` e configure:
- `SPRING_PROFILES_ACTIVE=neon`
- `NEON_JDBC_URL=...`
- `NEON_DB_USER=...`
- `NEON_DB_PASSWORD=...`

3) Suba novamente:

```bash
docker compose up --build
```

## Parar
```bash
docker compose down
```
