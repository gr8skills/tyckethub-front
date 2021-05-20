import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineEventLinkFormComponent } from './online-event-link-form.component';

describe('OnlineEventLinkFormComponent', () => {
  let component: OnlineEventLinkFormComponent;
  let fixture: ComponentFixture<OnlineEventLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineEventLinkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineEventLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
