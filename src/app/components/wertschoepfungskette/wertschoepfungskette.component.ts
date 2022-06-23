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
    @ViewChild('canvas') canvas: ElementRef<SVGElement> | undefined;
    @Input() clientWidth: number | undefined;

    private _sub: Subscription;
    private _diagram: Diagram | undefined;
    private _subSelectedTraces: Subscription;
    private _selectedTraceCaseIds: Array<number> = [];
    public heightPx: number = 390;
    public widthPx: number = 1080;

    constructor(
        private _layoutService: LayoutService,
        private _svgService: SvgService,
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
            this._displayService.selectedTraceCaseIds$.subscribe(
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
            this._selectedTraceCaseIds
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
