import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedSort = '';
  showModal = false;
  editingProductId: number | null = null;
  searchTerm: string = '';

  newProduct: Omit<Product, 'id'> = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stockQuantity: 0,
    soldQuantity: 0,
    quantityInCart: 0,
    discountPercentage: 0
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProducts();
      },
      error: (err) => console.error('Failed to get products:', err)
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }

  openModal(): void {
    this.showModal = true;
    this.resetNewProduct();
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProductId = null;
    this.resetNewProduct();
  }

  resetNewProduct(): void {
    this.newProduct = {
      name: '',
      description: '',
      category: '',
      price: 0,
      stockQuantity: 0,
      soldQuantity: 0,
      quantityInCart: 0,
      discountPercentage: 0
    };
  }

  saveProduct(): void {
    if (this.editingProductId) {
      this.productService.updateProduct(this.editingProductId, this.newProduct).subscribe({
        next: (updated) => {
          const index = this.products.findIndex(p => p.id === this.editingProductId);
          if (index > -1 && updated) {
            this.products[index] = updated;
            this.filteredProducts = [...this.products];
          }
          this.closeModal();
          alert(`Product "${updated.name}" updated successfully!`);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Error updating product');
        }
      });
    } else {
      this.productService.createProduct(this.newProduct).subscribe({
        next: (created) => {
          this.products.push(created);
          this.filteredProducts = [...this.products];
          this.closeModal();
          alert(`Product "${created.name}" added successfully!`);
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert('Error creating product');
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.editingProductId = product.id!;
    this.newProduct = { ...product };
    this.showModal = true;
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          this.filteredProducts = [...this.products];
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Error deleting product');
        }
      });
    }
  }

  applySearch(): void {
    this.filterProducts();
  }

  applySort(): void {
    this.filterProducts();
  }

  filterProducts(): void {
    const searchLower = this.searchTerm.toLowerCase();

    let filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      (product.category?.toLowerCase() || '').includes(searchLower)
    );

    switch (this.selectedSort) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-disc-asc':
        filtered.sort((a, b) => (a.price * (1 - a.discountPercentage)) - (b.price * (1 - b.discountPercentage)));
        break;
      case 'price-disc-desc':
        filtered.sort((a, b) => (b.price * (1 - b.discountPercentage)) - (a.price * (1 - a.discountPercentage)));
        break;
      case 'stock-asc':
        filtered.sort((a, b) => a.stockQuantity - b.stockQuantity);
        break;
      case 'stock-desc':
        filtered.sort((a, b) => b.stockQuantity - a.stockQuantity);
        break;
      case 'sold-asc':
        filtered.sort((a, b) => a.soldQuantity - b.soldQuantity);
        break;
      case 'sold-desc':
        filtered.sort((a, b) => b.soldQuantity - a.soldQuantity);
        break;
      case 'disc-asc':
        filtered.sort((a, b) => a.discountPercentage - b.discountPercentage);
        break;
      case 'disc-desc':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }

    this.filteredProducts = filtered;
  }

}
