import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMatchedComponent } from './get-matched.component';

describe('GetMatchedComponent', () => {
  let component: GetMatchedComponent;
  let fixture: ComponentFixture<GetMatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMatchedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
