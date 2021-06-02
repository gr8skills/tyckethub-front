import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMainSlideComponent } from './homepage-main-slide.component';

describe('HomepageMainSlideComponent', () => {
  let component: HomepageMainSlideComponent;
  let fixture: ComponentFixture<HomepageMainSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageMainSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageMainSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
