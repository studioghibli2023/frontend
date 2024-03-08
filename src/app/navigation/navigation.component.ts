import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

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
  course: string = '';

  //REGISTRATION
  regName!: string;
  email!: string
  regPass!: string

  isLoggedIn : boolean = false;
  currentUsername: string | null = null;
  loginError: boolean = false;


  private subscriptions: Subscription = new Subscription()

  constructor(public authService: AuthService, private router: Router, public userService: UserService) {}
  
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


  login(email: string, password: string): void {
    this.loginError = false;
    console.log('Attempting login with:', email, password);
    let user: { email: string; [key: string]: any } = { email: email };

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful!', response);            
        this.userService.getOneUser(response.id).subscribe({
          next: (data) => {
            user = {
              ...user,
              id: data.id,
              name: data.name,
              userRole: data.userRole,
              course: data.course,
              adminUser: data.adminUser
            }
            this.clearFormAndCloseLoginModal();
            this.router.navigate(['/customer'], {state: { user: user }});
          },
          error: (error) => { 
            console.error('Error fetching user:', error);
          }
        }) 
      },
      error: (error) => {
        console.log('Login failed!', error)
        this.loginError = true
      }
    });
  }


  register(regName : string, email : string, regPass : string) {
    const user = {name: this.regName, email : this.email, password: this.regPass}
    console.log("USER - " + JSON.stringify(user))
    this.authService.registerUser(regName, email, regPass).subscribe({
      next:(response => {
        console.log("User registered successfully")
        this.clearFormAndCloseRegModal();
        this.router.navigate(['/customer'], {state: { user: user }});
      })
    })
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


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
