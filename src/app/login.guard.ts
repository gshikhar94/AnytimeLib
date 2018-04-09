import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './providers/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService
    , private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn.value === true) {
      console.log(this.authService.isUserAuthorized.value);
      return true;
    }
    else {
      this.router.navigate(['/accessDenied']);
      return false;
    }
  }
}
