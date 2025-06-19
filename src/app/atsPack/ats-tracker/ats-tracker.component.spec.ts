import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsTrackerComponent } from './ats-tracker.component';

describe('AtsTrackerComponent', () => {
  let component: AtsTrackerComponent;
  let fixture: ComponentFixture<AtsTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtsTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
