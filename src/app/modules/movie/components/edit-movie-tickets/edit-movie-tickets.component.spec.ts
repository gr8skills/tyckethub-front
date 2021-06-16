import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieTicketsComponent } from './edit-movie-tickets.component';

describe('EditMovieTicketsComponent', () => {
  let component: EditMovieTicketsComponent;
  let fixture: ComponentFixture<EditMovieTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMovieTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
