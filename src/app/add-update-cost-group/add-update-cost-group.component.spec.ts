import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCostGroupComponent } from './add-update-cost-group.component';

describe('AddUpdateCostGroupComponent', () => {
  let component: AddUpdateCostGroupComponent;
  let fixture: ComponentFixture<AddUpdateCostGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateCostGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateCostGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
