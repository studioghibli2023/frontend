import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'customer', /*canActivate: [AuthGuard], */ component: CustomerProfileComponent },
  { path: 'admin', component: AdminDashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

