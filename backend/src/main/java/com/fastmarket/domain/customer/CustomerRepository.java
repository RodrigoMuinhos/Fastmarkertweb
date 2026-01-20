package com.fastmarket.domain.customer;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
  Optional<Customer> findByCpf(String cpf);

  Optional<Customer> findByPhone(String phone);
}
