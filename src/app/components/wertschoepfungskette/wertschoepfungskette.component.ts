import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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

    private _sub: Subscription;
    private _diagram: Diagram | undefined;
    public heightPx: Number = 390;
    public widthPercent: Number = 100;

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
    }

    private calcWidth(pixelWidth: number) {
        if (this.drawingScroll != undefined) {
            let widthTemp = (pixelWidth / this.drawingScroll?.nativeElement.clientWidth) *
                100;
            widthTemp < 100 ? this.widthPercent = 100 : this.widthPercent = widthTemp;
        }
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    private draw() {
        if (this.drawingArea === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }

        this.clearDrawingArea();
        const elements = this._svgService.createSvgElements(
            this._displayService.diagram
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
