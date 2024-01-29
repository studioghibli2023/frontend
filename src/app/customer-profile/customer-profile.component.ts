import { Component } from '@angular/core';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

  courses = [
    {
      "name": "course 1",
      "price": "100",
      "status": "full"

    },
    {
      "name": "course 2",
      "price": "599",
      "status": "available"
    }
  ]

}
