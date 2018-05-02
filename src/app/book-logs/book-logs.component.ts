import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BooksService } from '../providers/books.service';
import { IssuedBookDetails } from '../IssuedBookDetails';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-book-logs',
  templateUrl: './book-logs.component.html',
  styleUrls: ['./book-logs.component.css']
})
export class BookLogsComponent implements OnInit {

  bookIssuedData: Observable<IssuedBookDetails[]>;

  constructor(private bookService: BooksService) {
    this.getIssuedBooksDetails();
  }

  ngOnInit() {
  }

  getIssuedBooksDetails() {
    // this.bookService.getIssuedBooksDetails().subscribe(books => {
    //   this.bookIssuedData = books;
    //   console.log(this.bookIssuedData);
    // })
    this.bookIssuedData = this.bookService.getIssuedBooksDetails();
  }
  deleteIssuedBook(recordId: string) {
    this.bookService.deleteIssuedBookDetails(recordId);
  }
}



