import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMovieComponent } from './complete-movie.component';

describe('CompleteMovieComponent', () => {
  let component: CompleteMovieComponent;
  let fixture: ComponentFixture<CompleteMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
