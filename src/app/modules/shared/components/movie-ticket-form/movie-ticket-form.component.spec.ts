import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTicketFormComponent } from './movie-ticket-form.component';

describe('MovieTicketFormComponent', () => {
  let component: MovieTicketFormComponent;
  let fixture: ComponentFixture<MovieTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTicketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
