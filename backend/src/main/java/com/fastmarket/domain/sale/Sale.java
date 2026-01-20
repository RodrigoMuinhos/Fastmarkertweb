package com.fastmarket.domain.sale;

import com.fastmarket.domain.customer.Customer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sales")
@Getter
@Setter
@NoArgsConstructor
public class Sale {

  @Id
  private UUID id;

  @Column(name = "total_cents", nullable = false)
  private int totalCents;

  @Column(name = "payment_method", nullable = false)
  private String paymentMethod;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id")
  private Customer customer;

  @Column(name = "points_earned", nullable = false)
  private int pointsEarned;

  @Column(name = "created_at", nullable = false)
  private OffsetDateTime createdAt;
  
  @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY)
  private List<SaleItem> items = new ArrayList<>();
}
