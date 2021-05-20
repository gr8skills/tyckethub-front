import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchBoxComponent } from './flight-search-box.component';

describe('FlightSearchBoxComponent', () => {
  let component: FlightSearchBoxComponent;
  let fixture: ComponentFixture<FlightSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
