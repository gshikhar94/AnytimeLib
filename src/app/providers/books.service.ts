import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { book } from "../book";
import { Observable } from "rxjs/Observable";
import { Http, Response, HttpModule } from "@angular/http";
import { $ } from 'protractor';
import { Users } from "../Users";
import { AuthService } from "../providers/auth.service";
import { Likes } from "../Likes";
import { KeyRegistry } from '@angular/core/src/di/reflective_key';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


@Injectable()
export class BooksService {
  likes: Likes;
  item: Observable<book>;
  issued: any;
  books: book[] = [];
  isIssued = new BehaviorSubject<boolean>(false);
  checkLikes = new BehaviorSubject<number>(0);

  constructor(public af: AngularFireAuth, public database: AngularFireDatabase, public authService: AuthService) {
    this.getJson();
  }

  getJson() {
    return this.database.list<book>('/Books').valueChanges().subscribe(response => {
      this.books = response;
      console.log(response);
    });
  }

  getBooksDetail() {
    // return new Promise(resolve => {
    //   console.log(this.books);
    //   resolve(this.books);

    // })

    return this.database.list<book>('/Books').valueChanges().delay(1000);

  }

  getBookDetailsById(id) {
    return this.database.object<book>('/Books/' + id).valueChanges();
  }
  // updateBookDetails(book){
  //   this.database.object<book>('/Books/'+book.id).update({})
  // }
  // getCurrentUserDetails(id: string) {
  //   return this.database.list<Users>('/Users/').valueChanges().forEach(users => users.filter(user => {
  //     this.database.object<Users>('/Users/' + id);
  //   }))
  // }
  // getBookDetailById(id: number) {
  //   let item = this.database.list<book>('/Books/', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
  //   item.forEach(value => {
  //     value.filter((val, index, arr) => {
  //       return this.database.object<book>('/Books/' + id)
  //     })
  //   })
  // }
  issueBook(bookid: number) {
    // let uid = this.authService.af.auth.currentUser.uid;
    // console.log(this.authService.af.auth.currentUser. issuedBookId);
    // let item = this.database.list<book>('/Books/', ref => ref.orderByChild('id').equalTo(bookid)).valueChanges();
    // item.forEach(value => {
    //   value.filter((val, index, arr) => {
    //     this.database.object<book>('/Books/' + bookid).
    //       update({
    //         issued: val.issued + 1,
    //         isIssued: true,
    //         isReturned: false
    //       })
    //   })
    // });

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

    // let issued: number;
    // this.getBookDetailsById(bookid).forEach(value => {
    //   book = value;
    //   issued = book.issued + 1;
    //   return issued;
    // });


    this.database.object<book>("/Books/" + bookid).update({
      issued: issueNumber + 1,
      // isIssued:true,
      // isReturned:false
    })
    let issuedBook = { 'userId': this.authService.af.auth.currentUser.uid };
    this.database.database.ref("/IssuedBooks").child(booksearched.id.toString()).update(issuedBook);

    console.log(this.issued);


  }
  checkBookIssued(bookId: number) {
    let book = this.database.object("/IssuedBooks/" + bookId).valueChanges()
    book.subscribe(data => {
      if (data) {
        if (data['userId'] === this.authService.af.auth.currentUser.uid) {
          this.isIssued.next(true);
          console.log(this.isIssued.value);
        }
      }
      else {
        this.isIssued.next(false);
        console.log(this.isIssued.value);
      }
    })
  }

  getLikes(bookId) {
    return this.database.object<book>("/Books/" + bookId).valueChanges();
  }

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

    this.database.object("/IssuedBooks/" + bookId).remove();
    // let item = this.database.list<book>('/Books/', ref => ref.orderByChild('id').equalTo(bookId)).valueChanges();
    // item.forEach(value => {
    //   value.filter((val, index, arr) => {
    //     this.database.object<book>('/Books/' + bookId).
    //       update({
    //         issued: val.issued - 1,
    //         isIssued: false,
    //         isReturned: true,
    //       })
    //   })
    // });
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
      // isIssued:true,
      // isReturned:false
    })
    //   console.log(this.authService.af.auth.currentUser.uid);
    // let books = this.database.list<Likes>('/Likes').valueChanges();
    // if (books) {
    //   books.forEach(books => {
    //     books.filter((val, index, arr) => {
    //       let userId = "asdf";
    //       this.database.object<Likes>('/Likes/' + id).
    //         update({
    //           userId: [userId, "true"],
    //           bookLikes: val.bookLikes + 1
    //         })
    //     })
    //   })
    // }
    // console.log(this.database.list<Users>('/Users/').query.ref.key);
  }
  pushUserRecord() {
    console.log(this.authService.af.auth.currentUser.uid);
  }
  getBooksLikes(id: number) {
    return this.database.list<book>('/Likes/' + id + "/bookLikes").valueChanges();
  }

  updateBookRecords(id: number, name: string, authorName: string, category: string) {
    // this.getBooksDetail().forEach(books => books.filter(book => {
    this.database.object<book>('/Books/' + id).update({
      name: name,
      authorName: authorName,
      category: category
    })
    // }))
  }

  deleteBook(bookId: number) {
    // this.getBooksDetail().forEach(books => books.filter(book => {
    this.database.object<book>('/Books/' + bookId).remove();
    // }))
  }

}