import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftscheduleComponent } from './shiftschedule.component';

describe('ShiftscheduleComponent', () => {
  let component: ShiftscheduleComponent;
  let fixture: ComponentFixture<ShiftscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftscheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
