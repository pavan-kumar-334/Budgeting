import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPriceComponent } from './project-price.component';

describe('ProjectPriceComponent', () => {
  let component: ProjectPriceComponent;
  let fixture: ComponentFixture<ProjectPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
