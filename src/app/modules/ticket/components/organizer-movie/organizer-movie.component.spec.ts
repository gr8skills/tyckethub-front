import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerMovieComponent } from './organizer-movie.component';

describe('OrganizerMovieComponent', () => {
  let component: OrganizerMovieComponent;
  let fixture: ComponentFixture<OrganizerMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
