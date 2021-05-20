import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAlertBarComponent } from './covid-alert-bar.component';

describe('CovidAlertBarComponent', () => {
  let component: CovidAlertBarComponent;
  let fixture: ComponentFixture<CovidAlertBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidAlertBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAlertBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
