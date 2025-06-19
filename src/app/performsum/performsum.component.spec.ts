import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformsumComponent } from './performsum.component';

describe('PerformsumComponent', () => {
  let component: PerformsumComponent;
  let fixture: ComponentFixture<PerformsumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformsumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
