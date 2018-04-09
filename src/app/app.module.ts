import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AuthService } from "./providers/auth.service";
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupComponent } from './signup/signup.component';
import { AngularFireDatabase } from "angularfire2/database";
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { BooksService } from './providers/books.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatInputModule, MatMenuModule, MatIconModule,
  MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDialogModule,MatProgressSpinnerModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BooksEditDialogComponent } from './books-edit-dialog/books-edit-dialog.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { LoginGuard } from './login.guard';

export const firebaseConfig = {
  apiKey: "AIzaSyD_bAKxXvW5xwQPrfdNuhOmRcifaBVs9IQ",
  authDomain: "demoproject-5373d.firebaseapp.com",
  databaseURL: "https://demoproject-5373d.firebaseio.com",
  projectId: "demoproject-5373d",
  storageBucket: "demoproject-5373d.appspot.com",
  messagingSenderId: "1062001801091"
}
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bookDetails', component: BooksDetailComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminHomePage', component: AdminHomePageComponent, canActivate: [AuthGuard] },
  { path: 'accessDenied', component: AccessDeniedPageComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SignupComponent,
    BooksDetailComponent,
    FilterPipe,
    AdminHomePageComponent,
    AdminLoginComponent,
    BooksEditDialogComponent,
    BookDetailComponent,
    AccessDeniedPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,MatCheckboxModule,MatCardModule,MatListModule,MatInputModule,MatMenuModule,MatIconModule,
    MatToolbarModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule,MatOptionModule,MatDialogModule,MatProgressSpinnerModule
  ],
  entryComponents: [BooksEditDialogComponent],
  providers: [AuthService, AngularFireDatabase, BooksService,AuthGuard,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
