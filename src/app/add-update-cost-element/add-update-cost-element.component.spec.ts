import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCostElementComponent } from './add-update-cost-element.component';

describe('AddUpdateCostElementComponent', () => {
  let component: AddUpdateCostElementComponent;
  let fixture: ComponentFixture<AddUpdateCostElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateCostElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateCostElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
