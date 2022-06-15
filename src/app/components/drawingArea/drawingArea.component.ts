import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent {
    @ViewChild('drawingArea') canvas!: ElementRef;
    _canvasWidth: number = window.innerWidth;
    private _resizeObservable: Observable<Event>;
    private _resizeSubscription: Subscription;
    wertschoepfungsketteHidden: boolean = false;
    direktfolgegraphHidden: boolean = true;

    constructor() {
        this._resizeObservable = fromEvent(window, 'resize');
        this._resizeSubscription = this._resizeObservable.subscribe( evt => {
            this._canvasWidth = this.canvas.nativeElement.clientWidth;
        })
        if (this.canvas != undefined) {
            this._canvasWidth = this.canvas?.nativeElement.clientWidth;
        }
    }

    onResize() {
        this._canvasWidth = this.canvas.nativeElement.clientWidth;
    }

    switchView() {
        this.direktfolgegraphHidden = !this.direktfolgegraphHidden;
        this.wertschoepfungsketteHidden = !this.wertschoepfungsketteHidden;
    }

    ngOnDestroy() {
        this._resizeSubscription.unsubscribe()
    }
}
