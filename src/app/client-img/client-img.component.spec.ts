import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientImgComponent } from './client-img.component';

describe('ClientImgComponent', () => {
  let component: ClientImgComponent;
  let fixture: ComponentFixture<ClientImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
