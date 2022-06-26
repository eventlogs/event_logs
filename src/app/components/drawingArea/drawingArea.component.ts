import {
    AfterContentChecked,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent implements AfterContentChecked {
    @ViewChild('drawingArea') drawingArea!: ElementRef;
    public canvasWidth: number = 0;
    wertschoepfungsketteHidden: boolean = false;
    direktfolgegraphHidden: boolean = true;

    constructor(private _displayService: DisplayService) {}

    ngAfterContentChecked() {
        if (this.drawingArea != undefined) {
            this.canvasWidth = this.drawingArea?.nativeElement.clientWidth;
        }
    }

    switchView() {
        this.direktfolgegraphHidden = !this.direktfolgegraphHidden;
        this.wertschoepfungsketteHidden = !this.wertschoepfungsketteHidden;
    }

    clickDrawArea() {
        this._displayService.selectTraceCaseIds([]);
    }
}
