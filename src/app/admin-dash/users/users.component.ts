import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  Users: any

  constructor(private anyName2: UserService) { }

ngOnInit() {
  this.anyName2.getAllUsers().subscribe(data2 => {
    console.log("DATA2 = " + JSON.stringify(data2))
    this.Users = data2
  } )
}


/* export class AdminDashComponent implements OnInit {

  myCourses: any 

  constructor(private anyName: CourseService){ }

  ngOnInit(){ 
    this.anyName.getCourseList().subscribe(data => { 
      console.log("DATA =  " + JSON.stringify(data))
      this.myCourses = data
     } )

   }

} */
}
