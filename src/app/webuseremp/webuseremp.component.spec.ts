import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebuserempComponent } from './webuseremp.component';

describe('WebuserempComponent', () => {
  let component: WebuserempComponent;
  let fixture: ComponentFixture<WebuserempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebuserempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebuserempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
