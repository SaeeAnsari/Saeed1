import { TestBed } from '@angular/core/testing';

import { InitiateProviderService } from './initiate-provider.service';

describe('InitiateProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitiateProviderService = TestBed.get(InitiateProviderService);
    expect(service).toBeTruthy();
  });
});
