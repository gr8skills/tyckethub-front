import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMovieLinkFormComponent } from './online-movie-link-form.component';

describe('OnlineMovieLinkFormComponent', () => {
  let component: OnlineMovieLinkFormComponent;
  let fixture: ComponentFixture<OnlineMovieLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineMovieLinkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineMovieLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
