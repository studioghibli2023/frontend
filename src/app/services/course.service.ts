import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getCourseList() : Observable<any> {
    return this.http.get(`${this.url}course/all`);
  }

  updateCustomerCourse(userId: string, courseId: string): Observable<any> {
  
    let params = new HttpParams()
      .set('userId', userId)
      .set('courseId', courseId);

   
    return this.http.post(`${this.url}user/update`, null, {
      params: params,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      tap((response: any) => console.log("Update successful:", response)),
      catchError((error) => {
        console.error('Update failed:', error);
        return throwError(() => error);
      })
    );
  }
}
