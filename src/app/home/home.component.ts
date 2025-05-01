import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  products: Product[] = [];
  productsOnSale: Product[] = [];
  bestSellers: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  salePage = 0;
  pageCount = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    const name = localStorage.getItem('fullName');

    if (name) {
      this.username = name.split(' ')[0] || 'User';
    }

    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data.filter(p => p.stockQuantity > 0).sort((a, b) => b.stockQuantity - a.stockQuantity);

        this.productsOnSale = data
          .filter(p => p.discountPercentage > 0)
          .sort((a, b) => b.discountPercentage - a.discountPercentage);

        this.pageCount = Math.ceil(this.productsOnSale.length / 4);

        this.bestSellers = [...data]
          .sort((a, b) => b.soldQuantity - a.soldQuantity)
          .slice(0, 3);

        this.categories = [...new Set(data.map(p => p.category))]
          .filter(c => !!c)
          .sort((a, b) => a.localeCompare(b));

      },
      err => console.error('Failed to get products:', err)
    );
  }

  prevSale(): void {
    if (this.salePage > 0) {
      this.salePage--;
    }
  }

  nextSale(): void {
    if (this.salePage < this.pageCount - 1) {
      this.salePage++;
    }
  }

  get currentSaleSlice(): Product[] {
    const start = this.salePage * 4;
    return this.productsOnSale.slice(start, start + 4);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`"${product.name}" added to cart!`);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
