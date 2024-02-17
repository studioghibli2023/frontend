import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private currentUsername = new BehaviorSubject<string | null>(localStorage.getItem('currentUsername'));

  url: string = 'http://localhost:8080/'

  //REMOVE THESE AFTER TESTING!!!!!
  private validUsername = 'admin';
  private validPassword = 'password123';

  constructor(private http: HttpClient) { }

  private isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public updateLoginStatus(isLoggedIn: boolean, username?: string): void {
    this.isLoggedIn.next(isLoggedIn);
    if (username) {
      this.currentUsername.next(username);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUsername', username);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUsername');
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.isLoggedIn.next(true);
      this.currentUsername.next(username);
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUsername', username)
      return true;
    } else {
      this.isLoggedIn.next(false);
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('currentUsername')
      return false;
    }

    


    //API Call when implemented
    /*let userParams = new HttpParams()
      .set('name', username)
      .set('password', password);

    return this.http.post(this.url+'app/login', null, {userParams})*/


  }


  registerUser(name: string, email: string, password: string): Observable<any> {
    const mockResponse = {success: true}
    let params = new HttpParams().set('name', name).set('email', email).set('password', password);
    //return this.http.post<any>(`${this.url}app/user/save`, null, { params }).pipe(
      return of(mockResponse).pipe(
      tap((response: any) => {
        if (response && response.success) {
          this.updateLoginStatus(true, name);
        }
      })
    );
  }
  


  logout(): void {
    this.isLoggedIn.next(false);
    this.currentUsername.next(null);
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUsername')
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  currentUsername$(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }



}