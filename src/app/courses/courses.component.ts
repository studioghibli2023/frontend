import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

declare var bootstrap: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  isLoggedIn: boolean = false;
  currentUsername: string | null = null;

  //REGISTRATION
  name!: string;
  email!: string
  password!: string
  course!: string

  showModal: boolean = false;
  selectedCourse: any = null;
  courseId!: number;


  userID!: string;
  courseID!: string;

  courses = [
    {
      id: 1,
      name: 'Course 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum.',
      image: '../assets/studio4.webp',
      price: '9.95',
      duration: 1
    },
    {
      id: 2,
      name: 'Course 2',
      description: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      image: '../assets/studio3.webp',
      price: '19.95',
      duration: 2
    },
    {
      id: 3,
      name: 'Course 3',
      description: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      image: '../assets/studio2.webp',
      price: '99.95',
      duration: 3
    },
    {
      id: 4,
      name: 'Course 4',
      description: 'Vivamus laoreet non mauris eget mattis. Vestibulum ante ipsum primis in faucibus orci.',
      image: '../assets/studio1.webp',
      price: '199.95',
      duration: 5
    }
  ]


  constructor (private authService : AuthService,
      private userService: UserService,
      private courseService: CourseService,
      private router: Router) {}


  ngOnInit(){
    this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })

    this.authService.currentUsername$().subscribe(username => {
      this.currentUsername = username;
    });

    this.userService.getAllUsers().subscribe(data =>  {
      console.log(JSON.stringify(data))
    });

    this.courseService.getCourseList().subscribe(data =>  {
      console.log(JSON.stringify(data))
    });

    
  }

  openModal(course: any): void {
      this.selectedCourse = course;
      this.showModal = true;
  }


  registerForCourse(name : string, email : string, password : string) {

    const user = {name: name, email : email, password: password, course: this.selectedCourse.name}
    console.log("USER - " + JSON.stringify(user))
    this.authService.registerPlusCourse(name, email, password, this.selectedCourse.name).subscribe({
      next:(response => {
        console.log("User registered successfully")
        this.closeModal();
        this.router.navigate(['/customer'], {state: { user: user }});
      })
    })
    console.log("Registering for : " + name, this.selectedCourse.name, email)
  }


  /*updateUserCourse(userid: string, courseid: string) {
    //const customerId = '123'; 
    //const courseId = 'abc';
  
    this.authService.updateUserCourse(userid, courseid).subscribe({
      next: (response) => {
        console.log('Update successful', response);
      },
      error: (error) => {
        console.error('Update failed', error);
      },
    });
  }*/

  confirmSignup(courseId: number): void {
    console.log(`Signing up ${this.currentUsername} for ${this.selectedCourse.title}`);
    console.log('The course ID for this course is ' + courseId)
    this.closeModal();
  }


  closeModal(): void {
    this.showModal = false;
  }



  get buttonText(): string {
    return this.isLoggedIn ? 'Reserve Your Place' : 'Sign In to Reserve Your Place';
  }

  currentUserIsRegisteredForAnyCourse(): boolean {
    // Implement the actual logic here to determine if the user is already registered
    // This could involve checking a property of the current user object, or making an API call
    return false; // Placeholder return value
}

}
