import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { BooksEditDialogComponent } from './books-edit-dialog/books-edit-dialog.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { BookLogsComponent } from './book-logs/book-logs.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LoginGuard } from './login.guard';

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
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
