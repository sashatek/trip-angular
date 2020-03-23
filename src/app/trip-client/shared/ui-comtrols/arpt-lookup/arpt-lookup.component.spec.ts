import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArptLookupComponent } from './arpt-lookup.component';

describe('ArptLookupComponent', () => {
  let component: ArptLookupComponent;
  let fixture: ComponentFixture<ArptLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArptLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArptLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
