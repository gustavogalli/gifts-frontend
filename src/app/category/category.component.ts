import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName: string = '';
  products: Product[] = [];
  product!: Product;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryName).subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          selectedQuantity: Math.min(1, product.stockQuantity)
        })).sort((a, b) => {
          if (b.discountPercentage !== a.discountPercentage) {
            return b.discountPercentage - a.discountPercentage;
          }
          return a.name.localeCompare(b.name);
        });
        this.products.forEach(product => product.quantityInCart = 1);
      },
      err => console.error('Failed to get products for category:', err)
    );
  }

  getAvailableQuantities(product: Product): number[] {
    const max = Math.min(10, product.stockQuantity);
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`"${product.name}" added to cart!`);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
