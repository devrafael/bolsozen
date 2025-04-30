import { TestBed } from '@angular/core/testing';

import { TypeRegistriesService } from './type-registries.service';

describe('TypeRegistriesService', () => {
  let service: TypeRegistriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRegistriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
