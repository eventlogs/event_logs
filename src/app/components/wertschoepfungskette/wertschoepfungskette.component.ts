import {
    Component,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { DisplayService } from '../../services/views/value-chain/display-service/display.service';
import { ValueChainControllerService } from "../../services/views/value-chain/value-chain-controller.service";
import { Subscription } from 'rxjs';
import { TraceCaseSelectionService } from '../../services/common/trace-case-selection-service/trace-case-selection.service';

@Component({
    selector: 'app-wertschoepfungskette',
    templateUrl: './wertschoepfungskette.component.html',
    styleUrls: ['./wertschoepfungskette.component.scss'],
})
export class WertschoepfungsketteComponent implements OnInit, OnDestroy {
    @ViewChild('canvas') canvas: ElementRef<SVGElement> | undefined;
    @Input() clientWidth: number | undefined;

    private _sub: Subscription | undefined;
    private _subSelectedTraces: Subscription | undefined;
    public heightPx: number = this._valueChainControllerService.heightPx;
    public widthPx: number = this._valueChainControllerService.widthPx;

    constructor(
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _displayService: DisplayService,
        private _valueChainControllerService: ValueChainControllerService
    ) {}

    ngOnInit(): void {
        this._sub = this._valueChainControllerService._elements$.subscribe(elements => {
            if (this.canvas == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            this.widthPx = this._valueChainControllerService.widthPx;
            this.heightPx = this._valueChainControllerService.heightPx;
            this.draw(elements);
        })
    }

    ngOnDestroy(): void {
        this._sub?.unsubscribe();
        this._subSelectedTraces?.unsubscribe();
    }

    private draw(elements: SVGElement[]) {
        if (this.canvas === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }
        this.clearDrawingArea();
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
