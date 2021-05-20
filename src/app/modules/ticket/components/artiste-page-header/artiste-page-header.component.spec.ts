import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistePageHeaderComponent } from './artiste-page-header.component';

describe('ArtistePageHeaderComponent', () => {
  let component: ArtistePageHeaderComponent;
  let fixture: ComponentFixture<ArtistePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistePageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
