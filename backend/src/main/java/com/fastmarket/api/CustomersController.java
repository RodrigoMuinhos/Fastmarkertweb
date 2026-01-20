package com.fastmarket.api;

import com.fastmarket.domain.customer.Customer;
import com.fastmarket.domain.customer.CustomerRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomersController {

  private final CustomerRepository customerRepository;

  public CustomersController(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @GetMapping("/lookup")
  public CustomerDto lookup(@RequestParam(name = "cpfOrPhone") String cpfOrPhone) {
    String key = normalize(cpfOrPhone);
    Optional<Customer> found = customerRepository.findByCpf(key);
    if (found.isEmpty()) {
      found = customerRepository.findByPhone(key);
    }
    return found.map(CustomerDto::fromEntity).orElse(null);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CustomerDto create(@Valid @RequestBody CreateCustomerRequest body) {
    Customer c = new Customer();
    c.setId(UUID.randomUUID());
    c.setName(body.name());
    c.setCpf(normalize(body.cpf()));
    c.setPhone(normalize(body.phone()));
    c.setPoints(0);
    
    OffsetDateTime now = OffsetDateTime.now();
    c.setCreatedAt(now);
    c.setUpdatedAt(now);
    
    customerRepository.save(c);
    return CustomerDto.fromEntity(c);
  }

  private static String normalize(String value) {
    if (value == null) return null;
    return value.replaceAll("\\D", "");
  }

  public record CustomerDto(String id, String name, String cpf, String phone, int points) {
    static CustomerDto fromEntity(Customer c) {
      return new CustomerDto(
          c.getId().toString(),
          c.getName(),
          c.getCpf(),
          c.getPhone(),
          c.getPoints());
    }
  }

  public record CreateCustomerRequest(@NotBlank String name, @NotBlank String cpf, @NotBlank String phone) {}
}
