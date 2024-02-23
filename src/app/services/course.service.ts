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
    //return this.http.get('http://localhost:3000/courses');
    return this.http.get('http://be-studio-ghibli-load-balancer-789928797.us-east-1.elb.amazonaws.com/app/course/all')
  }
}
