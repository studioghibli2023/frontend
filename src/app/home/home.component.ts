import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  username: string = '';
  password: string = '';

  constructor (private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Attempting login with:', this.username, this.password);
    if (this.authService.login(this.username, this.password)) {
      console.log('Login successful!');
      this.router.navigate(['/customer']);
    } else {
      console.log('Login failed!');
      // Show error message
    }
  }

}
