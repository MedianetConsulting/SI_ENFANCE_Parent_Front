import { TestBed } from '@angular/core/testing';

import { SignalisationService } from './signalisation.service';

describe('SignalisationService', () => {
  let service: SignalisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
