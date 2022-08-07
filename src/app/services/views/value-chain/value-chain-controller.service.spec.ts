import { TestBed } from '@angular/core/testing';

import { ValueChainControllerService } from './value-chain-controller.service';

describe('ValueChainControllerService', () => {
  let service: ValueChainControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueChainControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
