import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEntryGridComponent } from './trip-entry-grid.component';

describe('TripEntryGridComponent', () => {
  let component: TripEntryGridComponent;
  let fixture: ComponentFixture<TripEntryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripEntryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEntryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
