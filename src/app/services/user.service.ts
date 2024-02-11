import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    //return this.http.get('http://localhost:3000/users');
    return this.http.get('http://localhost:8080/app/user/all');
  }

  registerUser(name: string, email: string, password: string): Observable<any> {

    let params = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('password', password);

    return this.http.post(this.url+'app/user/save', null, {params})
  }

}
