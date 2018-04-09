import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(books: any, searchValue: any): any {
    //check if search term is undefined
    if (searchValue === undefined) return books;
    //return updated books array
    return books.map(books => {
      books.filter(book => {
        return book.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    })
  }

}
