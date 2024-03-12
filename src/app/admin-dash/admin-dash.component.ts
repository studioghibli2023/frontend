import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {

  customerId!: number
  courseId!: number
  
  customers = [
    {
      Name: 'Joe Bloggs',
      email: 'jb@abc.com',
      coursid: "M001"
    },
    {
      Name: 'Mary Turner',
      email: 'mt@abc.com',
      coursid: "M002"
    },
    {
      Name: 'Dave Turner',
      email: 'dt@abc.com',
      coursid: "M004"
    }
  ]



  courses = [
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
  ]


  

  myCourses: any 

  constructor(private anyName: CourseService, private authService: AuthService){ }

  ngOnInit(){ 
    this.anyName.getCourseList().subscribe(data => { 
      console.log("DATA =  " + JSON.stringify(data))
      this.myCourses = data
     } )

   }

   activeTab: string = 'Customer Profile'; // Default tab
   selectTab(tabId: string): void {     this.activeTab = tabId;   }


   updateUserCourse() {

    console.log(this.courseId)

    /*this.authService.updateUserCourse(this.customerId, this.courseId).subscribe({
      next: (response) => {
        console.log('Update successful', response);
      },
      error: (error) => {
        console.error('Update failed', error);
      },
    });*/
  }


}

