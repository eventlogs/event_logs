import { TestBed } from '@angular/core/testing';

import { TraceCaseSelectionService } from './trace-case-selection.service';

describe('TraceCaseSelectionService', () => {
    let service: TraceCaseSelectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TraceCaseSelectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
