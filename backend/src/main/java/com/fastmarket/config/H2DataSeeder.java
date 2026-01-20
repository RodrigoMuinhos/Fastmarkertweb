package com.fastmarket.config;

import com.fastmarket.domain.customer.Customer;
import com.fastmarket.domain.customer.CustomerRepository;
import com.fastmarket.domain.product.Product;
import com.fastmarket.domain.product.ProductRepository;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("h2")
public class H2DataSeeder {

  @Bean
  CommandLineRunner seedH2(ProductRepository productRepository, CustomerRepository customerRepository) {
    return args -> {
      if (productRepository.count() == 0) {
        var now = OffsetDateTime.now();

        Product p1 = new Product();
        p1.setId(UUID.randomUUID());
        p1.setName("Água Mineral 500ml");
        p1.setPriceCents(350);
        p1.setImageUrl(null);
        p1.setCategory("Bebidas");
        p1.setActive(true);
        p1.setCreatedAt(now);
        p1.setUpdatedAt(now);

        Product p2 = new Product();
        p2.setId(UUID.randomUUID());
        p2.setName("Salgadinho 90g");
        p2.setPriceCents(790);
        p2.setImageUrl(null);
        p2.setCategory("Snacks");
        p2.setActive(true);
        p2.setCreatedAt(now);
        p2.setUpdatedAt(now);

        Product p3 = new Product();
        p3.setId(UUID.randomUUID());
        p3.setName("Chocolate 80g");
        p3.setPriceCents(980);
        p3.setImageUrl(null);
        p3.setCategory("Doces");
        p3.setActive(true);
        p3.setCreatedAt(now);
        p3.setUpdatedAt(now);

        productRepository.saveAll(List.of(p1, p2, p3));
      }

      if (customerRepository.count() == 0) {
        var now = OffsetDateTime.now();

        Customer c = new Customer();
        c.setId(UUID.randomUUID());
        c.setName("Cliente Teste");
        c.setCpf("12345678901");
        c.setPhone("11999999999");
        c.setPoints(120);
        c.setCreatedAt(now);
        c.setUpdatedAt(now);

        customerRepository.save(c);
      }
    };
  }
}
