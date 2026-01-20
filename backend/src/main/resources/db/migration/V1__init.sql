create table if not exists products (
  id uuid primary key,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  image_url text null,
  category text not null,
  active boolean not null default true,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_active on products(active);

create table if not exists customers (
  id uuid primary key,
  name text not null,
  cpf text not null,
  phone text not null,
  points integer not null default 0,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create unique index if not exists uq_customers_cpf on customers(cpf);
create index if not exists idx_customers_phone on customers(phone);

create table if not exists sales (
  id uuid primary key,
  total_cents integer not null check (total_cents >= 0),
  payment_method text not null,
  customer_id uuid null references customers(id),
  points_earned integer not null default 0,
  created_at timestamp not null default now()
);

create index if not exists idx_sales_customer_id on sales(customer_id);
create index if not exists idx_sales_created_at on sales(created_at);

create table if not exists sale_items (
  id uuid primary key,
  sale_id uuid not null references sales(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  line_total_cents integer not null check (line_total_cents >= 0)
);

create index if not exists idx_sale_items_sale_id on sale_items(sale_id);
