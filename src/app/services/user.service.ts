import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'
import { tap } from 'rxjs/operators';
import { AuthService  } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private currentUsername = new BehaviorSubject<string | null>(localStorage.getItem('currentUsername'));
  url: string = 'http://localhost:8080/'

  constructor(private http: HttpClient, private authService: AuthService) { }

  private isUserLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  }

  getAllUsers(): Observable<any> {
    //return this.http.get('http://localhost:3000/users');
    //return this.http.get('http://localhost:8080/app/user/all');
    return this.http.get('http://be-studio-ghibli-load-balancer-789928797.us-east-1.elb.amazonaws.com/app/user/all')
  }

  

  registerUser(name: string, email: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('password', password);

    // Note: Adjust the API endpoint as needed
    return this.http.post<any>(`${this.url}app/user/save`, null, { params }).pipe(
      tap((response: any) => {
        // Assuming the response from your server includes a field to indicate success
        // and potentially the user's information. Adjust based on your actual API response.
        if (response && response.success) {
          // If registration is successful, update the login state and username
          // through AuthService. This assumes you have an AuthService method to
          // handle this update.
          this.authService.updateLoginStatus(true, name);
        }
      })
    );
  }


  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  
  currentUsername$(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }

}
