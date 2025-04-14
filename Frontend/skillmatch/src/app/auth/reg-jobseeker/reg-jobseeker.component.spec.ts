import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegJobseekerComponent } from './reg-jobseeker.component';

describe('RegJobseekerComponent', () => {
  let component: RegJobseekerComponent;
  let fixture: ComponentFixture<RegJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegJobseekerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
