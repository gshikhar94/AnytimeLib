import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AuthService } from "./providers/auth.service";
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
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
  MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDialogModule, MatProgressSpinnerModule, MatTableModule
} from "@angular/material";
// import {StarRatingComponent} from "angular1-star-rating/src/star-rating.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { BooksEditDialogComponent } from './books-edit-dialog/books-edit-dialog.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { LoginGuard } from './login.guard';
import { HelperService } from './providers/helper.service';
import { BookLogsComponent } from './book-logs/book-logs.component';
import { AddBookComponent } from './add-book/add-book.component';

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
  { path: 'booklogs', component: BookLogsComponent, canActivate: [AuthGuard] },
  { path: 'bookDetails', component: BooksDetailComponent },
  { path: 'adminHomePage', component: AdminHomePageComponent, canActivate: [AuthGuard] },
  { path: 'accessDenied', component: AccessDeniedPageComponent },
  { path: 'addBook', component: AddBookComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupComponent,
    BooksDetailComponent,
    FilterPipe,
    AdminHomePageComponent,
    BooksEditDialogComponent,
    BookDetailComponent,
    AccessDeniedPageComponent,
    BookLogsComponent,
    AddBookComponent,
    // StarRatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatInputModule, MatMenuModule, MatIconModule, MatTableModule,
    MatToolbarModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatOptionModule, MatDialogModule, MatProgressSpinnerModule
  ],
  entryComponents: [BooksEditDialogComponent],
  providers: [AuthService, AngularFireDatabase, BooksService, AuthGuard, LoginGuard, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
