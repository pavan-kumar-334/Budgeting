import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateResourceComponent } from './add-update-resource.component';

describe('AddUpdateResourceComponent', () => {
  let component: AddUpdateResourceComponent;
  let fixture: ComponentFixture<AddUpdateResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
