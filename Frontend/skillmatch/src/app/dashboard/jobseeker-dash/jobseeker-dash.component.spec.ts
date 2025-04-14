import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerDashComponent } from './jobseeker-dash.component';

describe('JobseekerDashComponent', () => {
  let component: JobseekerDashComponent;
  let fixture: ComponentFixture<JobseekerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
