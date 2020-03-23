import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNavToFormComponent } from './trip-nav-to-form.component';

describe('TripNavToFormComponent', () => {
  let component: TripNavToFormComponent;
  let fixture: ComponentFixture<TripNavToFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripNavToFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripNavToFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
