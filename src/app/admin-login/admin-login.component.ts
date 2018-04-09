import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase } from "angularfire2/database";
import { Admin } from "../Admin";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, public angularFireDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.authService.getCurrentUserObservable().subscribe(user => {
      if (user) {
        // this.authService.saveCurrentUser();
        this.router.navigate(['/adminHomePage']);
      }
    })

  }
  loginWithGoogle() {
    this.authService.loginWithGoogle().then((data) => {
      this.router.navigate(['/adminHomePage']);

    })
  }

  adminLogin(email: string, password: string) {
    this.angularFireDatabase.list('/Admin', ref => ref.orderByChild('userName').equalTo(email)).valueChanges().subscribe(data => console.log(data));
  }
}
