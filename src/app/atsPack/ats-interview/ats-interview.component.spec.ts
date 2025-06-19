import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsInterviewComponent } from './ats-interview.component';

describe('AtsInterviewComponent', () => {
  let component: AtsInterviewComponent;
  let fixture: ComponentFixture<AtsInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtsInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
