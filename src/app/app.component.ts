import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn;
  isUserAuthorized;
  constructor(public afAuth: AngularFireAuth, public authService: AuthService) {
    this.authService.isUserLoggedIn.subscribe(value => {
      this.isLoggedIn = value
      console.log(this.isLoggedIn);
    });
    this.authService.isUserAuthorized.subscribe(value => {
      this.isUserAuthorized = value
      console.log(this.isUserAuthorized);
    });
  }
  // login() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //  }

}
