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
    if (localStorage.getItem("isUserAuthorized").toString()=="false") {
      console.log(this.authService.isUserAuthorized.value);
      alert("User is not logged in");
      this.router.navigate(['/login']);
      return true;

    }
  }
}
