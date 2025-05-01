import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private cartService: CartService, 
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();

    this.cartItems.forEach(item => {
      if (!item.quantityInCart || item.quantityInCart < 1) {
        item.quantityInCart = 1;
      }
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage);
      return sum + discountedPrice * item.quantityInCart;
    }, 0);
  }

  getAvailableQuantities(item: Product): number[] {
    const max = Math.min(10, item.stockQuantity);
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  confirmPurchase(): void {
    console.log(this.cartItems)
    this.productService.purchaseProducts(this.cartItems).subscribe({
      next: () => {
        alert('Purchase successful!');
        this.cartService.clearCart();
        this.cartItems = [];
      },
      error: (err) => {
        console.error('Failure to confirm purchase:', err);
        alert('Failure to confirm purchase. Try again.');
      }
    });
  }
}
