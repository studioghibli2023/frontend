import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private currentUsername = new BehaviorSubject<string | null>(localStorage.getItem('currentUsername'));

  url: string = 'http://BE-studio-ghibli-load-balancer-1666703620.us-east-1.elb.amazonaws.com/app/'


  constructor(private http: HttpClient) { }

  private isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public updateLoginStatus(isLoggedIn: boolean, email?: string): void {
    this.isLoggedIn.next(isLoggedIn);
    if (email) {
      this.currentUsername.next(email);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUsername', email);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUsername');
    }
  }


    login(email: string, password: string): Observable<any> {
      const loginUrl = `${this.url}user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      return this.http.get<any>(loginUrl).pipe(
        tap(
          (response) => {
            console.log('Login response:', response);
            //if (response && response.success) {

              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('currentUsername', email);
              this.isLoggedIn.next(true)
              this.currentUsername.next(email);
            //}
          },
          (error) => console.error('Login error:', error.status)
        )
      );
    }


  registerUser(name: string, email: string, password: string): Observable<any> {
    let params = new HttpParams().set('name', name).set('email', email).set('password', password);
    return this.http.post<any>(`${this.url}user/save`, null, { params }).pipe(
      tap((response: any) => {
        //if (response && response.success) {
          console.log("THE NAME IS HERE : " + email)
          this.isLoggedIn.next(true);
          this.currentUsername.next(email);
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('currentUsername', email)
        //}
      })
    );
  }

  registerPlusCourse(name: string, email: string, password: string, course: string): Observable<any> {
    let params = new HttpParams().set('name', name).set('email', email).set('password', password).set('course', course)
    console.log("Params reaching service = " + params)
    return this.http.post<any>(`${this.url}user/save`, null, { params }).pipe(
      tap((response: any) => {
        //if (response && response.success) {
          console.log("THE NAME IS HERE : " + email)
          this.isLoggedIn.next(true);
          this.currentUsername.next(email);
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('currentUsername', email)
        //}
      })
    );
  }

  
  updateUserCourse(customerId: string, courseId: string): Observable<any> {
    const url = `${this.url}user/save`
    const requestBody = { customerId, courseId };
    return this.http.post(url, requestBody);
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