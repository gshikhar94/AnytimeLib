import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../providers/books.service';
import { book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input('book') selectedBook: book;
  book: book;
  checkIssued = false;
  checkLikes: number;

  constructor(private booksService: BooksService) {
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
    this.booksService.issueBook(bookId);
    this.booksService.checkBookIssued(bookId);


  }

}
