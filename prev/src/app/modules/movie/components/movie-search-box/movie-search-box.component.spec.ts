import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchBoxComponent } from './movie-search-box.component';

describe('MovieSearchBoxComponent', () => {
  let component: MovieSearchBoxComponent;
  let fixture: ComponentFixture<MovieSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
