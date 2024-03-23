import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {

  selectedCourses: { [key: string]: string } = {};
  

  //Added ID to each customer here to allow course to be assigned more easily
  /*customers = [
    {
      id: '1',
      Name: 'Joe Bloggs',
      email: 'jb@abc.com',
      coursid: "M001"
    },
    {
      id: '2',
      Name: 'Mary Turner',
      email: 'mt@abc.com',
      coursid: "M002"
    },
    {
      id: '3',
      Name: 'Dave Turner',
      email: 'dt@abc.com',
      coursid: "M004"
    }
  ]*/



  /*courses = [
    {
      title: 'Movie making in 3D',
      courseid: "M001",
      description: 'This course will teach you how to make movies in 3D',
      price: 500,
      durtation: 15,
      imageSrc: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjcyMS0xOTQteC5qcGc.jpg',
    },
    {
      title: 'Movie making for beginners',
      courseid: "M002",
      description: 'This course will teach you the basic movie making techniques',
      price: 750,
      durtation: 8,
      imageSrc: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3L2pvYjk1MC0wNzAuanBn.jpg',
    },
    {
      title: 'Movie making for intermediates',
      courseid: "M003",
      description: 'This course will teach you the more advanced movie making techniques',
      price: 1000,
      durtation: 10,
      imageSrc: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyMy0wNjEtcC5wbmc.png',
    },
    {
      title: 'Movie making for advanced',
      courseid: "M004",
      description: 'This course will teach you how professional movie making techniques',
      price: 1250,
      durtation: 12,
      imageSrc: 'https://static.vecteezy.com/system/resources/previews/003/562/476/original/film-industry-glyph-icon-vector.jpg',
    }
  ]*/


  

  courses: any 
  customers: any

  constructor(private courseService: CourseService, private authService: AuthService, private userService: UserService){ }

  ngOnInit(){ 
    this.userService.getAllUsers().subscribe(data =>  {
      console.log(JSON.stringify(data))
      this.customers = data
    });

    this.courseService.getCourseList().subscribe(data =>  {
      console.log(JSON.stringify(data))
      this.courses = data
    });

  }

   activeTab: string = 'Customer Profile'; // Default tab
   selectTab(tabId: string): void {     this.activeTab = tabId;   }


  updateCustomerCourse(customerId: string) {
    const selectedCourseId = this.selectedCourses[customerId];
    if (!selectedCourseId) {
      alert('Please select a course first.');
      return;
    }

    this.courseService.updateCustomerCourse(customerId, selectedCourseId)
    .subscribe({
      next: (response) => {
        console.log('Customer course updated successfully', response);
      },
      error: (error) => {
        console.error('Error updating customer course', error);
      }
    });

  }

  onCourseSelected(courseId: string, customerId: string) {
    this.selectedCourses[customerId] = courseId;
  }


}

