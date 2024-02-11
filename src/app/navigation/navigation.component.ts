import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'] 
})
export class NavigationComponent  {
  
  private modalInstance: any;
 
  username: string = '';

  name: string = ''
  email: string = '';
  password: string = '';

  isLoggedIn : boolean = false;
  currentUsername : string = '';


  constructor(public authService: AuthService, public userService: UserService, private router: Router) {}
  
  @ViewChild('registrationForm') registrationForm!: NgForm;

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


  register(name : string, email : string, password : string) {
    const user = {name: this.name, email : this.email, password: this.password}
    console.log("USER - " + JSON.stringify(user))
    this.userService.registerUser(name, email, password).subscribe({
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


  logout(){

  }

}
