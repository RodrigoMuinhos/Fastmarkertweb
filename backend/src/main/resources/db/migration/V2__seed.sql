insert into products (id, name, price_cents, image_url, category, active)
values
  ('11111111-1111-1111-1111-111111111111','Coca-Cola 2L', 899, 'https://images.unsplash.com/photo-1648569883125-d01072540b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('22222222-2222-2222-2222-222222222222','Água Mineral 500ml', 250, 'https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('33333333-3333-3333-3333-333333333333','Salgadinho 100g', 599, 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Snacks', true),
  ('44444444-4444-4444-4444-444444444444','Chocolate 90g', 750, 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Doces', true),
  ('55555555-5555-5555-5555-555555555555','Energético 250ml', 999, 'https://images.unsplash.com/photo-1560689189-65b6ed6228e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('66666666-6666-6666-6666-666666666666','Sanduíche Natural', 1290, 'https://images.unsplash.com/photo-1763647814142-b1eb054d42f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
  ('77777777-7777-7777-7777-777777777777','Café Expresso', 450, 'https://images.unsplash.com/photo-1645445644664-8f44112f334c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('88888888-8888-8888-8888-888888888888','Bala Sortida 500g', 699, 'https://images.unsplash.com/photo-1720924109595-161e675c792f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Doces', true),
  ('99999999-9999-9999-9999-999999999999','Suco Natural 300ml', 650, 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Biscoito Recheado', 499, 'https://images.unsplash.com/photo-1634834217066-4cc530278c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Snacks', true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','Sorvete 1L', 1590, 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Doces', true),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc','Chiclete', 299, 'https://images.unsplash.com/photo-1576644461179-ddd318c669e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Doces', true),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd','Refrigerante Lata', 550, 'https://images.unsplash.com/photo-1696739696220-8d2e27465662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee','Amendoim 150g', 799, 'https://images.unsplash.com/photo-1615485737643-406ce5bac81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Snacks', true),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff','Croissant', 850, 'https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
  ('12121212-1212-1212-1212-121212121212','Cigarro', 1200, 'https://images.unsplash.com/photo-1627449543657-ab677b2105cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
  ('13131313-1313-1313-1313-131313131313','Isqueiro', 350, 'https://images.unsplash.com/photo-1605542484282-6e2d79b74f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
  ('14141414-1414-1414-1414-141414141414','Pilha AA', 990, 'https://images.unsplash.com/photo-1742899273038-67ff67477663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true)
on conflict (id) do nothing;

insert into customers (id, name, cpf, phone, points)
values
  ('aaaaaaaa-1111-1111-1111-111111111111', 'João Silva', '12345678900', '11999999999', 1250),
  ('bbbbbbbb-2222-2222-2222-222222222222', 'Maria Santos', '98765432100', '11988888888', 3400)
on conflict (id) do nothing;
