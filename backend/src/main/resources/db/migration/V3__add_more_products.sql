-- Adicionar mais 30 produtos para totalizar 48 itens no cardápio

INSERT INTO products (id, name, price_cents, image_url, category, active) VALUES
-- Bebidas (10 novos)
('a0000000-0000-0000-0000-000000000001', 'Guaraná Antarctica 2L', 850, 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000002', 'Sprite Lata 350ml', 450, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000003', 'Fanta Laranja 2L', 850, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000004', 'Chá Gelado 500ml', 550, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000005', 'Água de Coco 1L', 750, 'https://images.unsplash.com/photo-1585024958451-2c4f3def4f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000006', 'Cerveja Heineken Lata', 650, 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000007', 'Cerveja Brahma Lata', 550, 'https://images.unsplash.com/photo-1569535228473-9e5b1166ab6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000008', 'Suco Del Valle Laranja', 450, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-000000000009', 'Leite Integral 1L', 550, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),
('a0000000-0000-0000-0000-00000000000a', 'Achocolatado 1L', 650, 'https://images.unsplash.com/photo-1542990253-a781e04c0082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas', true),

-- Alimentos (15 novos)
('a0000000-0000-0000-0000-00000000000b', 'Pão Francês Kg', 1200, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-00000000000c', 'Queijo Minas 500g', 2500, 'https://images.unsplash.com/photo-1452195100486-9cc805987862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-00000000000d', 'Presunto Fatiado 200g', 1800, 'https://images.unsplash.com/photo-1554570803-0f4c1309c184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-00000000000e', 'Iogurte Natural 170g', 350, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-00000000000f', 'Manteiga 200g', 1250, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000010', 'Requeijão 200g', 850, 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000011', 'Salsicha Hot Dog', 950, 'https://images.unsplash.com/photo-1612392062798-2d3f0d4e37d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000012', 'Hambúrguer Congelado', 1450, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000013', 'Pizza Congelada', 1890, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000014', 'Lasanha Congelada', 2200, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000015', 'Macarrão Instantâneo', 350, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000016', 'Arroz 1Kg', 650, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000017', 'Feijão 1Kg', 850, 'https://images.unsplash.com/photo-1596797938495-8be5d29c0f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000018', 'Óleo de Soja 900ml', 950, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),
('a0000000-0000-0000-0000-000000000019', 'Açúcar 1Kg', 450, 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Alimentos', true),

-- Utilidades/Outros (5 novos)
('a0000000-0000-0000-0000-00000000001a', 'Papel Higiênico 4 Rolos', 1250, 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
('a0000000-0000-0000-0000-00000000001b', 'Sabonete 90g', 350, 'https://images.unsplash.com/photo-1585155770728-b1286196f30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
('a0000000-0000-0000-0000-00000000001c', 'Shampoo 350ml', 1450, 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
('a0000000-0000-0000-0000-00000000001d', 'Pasta de Dente 90g', 750, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true),
('a0000000-0000-0000-0000-00000000001e', 'Escova de Dente', 550, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Outros', true);
