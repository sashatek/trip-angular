import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMasterDetailComponent } from './trip-master-detail.component';

describe('TripMasterDetailComponent', () => {
  let component: TripMasterDetailComponent;
  let fixture: ComponentFixture<TripMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripMasterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
