package com.fastmarket.api;

import com.fastmarket.domain.product.Product;
import com.fastmarket.domain.product.ProductRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

  private final ProductRepository productRepository;

  public ProductsController(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @GetMapping
  public List<ProductDto> list(
      @RequestParam(name = "active", required = false) Boolean active,
      @RequestParam(name = "category", required = false) String category) {

    List<Product> products;

    boolean onlyActive = active == null || active;
    if (category != null && !category.isBlank()) {
      products = onlyActive
          ? productRepository.findByActiveTrueAndCategoryOrderByNameAsc(category)
          : productRepository.findAll().stream().filter(p -> category.equals(p.getCategory())).toList();
    } else {
      products = onlyActive ? productRepository.findByActiveTrueOrderByCategoryAscNameAsc() : productRepository.findAll();
    }

    return products.stream().map(ProductDto::fromEntity).toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ProductDto create(@Valid @RequestBody CreateProductRequest body) {
    Product p = new Product();
    p.setId(UUID.randomUUID());
    p.setName(body.name());
    p.setCategory(body.category());
    p.setActive(body.active());
    p.setImageUrl(body.imageUrl());
    p.setPriceCents(body.priceCents());
    p.setCreatedAt(OffsetDateTime.now());
    p.setUpdatedAt(OffsetDateTime.now());
    productRepository.save(p);
    return ProductDto.fromEntity(p);
  }

  @PatchMapping("/{id}")
  public ProductDto update(@PathVariable UUID id, @Valid @RequestBody UpdateProductRequest body) {
    Product p = productRepository.findById(id).orElseThrow();
    if (body.name() != null) p.setName(body.name());
    if (body.category() != null) p.setCategory(body.category());
    if (body.imageUrl() != null) p.setImageUrl(body.imageUrl());
    if (body.priceCents() != null) p.setPriceCents(body.priceCents());
    if (body.active() != null) p.setActive(body.active());
    p.setUpdatedAt(OffsetDateTime.now());
    productRepository.save(p);
    return ProductDto.fromEntity(p);
  }

  public record ProductDto(
      String id,
      String name,
      double price,
      String image,
      String category,
      boolean active) {

    static ProductDto fromEntity(Product p) {
      return new ProductDto(
          p.getId().toString(),
          p.getName(),
          Money.centsToReais(p.getPriceCents()),
          p.getImageUrl(),
          p.getCategory(),
          p.isActive());
    }
  }

  public record CreateProductRequest(
      @NotBlank String name,
      @NotBlank String category,
      @Min(0) int priceCents,
      String imageUrl,
      boolean active) {}

  public record UpdateProductRequest(
      String name,
      String category,
      Integer priceCents,
      String imageUrl,
      Boolean active) {}
}
