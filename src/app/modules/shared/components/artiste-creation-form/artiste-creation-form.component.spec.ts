import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisteCreationFormComponent } from './artiste-creation-form.component';

describe('ArtisteCreationFormComponent', () => {
  let component: ArtisteCreationFormComponent;
  let fixture: ComponentFixture<ArtisteCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisteCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisteCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
