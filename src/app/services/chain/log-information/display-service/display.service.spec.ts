import { TestBed } from '@angular/core/testing';
import { DisplayService } from './display.service';
import { TraceCaseSelectionService } from '../../common/trace-case-selection-service/trace-case-selection.service';

describe('DisplayService', () => {
    let service: DisplayService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DisplayService,
                    useFactory: (
                        traceCaseSelectionService: TraceCaseSelectionService
                    ) => new DisplayService(traceCaseSelectionService),
                    deps: TraceCaseSelectionService,
                },
            ],
        });
        service = TestBed.inject(DisplayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
