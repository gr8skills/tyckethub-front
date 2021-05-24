import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightComparisonDetailComponent } from './flight-comparison-detail.component';

describe('FligthComparisonDetailComponent', () => {
  let component: FlightComparisonDetailComponent;
  let fixture: ComponentFixture<FlightComparisonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightComparisonDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightComparisonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
