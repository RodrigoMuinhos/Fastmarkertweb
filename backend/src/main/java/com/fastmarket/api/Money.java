package com.fastmarket.api;

public final class Money {
  private Money() {}

  public static int reaisToCents(double reais) {
    return (int) Math.round(reais * 100.0);
  }

  public static double centsToReais(int cents) {
    return cents / 100.0;
  }
}
