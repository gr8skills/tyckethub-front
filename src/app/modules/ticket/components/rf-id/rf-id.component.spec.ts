import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfIdComponent } from './rf-id.component';

describe('RfIdComponent', () => {
  let component: RfIdComponent;
  let fixture: ComponentFixture<RfIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
