import { Component, OnInit } from '@angular/core';
import { BooksService } from '../providers/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  books;
  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }

  searchByIsbn(isbn) {
    this.bookService.getListOfBooksByIsbn(isbn);
    this.bookService.book.subscribe(book => this.books = book);
  }
}
