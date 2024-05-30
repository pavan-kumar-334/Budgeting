import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookRosterComponent } from './add-edit-book-roster.component';

describe('AddEditBookRosterComponent', () => {
  let component: AddEditBookRosterComponent;
  let fixture: ComponentFixture<AddEditBookRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBookRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBookRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
