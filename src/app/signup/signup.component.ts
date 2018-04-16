import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import * as firebase from 'firebase';
import { querybase } from "querybase";
import { } from "module";
import { AngularFireDatabase } from "angularfire2/database";
import { Users } from "../Users";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  items: any;
  users: Array<Users>;
  signUpForm: FormGroup;
  constructor(public af: AuthService, private fb: FormBuilder,
    public router: Router, public authDatabase: AngularFireDatabase, public authService: AuthService) {
    this.users = [];
    this.createForm();
  }

  ngOnInit() {
    this.createForm()
  }
  createForm() {
    this.signUpForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      dob: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  signup() {
    // this.users.Phone = phone;
    let name = this.signUpForm.get('name').value;
    let email = this.signUpForm.get('email').value;
    let phone = this.signUpForm.get('phone').value;
    let dob = this.signUpForm.get('dob').value;
    let password = this.signUpForm.get('password').value;

    let user = new Users(phone, dob, name, password, null, email, null);
    this.users.push(user);
    console.log(this.users.forEach((values) => { console.log(values) }));

    //This code is to push the object into the database
    var ref = this.authDatabase.list('/Users').push(user);

    //This will create a new user with the email and password entered at the time of signup
    this.authService.af.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.updateUserDetails(user, name);
    });
    if (ref) {
      console.log("Data has been added successfully" + ref.key);
      ref.update({
        id: ref.key
      })
      this.authService.saveCurrentUser(name, phone, dob, email, password, ref.key);
    }

  }

  updateUserDetails(user, name) {
    let currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({
      displayName: name,
      photoURL: "https://lh6.googleusercontent.com/-za5iEk2DJLo/AAAAAAAAAAI/AAAAAAAAAB0/bGt3OIfbU-g/photo.jpg"
    })
  }

  resetForm() {
    this.signUpForm.reset();
  }
}
