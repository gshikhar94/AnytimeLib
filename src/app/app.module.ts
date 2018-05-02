import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AuthService } from "./providers/auth.service";
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { BooksService } from './providers/books.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FilterPipe } from './filter.pipe';
import { HelperService } from './providers/helper.service';
import { ServiceWorkerModule } from "@angular/service-worker";
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatInputModule, MatMenuModule, MatIconModule,
  MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDialogModule, MatProgressSpinnerModule,
  MatTableModule, MatTabsModule,MatTooltipModule, MatDatepickerModule, DateAdapter, MatNativeDateModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { BooksEditDialogComponent } from './books-edit-dialog/books-edit-dialog.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { BookLogsComponent } from './book-logs/book-logs.component';
import { AddBookComponent } from './add-book/add-book.component';
import { SpinnerComponent } from './spinner/spinner.component';

export const firebaseConfig = {
  apiKey: "AIzaSyD_bAKxXvW5xwQPrfdNuhOmRcifaBVs9IQ",
  authDomain: "demoproject-5373d.firebaseapp.com",
  databaseURL: "https://demoproject-5373d.firebaseio.com",
  projectId: "demoproject-5373d",
  storageBucket: "demoproject-5373d.appspot.com",
  messagingSenderId: "1062001801091"
}

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AdminHomePageComponent,
    BooksEditDialogComponent,
    BookDetailComponent,
    AccessDeniedPageComponent,
    BooksDetailComponent,
    LoginPageComponent,
    SignupComponent,
    BookLogsComponent,
    AddBookComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatInputModule,
    MatMenuModule, MatIconModule, MatTableModule, MatToolbarModule, MatSelectModule, MatFormFieldModule,
    ReactiveFormsModule, MatOptionModule, MatDialogModule, MatProgressSpinnerModule,
    MatTabsModule, AppRoutingModule,MatTooltipModule,MatDatepickerModule,MatNativeDateModule,
  ],
  entryComponents: [BooksEditDialogComponent],
  providers: [AuthService, AngularFireDatabase, BooksService, HelperService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }  
