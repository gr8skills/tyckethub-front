import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePublishAlertModalComponent } from './movie-publish-alert-modal.component';

describe('MoviePublishAlertModalComponent', () => {
  let component: MoviePublishAlertModalComponent;
  let fixture: ComponentFixture<MoviePublishAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePublishAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePublishAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
