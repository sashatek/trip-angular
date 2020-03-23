import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripModalFormComponent } from './trip-modal-form.component';

describe('TripModalFormComponent', () => {
  let component: TripModalFormComponent;
  let fixture: ComponentFixture<TripModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
