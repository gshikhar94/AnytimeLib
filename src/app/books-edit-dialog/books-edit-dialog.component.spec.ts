import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksEditDialogComponent } from './books-edit-dialog.component';

describe('BooksEditDialogComponent', () => {
  let component: BooksEditDialogComponent;
  let fixture: ComponentFixture<BooksEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
