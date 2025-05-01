import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data.filter(p => p.stockQuantity > 0);

        this.categories = [...new Set(this.products.map(p => p.category))]
          .filter(c => !!c)
          .sort((a, b) => a.localeCompare(b));

        this.filterProducts();
      },
      err => console.error('Failed to get products:', err)
    );
  }

  filterProducts(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    let filtered = this.products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTermLower);
      const matchesCategory = this.selectedCategory ? p.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      const catCompare = a.category.localeCompare(b.category);
      if (catCompare !== 0) return catCompare;

      const discountCompare = (b.discountPercentage || 0) - (a.discountPercentage || 0);
      if (discountCompare !== 0) return discountCompare;

      return a.name.localeCompare(b.name);
    });

    this.filteredProducts = filtered;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`"${product.name}" added to cart!`);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
