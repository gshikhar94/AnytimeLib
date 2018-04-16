import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BooksService } from '../providers/books.service';
import { book } from '../book';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input('book') selectedBook: book;
  @ViewChild('close') close: ElementRef;
  book: book;
  checkIssued = false;
  checkLikes: number;

  constructor(private booksService: BooksService, public authService: AuthService, public router: Router) {
    this.booksService.isIssued.subscribe(data => {
      this.checkIssued = data
    });
  }

  ngOnInit() {
  }

  returnBook(bookId: number) {
    this.booksService.returnBook(bookId);
    this.booksService.checkBookIssued(bookId);
  }

  issueBook(bookId: number) {
    console.log("hey");
    console.log(this.authService.getCurrentUser());
    if (this.authService.getCurrentUser() === null) {

      this.close.nativeElement.click();
      alert("Please login first");
      this.router.navigate(['login']);
    }
    else {
      this.booksService.issueBook(bookId);
      this.booksService.checkBookIssued(bookId);
    }
  }
}
