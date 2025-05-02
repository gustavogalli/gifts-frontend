import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  categories: string[] = [];
  isAdmin: boolean = false;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    localStorage.getItem('fullName') == 'Admin' ? this.isAdmin = true : this.isAdmin = false;

    this.productService.getAllCategories().subscribe(
      data => {
        this.categories = data.sort((a, b) => a.localeCompare(b));
      },
      err => console.error('Failed to get categories:', err)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
