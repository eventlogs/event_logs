import { TestBed } from '@angular/core/testing';
import { ValueChainControllerService } from './value-chain-controller.service';
import { LayoutService } from '../../common/layout-service/layout.service';
import { SvgService } from '../../common/svg-service/svg.service';

describe('ValueChainControllerService', () => {
    let service: ValueChainControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LayoutService.VALUE_CHAIN_INSTANCE,
                    useFactory: () =>
                        new LayoutService(
                            LayoutService.X_OFFSET_VALUE_CHAIN,
                            LayoutService.Y_OFFSET_VALUE_CHAIN,
                            LayoutService.X_STEP_VALUE_CHAIN,
                            LayoutService.Y_STEP_VALUE_CHAIN,
                            LayoutService.X_LABELSIZE_VALUE_CHAIN,
                            trace => 10
                        ),
                },
                {
                    provide: SvgService.VALUE_CHAIN_INSTANCE,
                    useFactory: (layoutService: LayoutService) =>
                        new SvgService(
                            layoutService,
                            SvgService.MAXFONTWIDTH_VALUE_CHAIN,
                            SvgService.BOX_WIDTH_VALUE_CHAIN,
                            SvgService.BOX_HEIGHT_VALUE_CHAIN,
                            trace =>
                                trace.count.toString() +
                                (trace.count == 1 ? ' trace' : ' traces')
                        ),
                    deps: [LayoutService.VALUE_CHAIN_INSTANCE],
                },
            ],
        });
        service = TestBed.inject(ValueChainControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
