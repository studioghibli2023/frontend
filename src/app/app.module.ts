import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AuthService } from './services/auth.service';
import { CoursesComponent } from './courses/courses.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './admin-dash/users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerProfileComponent,
    AdminDashComponent,
    CoursesComponent,
    NavigationComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    // NgbModule 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
