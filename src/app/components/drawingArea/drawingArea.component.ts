import {
    AfterContentChecked,
    Component,
    ElementRef,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';

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

    @Output() filterChanged = new EventEmitter();

    constructor(
        private _displayService: DisplayService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _eventlogDataService: EventlogDataService
    ) {}

    ngAfterContentChecked() {
        if (this.drawingArea != undefined) {
            this.canvasWidth = this.drawingArea?.nativeElement.clientWidth;
        }
    }

    switchDirection() {
        this._directlyFollowsGraphService.switchDirection();
    }

    switchView() {
        this.direktfolgegraphHidden = !this.direktfolgegraphHidden;
        this.wertschoepfungsketteHidden = !this.wertschoepfungsketteHidden;
    }

    applyFilter(filterValue: string) {
        this._eventlogDataService.changeFilter(filterValue);
        this.filterChanged.emit(filterValue);
    }

    clickDrawArea() {
        this._displayService.selectTraceCaseIds([]);
    }
}
