import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAuditComponent } from './emp-audit.component';

describe('EmpAuditComponent', () => {
  let component: EmpAuditComponent;
  let fixture: ComponentFixture<EmpAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
