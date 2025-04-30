import { TestBed } from '@angular/core/testing';

import { FormFilterService } from './formFilter.service';

describe('FormFilterService', () => {
  let service: FormFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
