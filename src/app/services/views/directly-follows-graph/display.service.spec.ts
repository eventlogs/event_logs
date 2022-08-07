import { TestBed } from '@angular/core/testing';

import { DirectlyFollowsGraphService } from './display.service';

describe('DirectlyFollowsGraphService', () => {
    let service: DirectlyFollowsGraphService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DirectlyFollowsGraphService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
