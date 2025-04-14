import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEmployerComponent } from './reg-employer.component';

describe('RegEmployerComponent', () => {
  let component: RegEmployerComponent;
  let fixture: ComponentFixture<RegEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
