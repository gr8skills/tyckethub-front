import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMovieComponent } from './online-movie.component';

describe('OnlineMovieComponent', () => {
  let component: OnlineMovieComponent;
  let fixture: ComponentFixture<OnlineMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
