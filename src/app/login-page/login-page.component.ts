import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase } from "angularfire2/database";
import { Users } from "../Users";
import { FormGroup, FormBuilder, FormControl, Validators, FormArrayName } from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  users: Array<Users>;
  loginForm: FormGroup;
  loginError: boolean = false;
  errorMessage: string;
  isLoggedIn;

  constructor(public authService: AuthService, private router: Router, public angularFireDatabase: AngularFireDatabase, private fb: FormBuilder) {
    this.authService.isUserLoggedIn.subscribe(data => this.isLoggedIn = data);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then((data) => {
      this.authService.saveCurrentUser();
      this.router.navigate(['/bookDetails']);
    })
  }

  login() {
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    this.authService.login(email, password).then(
      (error) => {
        this.loginError = true;
        this.errorMessage = "Username and Password does not match"
        this.loginForm.get('password').setValue('');
        console.log(error);
      });
  }
  // this.angularFireDatabase.list('/Users', ref => ref.orderByChild('email').equalTo(email)).valueChanges().subscribe(data => console.log(data));

  resetForm() {
    this.loginForm.reset();
    this.loginError = false;
  }


}
