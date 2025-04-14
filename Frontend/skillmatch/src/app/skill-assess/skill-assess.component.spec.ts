import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAssessComponent } from './skill-assess.component';

describe('SkillAssessComponent', () => {
  let component: SkillAssessComponent;
  let fixture: ComponentFixture<SkillAssessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillAssessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
