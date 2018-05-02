import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { book } from "../book";
import { Observable } from "rxjs/Observable";
import { Http, Response, HttpModule } from "@angular/http";
import { Users } from "../Users";
import { AuthService } from "../providers/auth.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/delay';
import { Router } from '@angular/router';
import { IssuedBookDetails } from '../IssuedBookDetails';

@Injectable()
export class BooksService {
  item: Observable<book>;
  issued: any;
  books: book[] = [];
  isIssued = new BehaviorSubject<boolean>(false);
  book = new BehaviorSubject<book>(new book);

  constructor(private http: Http, public af: AngularFireAuth, public database: AngularFireDatabase, public authService: AuthService, public router: Router) {
    this.getJson();
  }

  getJson() {
    return this.database.list<book>('/Books').valueChanges().subscribe(response => {
      this.books = response;
      console.log(response);
    });
  }

  getBooksDetail() {
    return this.database.list<book>('/Books').valueChanges().delay(1000);
  }

  getBookDetailsById(id) {
    return this.database.object<book>('/Books/' + id).valueChanges();
  }

  issueBook(bookid: number) {
    let booksearched: book;
    let issueNumber: number;
    this.books.filter(book => {
      if (book.id === bookid) {
        booksearched = book;
        issueNumber = book.issued;
      }
    })
    console.log(issueNumber);
    console.log(booksearched);

    this.database.object<book>("/Books/" + bookid).update({
      issued: issueNumber + 1,
    })

    let issueBook = {
      'userId': this.authService.af.auth.currentUser.uid, 'bookId': booksearched.id.toString(),
      'bookName': booksearched.name.toString(), 'userName': this.authService.getName()
    }
    var ref = this.database.database.ref("/IssuedBooks").push(issueBook);
    ref.update({
      id: ref.key,
      issuedDate: this.getTodaysDate()
    })
    console.log(this.issued);
  }

  checkBookIssued(bookId: number) {
    console.log("hi");
    let books = this.database.list<IssuedBookDetails>("/IssuedBooks/", ref => ref.orderByChild('userId').equalTo(this.authService.getCurrentUserId())).valueChanges();
    books.subscribe(books => {
      for (let book of books) {
        console.log(book);
        console.log(book.bookId);
        if (book.bookId == bookId) {
          console.log(book.bookId);
          this.isIssued.next(true);
          console.log(this.isIssued.value);
        }
      }
    });
  }

  getIssuedBooksDetails() {
    return this.database.list<IssuedBookDetails>("/IssuedBooks/", ref => ref.orderByChild('userId')).valueChanges().delay(1000);

  }
  deleteIssuedBookDetails(recordId) {
    this.database.object<IssuedBookDetails>("/IssuedBooks/" + recordId).remove();
  }
  // getLikes(bookId) {
  //   return this.database.object<book>("/Books/" + bookId).valueChanges();
  // }

  returnBook(bookId: number) {
    console.log("hi");
    let booksearched: book;
    let issueNumber: number;
    this.books.filter(book => {
      if (book.id === bookId) {
        booksearched = book;
        issueNumber = book.issued;
      }
    })
    console.log(issueNumber);
    console.log(booksearched);
    this.database.object<book>("/Books/" + bookId).update({
      issued: issueNumber - 1,
    })

    let issuedBooksDetails = this.database.list<IssuedBookDetails>("/IssuedBooks", ref => ref.orderByChild('bookId')).valueChanges();
    issuedBooksDetails.subscribe(
      bookDetails => {
        for (let book of bookDetails) {
          if (book.bookId == bookId && book.userId === this.authService.getCurrentUserId()) {
            console.log(book);
            console.log(this.authService.getCurrentUserId());
            this.database.object<IssuedBookDetails>('/IssuedBooks/' + book.id).remove();
          }
        }
      }
    )
  }

  likeBook(bookId: number) {
    let booksearched;
    let likes;
    this.books.filter(book => {
      if (book.id === bookId) {
        booksearched = book;
        likes = book.likes;
      }
    })
    this.database.object<book>("/Books/" + bookId).update({
      likes: likes + 1,
    })
  }
  pushUserRecord() {
    console.log(this.authService.af.auth.currentUser.uid);
  }

  updateBookRecords(id: number, name: string, authorName: string, category: string) {
    this.database.object<book>('/Books/' + id).update({
      name: name,
      authorName: authorName,
      category: category
    })
  }

  deleteBook(bookId: number) {
    this.database.object<book>('/Books/' + bookId).remove()
      .then(success => alert("Book has been deleted"))
      .catch(error => console.log(error));

    let issuedBooksDetails = this.database.list<IssuedBookDetails>("/IssuedBooks", ref => ref.orderByChild('bookId')).valueChanges();
    issuedBooksDetails.subscribe(
      bookDetails => {
        for (let book of bookDetails) {
          if (book.bookId == bookId) {
            console.log(book);
            console.log(this.authService.getCurrentUserId());
            this.database.object<IssuedBookDetails>('/IssuedBooks/' + book.id).remove();
          }
        }
      }
    )
  }

  getTodaysDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return (day + "/" + month + "/" + year);
  }

  getListOfBooksByIsbn(isbn) {
    this.book.next(null);
    let books: book = null;
    this.http.get("https://www.googleapis.com/books/v1/volumes/?q=isbn:" + isbn).subscribe((response: Response) => {
      let responseJson = response.json();
      console.log(responseJson);
      for (let i = 0; i < responseJson['items'].length; i++) {
        books = new book(isbn, responseJson['items'][i].volumeInfo.title, responseJson['items'][i].volumeInfo.authors[0], 0,
          responseJson['items'][i].volumeInfo.imageLinks.thumbnail, 10, responseJson['items'][i].volumeInfo.categories[0],
          0)
        this.book.next(books);
      }
    })
  }

  addbookDetails(book: book) {
    var ref = this.database.database.ref("/Books").child(book.id.toString()).set(book);
  }
}