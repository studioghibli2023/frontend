import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


declare var bootstrap: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  isLoggedIn: boolean = false;
  currentUsername: string | null = null;

  showModal: boolean = false;
  selectedCourse: any = null;

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

    this.authService.currentUsername$().subscribe(username => {
      this.currentUsername = username;
    });
  }

  openModal(course: any): void {
    if (this.isLoggedIn) {
      this.selectedCourse = course;
      this.showModal = true;
    }
  }


  confirmSignup(): void {
    console.log(`Signing up ${this.currentUsername} for ${this.selectedCourse.title}`);
    // Implement your signup logic here
    this.closeModal();
  }


  closeModal(): void {
    this.showModal = false;
  }





  get buttonText(): string {
    return this.isLoggedIn ? 'Reserve Your Place' : 'Sign In to Reserve Your Place';
  }

}
