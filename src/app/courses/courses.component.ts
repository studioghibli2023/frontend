import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DialogModule } from 'primeng/dialog';

declare var bootstrap: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  private modalInstance: any;

  constructor (public authService : AuthService) {}

  openModal() {
    const modalElement = document.getElementById('basicModal');
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

}
