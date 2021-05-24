import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchBoxComponent } from './mobile-search-box.component';

describe('MobileSearchBoxComponent', () => {
  let component: MobileSearchBoxComponent;
  let fixture: ComponentFixture<MobileSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
