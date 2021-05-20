import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneModalComponent } from './phone-modal.component';

describe('PhoneModalComponent', () => {
  let component: PhoneModalComponent;
  let fixture: ComponentFixture<PhoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
