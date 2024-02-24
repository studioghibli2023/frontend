import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {

  myCourses: any 

  constructor(private anyName: CourseService){ }

  ngOnInit(){ 
    this.anyName.getCourseList().subscribe(data => { 
      console.log("DATA =  " + JSON.stringify(data))
      this.myCourses = data
     } )

   }

}

