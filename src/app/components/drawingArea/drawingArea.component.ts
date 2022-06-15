import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent implements AfterViewInit {
    @ViewChild('drawingArea') drawingArea!: ElementRef;
    public canvasWidth: number = 0;
    wertschoepfungsketteHidden: boolean = false;
    direktfolgegraphHidden: boolean = true;

    ngAfterViewInit() {
        if (this.drawingArea != undefined) {
            this.canvasWidth = this.drawingArea?.nativeElement.clientWidth;
        }
    }

    switchView() {
        this.direktfolgegraphHidden = !this.direktfolgegraphHidden;
        this.wertschoepfungsketteHidden = !this.wertschoepfungsketteHidden;
    }
}
