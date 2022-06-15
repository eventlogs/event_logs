import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { SvgService } from '../../services/svg.service';
import { Diagram } from '../../classes/diagram/diagram';

@Component({
    selector: 'app-wertschoepfungskette',
    templateUrl: './wertschoepfungskette.component.html',
    styleUrls: ['./wertschoepfungskette.component.scss'],
})
export class WertschoepfungsketteComponent implements OnDestroy {
    @ViewChild('drawingArea') drawingArea: ElementRef<SVGElement> | undefined;
    @ViewChild('drawingScroll') drawingScroll: ElementRef | undefined;
    @Input() clientWidth: number | undefined;

    private _sub: Subscription;
    private _diagram: Diagram | undefined;
    private _subSelectedTraces: Subscription;
    private _selectedTraceCaseIds: Array<number> = [];
    public heightPx: number = 390;
    public widthPercent: number = 100;

    constructor(
        private _layoutService: LayoutService,
        private _svgService: SvgService,
        private _displayService: DisplayService
    ) {
        this._sub = this._displayService.diagram$.subscribe(diagram => {
            this._diagram = diagram;
            let pixelWidth = 0;
            [pixelWidth, this.heightPx] = this._layoutService.layout(
                this._diagram
            );
            this.calcWidth(pixelWidth);
            if (this.drawingArea == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            this.draw();
        });
        this._subSelectedTraces =
            this._displayService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    this.draw();
                }
            );
    }

    private calcWidth(pixelWidth: number) {
        if (this.clientWidth != undefined) {
            let drawingWidth =
                (pixelWidth / this.clientWidth) *
                100;
            drawingWidth < 100 ?
                this.widthPercent = 100 :
                this.widthPercent = drawingWidth;
        }
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
        this._subSelectedTraces.unsubscribe();
    }

    private draw() {
        if (this.drawingArea === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }

        this.clearDrawingArea();
        const elements = this._svgService.createSvgElements(
            this._displayService.diagram,
            this._selectedTraceCaseIds
        );
        for (const element of elements) {
            this.drawingArea.nativeElement.appendChild(element);
        }
    }

    private clearDrawingArea() {
        const drawingArea = this.drawingArea?.nativeElement;
        if (drawingArea?.childElementCount === undefined) {
            return;
        }

        while (drawingArea.childElementCount > 0) {
            drawingArea.removeChild(drawingArea.lastChild as ChildNode);
        }
    }
}
