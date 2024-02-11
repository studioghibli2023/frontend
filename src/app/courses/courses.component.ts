import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

declare var bootstrap: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  private modalInstance: any;
  isLoggedIn = false;

  username: string = '';
  password: string = '';

  constructor (public authService : AuthService, public userService: UserService, public courseService: CourseService, private router: Router) {}


  ngOnInit(){
    this.userService.getAllUsers().subscribe(data => {
      console.log("Got these users : " + JSON.stringify(data))
    })
    
    this.courseService.getCourseList().subscribe(data => {
      console.log("Got these courses : " + JSON.stringify(data))
    })

  }



  /*get buttonText(): string {
    return this.isLoggedIn ? 'Reserve Your Place' : 'Sign In to Reserve Your Place';
  }*/

}
