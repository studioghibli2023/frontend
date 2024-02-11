import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit {

  user: any

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    console.log("USER : " + this.user)
    this.user = navigation?.extras.state?.['user'];
  }

  ngOnInit(): void {
      if(!this.user){
        console.log('error!')
      }
  }

}
