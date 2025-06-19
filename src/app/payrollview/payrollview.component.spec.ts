import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollviewComponent } from './payrollview.component';

describe('PayrollviewComponent', () => {
  let component: PayrollviewComponent;
  let fixture: ComponentFixture<PayrollviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
