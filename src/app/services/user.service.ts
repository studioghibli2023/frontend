import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  //url: string = 'http://localhost:8080/'
  url: string = 'http://BE-studio-ghibli-load-balancer-824035271.us-east-1.elb.amazonaws.com/app/'

  constructor(private http: HttpClient, private authService: AuthService) { }

  private isUserLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url+'user/all');
  }

  getOneUser(userId: number): Observable<any> {
    const requestUrl = `${this.url}user/obtain?customerId=${userId}`;
    return this.http.get(requestUrl);
  }




  //TO BE REMOVED...

  /*registerUser(name: string, email: string, password: string): Observable<any> {

    const url = `http://localhost:8080/user/save?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(url, '', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    });
  }



  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  
  currentUsername$(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }*/

}
