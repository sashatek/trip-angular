import { TestBed } from '@angular/core/testing';

import { ArptLookupService } from './arpt-lookup.service';

describe('ArptLookupService', () => {
  let service: ArptLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArptLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
