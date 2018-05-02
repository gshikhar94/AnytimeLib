import { Component, OnInit, Input } from '@angular/core';
import { book } from "../book";
import { BooksService } from "../providers/books.service";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../providers/auth.service";
import { Users } from '../Users';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksEditDialogComponent } from "../books-edit-dialog/books-edit-dialog.component";

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css'],
})

export class BooksDetailComponent implements OnInit {

  categories = ['Technical', 'Fiction', 'Non-Fiction'];
  isDisabled: boolean = false;
  issued: number;
  selectedBook: Observable<book>;
  filteredBooks: Observable<book[]>;
  category: string[];
  isIssued: boolean;
  isAuthorized: boolean;
  searchValue;

  constructor(public booksService: BooksService, public authService: AuthService, public dialog: MatDialog) {
    this.booksService.getJson();
    this.authService.isUserAuthorized.subscribe(value => {
      console.log(this.isAuthorized);
      this.isAuthorized = value
    });
  }

  ngOnInit() {
    this.filteredBooks = this.booksService.getBooksDetail();
  }

  removeFilter(property: string) {
    this.category = null;
    this.filteredBooks = this.booksService.getBooksDetail();
  }

  searchSomething(searchString: string[], property: string) {
    console.log(this.category);
    this.filteredBooks = this.filteredBooks
      .map(books =>
        books.filter(book => {
          for (let i = 0; i < this.category.length; i++) {
            if (this.category[i].toLowerCase() === book.category.toLowerCase()) {
              return true;
            }
          }
          return false;
        }));
  }

  filterSearch(searchString: string, property: string) {
    console.log(searchString);
    if (searchString === undefined) {
      return this.filteredBooks;
    }
    else {
      this.filteredBooks = this.filteredBooks.
        map(books =>
          books.filter(book => {
            return book.name.toLowerCase().includes(searchString.toLowerCase());
          })
        )
    }
  }

  openDialog(book: book) {
    let dialogRef = this.dialog.open(BooksEditDialogComponent, {
      width: '250 px',
      data: {
        bookDetails: book,
      }
    });
    console.log(book);
  }

  deleteBook(bookId: number) {
    this.booksService.deleteBook(bookId);
  }


  selectBook(book) {
    this.booksService.isIssued.next(false);
    this.selectedBook = book;
    this.booksService.checkBookIssued(book.id);
  }

  likes(id: number) {
    this.booksService.likeBook(id);
    this.isDisabled = true;
  }

  isUserAuthorized() {
    return localStorage.getItem('isUserAuthorized');
  }

  isUserLoggedIn() {
    console.log("isLogged In-" + localStorage.getItem('isUserLoggedIn'));
    return localStorage.getItem('isUserLoggedIn');
  }
}