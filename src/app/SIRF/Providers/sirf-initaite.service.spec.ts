import { TestBed } from '@angular/core/testing';

import { SirfInitaiteService } from './sirf-initaite.service';

describe('SirfInitaiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SirfInitaiteService = TestBed.get(SirfInitaiteService);
    expect(service).toBeTruthy();
  });
});
