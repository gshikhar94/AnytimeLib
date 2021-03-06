import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { Users } from "../Users";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HelperService } from './helper.service';

const isAuthorized = "isUserAuthorized";
const isLoggedIn = "isUserLoggedIn";

@Injectable()
export class AuthService {
  authState: any = null;
  isUserAuthorized = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(public af: AngularFireAuth, public database: AngularFireDatabase, public router: Router, public helperService: HelperService) {
    this.getAuthenticated();
  }

  loginWithGoogle() {
    return this.af.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        this.isUserLoggedIn.next(true);
        this.helperService.addToLocalStorage(isAuthorized, this.isUserAuthorized.value.toString());
        this.helperService.addToLocalStorage(isLoggedIn, this.isUserLoggedIn.value.toString());
        this.saveCurrentUser();
        this.router.navigate(['/bookDetails']);
      })
      .catch(error => {
        this.isUserLoggedIn.next(false);
        console.log("Error ocurrred while logging using facebook"+error);
        this.router.navigate(['/login'])
      });
  }

  loginWithFacebook() {
    return this.af.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .then(data => {
        this.isUserLoggedIn.next(true)
        this.helperService.addToLocalStorage(isAuthorized, this.isUserAuthorized.value.toString())
        this.helperService.addToLocalStorage(isLoggedIn, this.isUserLoggedIn.value.toString())
      })
      .catch(error => {
        this.isUserLoggedIn.next(false)
        this.router.navigate(['/login'])
      });
  }

  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(
      email,
      password
    ).then(user => {
      this.isUserLoggedIn.next(true);
      this.isUserAdmin(user);
      console.log(this.isUserAuthorized.value.toString());
    }).catch(error => {
      console.log("hi");
      this.isUserLoggedIn.next(false);
      this.router.navigate(['/login']);
      return error;
    })
  }

  logout() {
    this.isUserLoggedIn.next(false);
    this.isUserAuthorized.next(false);
    // this.af.auth.signOut();
    firebase.auth().signOut();
    this.helperService.addToLocalStorage(isAuthorized, this.isUserAuthorized.value.toString())
    this.helperService.addToLocalStorage(isLoggedIn, this.isUserLoggedIn.value.toString())
    alert("You have been logged out");
    this.router.navigate(['/login']);
  }

  getAuthenticated(): boolean {
    return firebase.auth() !== null;
  }
  getCurrentUser(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser : null;
  }
  getCurrentUserId(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser.uid : null;
  }
  getPhotoUrl(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser.photoURL : null;
  }
  getName(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser.displayName : null;
  }
  getEmail(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser.email : null;
  }
  getPhone(): any {
    return this.getAuthenticated() ? firebase.auth().currentUser.phoneNumber : null;
  }
  getCurrentUserObservable(): any {
    return this.af.authState;
  }
  saveCurrentUser(name?: string, phone?: string, dob?: string, email?: string, password?: string, id?: string) {
    console.log("hi");
    if (phone != undefined && dob != undefined && email != undefined && password != undefined) {
      let user = new Users(phone, dob, name, password, id, email, null);
      this.database.database.ref('/Users').child(id).set(user).
        then(success =>
          this.router.navigate(['/login']).
            catch(error =>
              console.log("Data has not been added to the database" + error))

        )
    }
    else {
      let user = new Users(this.getPhone(), null, this.getName(), null, this.getCurrentUserId(), this.getEmail(), this.getPhotoUrl());
      this.database.database.ref('/Users').child(this.getCurrentUserId()).set(user);
    }
  }
  getCurrentUserDetails(userId: string) {
    return this.database.list<Users>('/Users', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1)).valueChanges()
  }

  isUserAdmin(user) {
    console.log(user.uid);
    console.log("Email we got is " + user.email);
    this.database.list<Users>("/Users", ref => ref.orderByChild('email').equalTo(user.email)).valueChanges().subscribe(data => {
      console.log(data[0]['email']);
      if (data[0]['email'] === user.email) {
        console.log(data[0]['role']);
        if (data[0]['role'] === "admin") {
          this.isUserAuthorized.next(true);
          this.helperService.addToLocalStorage(isAuthorized, this.isUserAuthorized.value.toString())
          this.helperService.addToLocalStorage(isLoggedIn, this.isUserLoggedIn.value.toString())
          this.router.navigate(['/adminHomePage']);
          return true;
        }
        else {
          this.isUserAuthorized.next(false);
          this.router.navigate(['/bookDetails']);
          return false;
        }
      }
      else {
        return false;
      }
    })
  }
}
