import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualnavComponent } from './dualnav.component';

describe('DualnavComponent', () => {
  let component: DualnavComponent;
  let fixture: ComponentFixture<DualnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DualnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DualnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
