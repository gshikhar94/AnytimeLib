import { Component, OnInit } from '@angular/core';
import { BooksService } from '../providers/books.service';
import { book } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  books;
  searchValue;
  message="";

  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }

  searchByIsbn(isbn) {
    this.message="";
    this.bookService.getListOfBooksByIsbn(isbn);
    this.bookService.book.subscribe(book => this.books = book);
  }

  addBook(book: book) {
    this.bookService.addbookDetails(book);
    this.books=null;
    this.searchValue="";
    this.message="This book has been added";
  }
}
