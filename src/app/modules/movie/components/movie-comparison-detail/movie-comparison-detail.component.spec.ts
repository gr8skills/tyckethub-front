import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComparisonDetailComponent } from './movie-comparison-detail.component';

describe('MovieComparisonDetailComponent', () => {
  let component: MovieComparisonDetailComponent;
  let fixture: ComponentFixture<MovieComparisonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComparisonDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComparisonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
