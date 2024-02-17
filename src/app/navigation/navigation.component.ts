import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'] 
})
export class NavigationComponent implements OnInit  {
  
  private modalInstance: any;
 
  //LOGIN
  username: string = '';
  password: string = '';

  //REGISTRATION
  regName: string = ''
  email: string = '';
  regPass: string = '';

  isLoggedIn : boolean = false;
  currentUsername: string | null = null;
  loginError: boolean = false;

  private subscriptions: Subscription = new Subscription()


  constructor(public authService: AuthService, private router: Router) {}
  
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('registrationForm') registrationForm!: NgForm;

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$().subscribe(isLoggedIn => {
        console.log('IsLoggedIn updated:', isLoggedIn);
        this.isLoggedIn = isLoggedIn;
      })
    );

    this.subscriptions.add(
      this.authService.currentUsername$().subscribe(username => {
        console.log('CurrentUsername updated:', username);
        this.currentUsername = username;
      })
    );

  }

  openLoginModal() {
    if (!this.modalInstance) {
      const modalElement = document.getElementById('loginModal');
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
    this.modalInstance.show();
  }

  closeLoginModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }


  openRegistrationModal() {
    if (!this.modalInstance) {
      const modalElement = document.getElementById('registrationModal');
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
    this.modalInstance.show();
  }

  closeRegistrationModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }


  register(regName : string, email : string, regPass : string) {
    const user = {name: this.regName, email : this.email, password: this.regPass}
    console.log("USER - " + JSON.stringify(user))
    this.authService.registerUser(regName, email, regPass).subscribe({
      next:(response => {
        console.log("User registered successfully")
      })
    })
    this.clearFormAndCloseRegModal();
    this.router.navigate(['/customer'], {state: { user: user }});
  }

  clearFormAndCloseRegModal() {
    this.registrationForm.resetForm();
    const modalElement = document.getElementById('registrationModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }


  clearFormAndCloseLoginModal() {
    this.loginForm.resetForm();
    const modalElement = document.getElementById('loginModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }


  login(username: string, password: string): void {
    this.loginError = false;
    console.log('Attempting login with:', this.username, this.password);
    const success = this.authService.login(username, password);

    if (success) {
      console.log('Login successful!');
      this.router.navigate(['/customer']);
      this.clearFormAndCloseLoginModal();
    } else {
    console.log('Login failed!');
    this.loginError = true;
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
