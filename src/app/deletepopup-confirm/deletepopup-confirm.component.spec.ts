import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepopupConfirmComponent } from './deletepopup-confirm.component';

describe('DeletepopupConfirmComponent', () => {
  let component: DeletepopupConfirmComponent;
  let fixture: ComponentFixture<DeletepopupConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletepopupConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletepopupConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
