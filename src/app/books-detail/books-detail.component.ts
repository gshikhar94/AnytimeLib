import { Component, OnInit, Input } from '@angular/core';
import { book } from "../book";
import { BooksService } from "../providers/books.service";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import * as lodash from 'lodash';
import { Subject } from "rxjs/Subject";
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { AuthService } from "../providers/auth.service";
import { Users } from '../Users';
import { FormControl } from '@angular/forms';
import { FilterPipe } from "../filter.pipe";
import { Likes } from "../Likes";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksEditDialogComponent } from "../books-edit-dialog/books-edit-dialog.component";


@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css'],

})

export class BooksDetailComponent implements OnInit {
  books: Observable<any>;
  items: any;
  formControl = new FormControl();
  categories = ['Technical', 'Fiction', 'Non-Fiction'];
  bookLikes: any;
  valid: boolean = true;
  issued: number;
  selectedBook: Observable<book>;

  myBooks: book[];
  constructor(public booksService: BooksService, public database: AngularFireDatabase, public authService: AuthService, public dialog: MatDialog) {
    this.booksService.getJson();

  }
  filteredBooks: Observable<book[]>;
  category: string;
  totalCopies: number;
  searchValue: string;
  name: any;
  isIssued: boolean;

  ngOnInit() {
    this.filteredBooks = this.booksService.getBooksDetail();
    this.database.list('/Books').valueChanges().subscribe(books => {
      books;
    });
  }

  removeFilter(property: string) {
    this.category = null;
  }

  searchSomething(searchString: string[], property: string) {
    console.log(this.category);
    this.filteredBooks = this.filteredBooks
      .map(books =>
        books.filter(book =>
        // searchString.every(val=>val.toLowerCase()===book.category.toLowerCase())
        {
          for (let i = 0; i < this.category.length; i++) {
            if (this.category[i].toLowerCase() === book.category.toLowerCase()) {
              return true;
            }
          }
          return false;
        }));
  }



  getBookLikes(id: number) {
    this.bookLikes = this.booksService.getBooksLikes(id);
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
    this.valid = false;
  }
}

