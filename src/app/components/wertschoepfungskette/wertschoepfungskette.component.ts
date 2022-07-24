import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { DisplayService } from '../../services/chain/value-chain/display-service/display.service';
import { Subscription } from 'rxjs';
import { Diagram } from '../../classes/diagram/diagram';
import { LayoutService } from '../../services/chain/common/layout-service/layout.service';
import { SvgService } from '../../services/chain/common/svg-service/svg.service';
import { TraceCaseSelectionService } from '../../services/chain/common/trace-case-selection-service/trace-case-selection.service';

@Component({
    selector: 'app-wertschoepfungskette',
    templateUrl: './wertschoepfungskette.component.html',
    styleUrls: ['./wertschoepfungskette.component.scss'],
})
export class WertschoepfungsketteComponent implements OnDestroy {
    @ViewChild('canvas') canvas: ElementRef<SVGElement> | undefined;
    @Input() clientWidth: number | undefined;

    private _sub: Subscription;
    private _diagram: Diagram | undefined;
    private _subSelectedTraces: Subscription;
    private _selectedTraceCaseIds: Array<number> = [];
    public heightPx: number = 390;
    public widthPx: number = 1080;

    constructor(
        @Inject(LayoutService.VALUE_CHAIN_INSTANCE)
        private _layoutService: LayoutService,
        @Inject(SvgService.VALUE_CHAIN_INSTANCE)
        private _svgService: SvgService,
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _displayService: DisplayService
    ) {
        this._sub = this._displayService.diagram$.subscribe(diagram => {
            this._diagram = diagram;
            [this.widthPx, this.heightPx] = this._layoutService.layout(
                this._diagram
            );
            if (this.canvas == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            this.draw();
        });
        this._subSelectedTraces =
            this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    this.draw();
                }
            );
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
        this._subSelectedTraces.unsubscribe();
    }

    private draw() {
        if (this.canvas === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }

        this.clearDrawingArea();
        const elements = this._svgService.createSvgElements(
            this._displayService.diagram,
            this._selectedTraceCaseIds,
            false
        );
        for (const element of elements) {
            this.canvas.nativeElement.appendChild(element);
        }
    }

    private clearDrawingArea() {
        const canvas = this.canvas?.nativeElement;
        if (canvas?.childElementCount === undefined) {
            return;
        }

        while (canvas.childElementCount > 0) {
            canvas.removeChild(canvas.lastChild as ChildNode);
        }
    }
}
