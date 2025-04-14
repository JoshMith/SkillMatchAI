import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPathsComponent } from './career-paths.component';

describe('CareerPathsComponent', () => {
  let component: CareerPathsComponent;
  let fixture: ComponentFixture<CareerPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerPathsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
