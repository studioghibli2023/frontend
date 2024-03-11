import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*canActivate(): boolean {
    if (!this.authService.isLoggedIn$()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }*/
  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn$().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/']); // Redirect to home or login page if not logged in
          return false;
        }
        return true;
      })
    );
  }
}
