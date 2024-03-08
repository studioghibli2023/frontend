import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseList() : Observable<any> {
    return this.http.get('http://localhost:8080/course/all');
    //return this.http.get('http://BE-studio-ghibli-load-balancer-1620050399.us-east-1.elb.amazonaws.com/app/course/all')
  }
}
