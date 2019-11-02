import { TestBed } from '@angular/core/testing';

import { BaseLinkService } from './base-link.service';

describe('BaseLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseLinkService = TestBed.get(BaseLinkService);
    expect(service).toBeTruthy();
  });
});
