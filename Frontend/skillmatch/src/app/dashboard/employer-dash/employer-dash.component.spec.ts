import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerDashComponent } from './employer-dash.component';

describe('EmployerDashComponent', () => {
  let component: EmployerDashComponent;
  let fixture: ComponentFixture<EmployerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
