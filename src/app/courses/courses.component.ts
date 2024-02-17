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
  isLoggedIn: boolean = false;

  courses = [
    {
      title: 'Course 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum.',
      imageSrc: '../assets/studio4.webp',
    },
    {
      title: 'Course 2',
      text: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      imageSrc: '../assets/studio3.webp',
    },
    {
      title: 'Course 3',
      text: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      imageSrc: '../assets/studio2.webp',
    },
    {
      title: 'Course 4',
      text: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      imageSrc: '../assets/studio1.webp',
    }
  ]


  constructor (private authService : AuthService) {}


  ngOnInit(){

    this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })

    //TESTING CALL TO API
    /*this.userService.getAllUsers().subscribe(data => {
      console.log("Got these users : " + JSON.stringify(data))
    })
    
    this.courseService.getCourseList().subscribe(data => {
      console.log("Got these courses : " + JSON.stringify(data))
    })*/

  }



  get buttonText(): string {
    return this.isLoggedIn ? 'Reserve Your Place' : 'Sign In to Reserve Your Place';
  }

}
