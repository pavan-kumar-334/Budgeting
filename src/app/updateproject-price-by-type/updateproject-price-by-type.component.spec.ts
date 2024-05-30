import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprojectPriceByTypeComponent } from './updateproject-price-by-type.component';

describe('UpdateprojectPriceByTypeComponent', () => {
  let component: UpdateprojectPriceByTypeComponent;
  let fixture: ComponentFixture<UpdateprojectPriceByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprojectPriceByTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprojectPriceByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
