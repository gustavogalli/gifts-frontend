import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getAllProducts().subscribe(products => {
      const found = products.find(p => p.id === productId);
      if (found) {
        this.product = found;
        this.product.quantityInCart = 1;
      }
    });
  }

  getAvailableQuantities(): number[] {
    const max = Math.min(10, this.product.stockQuantity);
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`"${product.name}" added to cart!`);
  }
}
