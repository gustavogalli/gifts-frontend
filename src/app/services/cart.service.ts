// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';

  constructor() {
    this.loadCart();
  }

  private cart: Product[] = [];

  private loadCart(): void {
    const data = localStorage.getItem(this.cartKey);
    this.cart = data ? JSON.parse(data) : [];
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.saveCart();
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(p => p !== product);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem(this.cartKey);
  }
}
