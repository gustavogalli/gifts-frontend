import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  fullName: string = '';
  city: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = {
      username: this.username,
      fullName: this.fullName,
      city: this.city,
      password: this.password
    };
    
    this.authService.register(user).subscribe(
      (response) => {
        alert('Cadastro realizado com sucesso');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Erro ao cadastrar: ' + (error.error.message || 'Tente novamente.'));
      }
    );
  }
}
