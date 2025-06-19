import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsHiringComponent } from './ats-hiring.component';

describe('AtsHiringComponent', () => {
  let component: AtsHiringComponent;
  let fixture: ComponentFixture<AtsHiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtsHiringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
