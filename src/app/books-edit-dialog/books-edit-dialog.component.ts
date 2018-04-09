import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from "../providers/books.service";
import { book } from "../book";
@Component({
  selector: 'app-books-edit-dialog',
  templateUrl: './books-edit-dialog.component.html',
  styleUrls: ['./books-edit-dialog.component.css']
})
export class BooksEditDialogComponent implements OnInit {
  name: string;
  authorName: string;
  category: string;
  book: book;
  categories = ['Technical', 'Fiction', 'Non-Fiction'];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public bookService: BooksService) { }

  ngOnInit() {
    console.log(this.data.bookDetails);
  }

  submitBookDetails(name?: string, authorName?: string, category?: string) {
    this.bookService.updateBookRecords(this.data.bookDetails.id, name, authorName, this.category);
  }


}
