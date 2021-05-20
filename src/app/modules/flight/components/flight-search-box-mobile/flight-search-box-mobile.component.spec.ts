import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchBoxMobileComponent } from './flight-search-box-mobile.component';

describe('FlightSearchBoxMobileComponent', () => {
  let component: FlightSearchBoxMobileComponent;
  let fixture: ComponentFixture<FlightSearchBoxMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchBoxMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchBoxMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
