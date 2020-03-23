import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripClientComponent } from './trip-client.component';

describe('TripClientComponent', () => {
  let component: TripClientComponent;
  let fixture: ComponentFixture<TripClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
