-- Inicialização local do banco FastMarket (Windows)
-- Execute este script conectado como superusuário (ex.: postgres) no database "postgres".

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'fastmarket') THEN
    CREATE ROLE fastmarket LOGIN PASSWORD 'fastmarket';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'fastmarket') THEN
    CREATE DATABASE fastmarket OWNER fastmarket;
  END IF;
END $$;

-- Garante permissões (útil quando o DB já existe)
GRANT ALL PRIVILEGES ON DATABASE fastmarket TO fastmarket;
