package com.fastmarket.api;

import com.fastmarket.domain.customer.Customer;
import com.fastmarket.domain.customer.CustomerRepository;
import com.fastmarket.domain.product.Product;
import com.fastmarket.domain.product.ProductRepository;
import com.fastmarket.domain.sale.Sale;
import com.fastmarket.domain.sale.SaleItem;
import com.fastmarket.domain.sale.SaleItemRepository;
import com.fastmarket.domain.sale.SaleRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

  private final SaleRepository saleRepository;
  private final SaleItemRepository saleItemRepository;
  private final ProductRepository productRepository;
  private final CustomerRepository customerRepository;

  public SalesController(
      SaleRepository saleRepository,
      SaleItemRepository saleItemRepository,
      ProductRepository productRepository,
      CustomerRepository customerRepository) {
    this.saleRepository = saleRepository;
    this.saleItemRepository = saleItemRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @Transactional
  public CreateSaleResponse create(@Valid @RequestBody CreateSaleRequest body) {
    Customer customer = null;
    if (body.customerId() != null && !body.customerId().isBlank()) {
      customer = customerRepository.findById(UUID.fromString(body.customerId())).orElse(null);
    }

    // Calcula total e valida itens
    int totalCents = 0;
    List<SaleItem> itemsToSave = new ArrayList<>();

    Sale sale = new Sale();
    sale.setId(UUID.randomUUID());
    sale.setPaymentMethod(body.paymentMethod());
    sale.setCustomer(customer);
    sale.setCreatedAt(OffsetDateTime.now());

    for (SaleItemRequest itemReq : body.items()) {
      UUID productId = UUID.fromString(itemReq.productId());
      Product product = productRepository.findById(productId).orElseThrow();

      int unitPriceCents = product.getPriceCents();
      int lineTotalCents = unitPriceCents * itemReq.quantity();
      totalCents += lineTotalCents;

      SaleItem item = new SaleItem();
      item.setId(UUID.randomUUID());
      item.setSale(sale);
      item.setProduct(product);
      item.setQuantity(itemReq.quantity());
      item.setUnitPriceCents(unitPriceCents);
      item.setLineTotalCents(lineTotalCents);
      itemsToSave.add(item);
    }

    sale.setTotalCents(totalCents);

    int pointsEarned = (customer != null) ? (int) Math.floor(Money.centsToReais(totalCents) * 10.0) : 0;
    sale.setPointsEarned(pointsEarned);

    saleRepository.save(sale);
    saleItemRepository.saveAll(itemsToSave);

    if (customer != null && pointsEarned > 0) {
      customer.setPoints(customer.getPoints() + pointsEarned);
      customer.setUpdatedAt(OffsetDateTime.now());
      customerRepository.save(customer);
    }

    return new CreateSaleResponse(
        sale.getId().toString(),
        Money.centsToReais(totalCents),
        sale.getPaymentMethod(),
        customer != null ? customer.getId().toString() : null,
        pointsEarned);
  }

  @GetMapping
  public List<SaleDto> getAll() {
    return saleRepository.findAll().stream()
        .map(sale -> new SaleDto(
            sale.getId().toString(),
            Money.centsToReais(sale.getTotalCents()),
            sale.getPaymentMethod(),
            sale.getCustomer() != null ? sale.getCustomer().getId().toString() : null,
            sale.getPointsEarned(),
            sale.getCreatedAt().toString()))
        .toList();
  }

  @GetMapping("/{id}")
  @Transactional(readOnly = true)
  public SaleDetailDto getById(@PathVariable String id) {
    Sale sale = saleRepository.findById(UUID.fromString(id)).orElseThrow();
    
    // Force initialization of items within the transaction
    List<SaleItemDto> items = sale.getItems().stream()
        .map(item -> new SaleItemDto(
            item.getProduct().getId().toString(),
            item.getProduct().getName(),
            item.getQuantity(),
            Money.centsToReais(item.getUnitPriceCents()),
            Money.centsToReais(item.getLineTotalCents())))
        .toList();
    
    return new SaleDetailDto(
        sale.getId().toString(),
        Money.centsToReais(sale.getTotalCents()),
        sale.getPaymentMethod(),
        sale.getCustomer() != null ? sale.getCustomer().getId().toString() : null,
        sale.getPointsEarned(),
        sale.getCreatedAt().toString(),
        items);
  }

  public record CreateSaleRequest(
      @NotEmpty List<@Valid SaleItemRequest> items,
      @NotBlank String paymentMethod,
      String customerId) {}

  public record SaleItemRequest(@NotBlank String productId, @Min(1) int quantity) {}

  public record CreateSaleResponse(
      String id,
      double total,
      String paymentMethod,
      String customerId,
      int pointsEarned) {}

  public record SaleDto(
      String id,
      double total,
      String paymentMethod,
      String customerId,
      int pointsEarned,
      String createdAt) {}
  
  public record SaleDetailDto(
      String id,
      double total,
      String paymentMethod,
      String customerId,
      int pointsEarned,
      String createdAt,
      List<SaleItemDto> items) {}
  
  public record SaleItemDto(
      String productId,
      String productName,
      int quantity,
      double unitPrice,
      double lineTotal) {}
}
