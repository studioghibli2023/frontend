import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
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

  private subscriptions: Subscription = new Subscription()


  constructor(public authService: AuthService, public userService: UserService, private router: Router) {}
  
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('registrationForm') registrationForm!: NgForm;

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      })
    );

    this.subscriptions.add(
      this.authService.currentUsername$().subscribe(username => {
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
    this.userService.registerUser(regName, email, regPass).subscribe({
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
    console.log('Attempting login with:', this.username, this.password);
    if (this.authService.login(this.username, this.password)) {
      console.log('Login successful!');
      this.clearFormAndCloseLoginModal();
      this.router.navigate(['/customer']);
    } else {
      console.log('Login failed!');
      // Show error message
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
