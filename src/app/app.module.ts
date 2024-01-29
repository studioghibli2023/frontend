import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerProfileComponent,
    AdminDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataViewModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
