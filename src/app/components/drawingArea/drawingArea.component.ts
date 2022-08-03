import {
    AfterContentChecked,
    Component,
    ElementRef,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
import { DisplayService } from 'src/app/services/chain/value-chain/display-service/display.service';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { ChangeViewButtonComponent } from '../change-view-button/change-view-button.component';
import { TracesDetailViewComponent } from '../traces-detail-view/traces-detail-view.component';
import { TraceCaseSelectionService } from '../../services/chain/common/trace-case-selection-service/trace-case-selection.service';

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent implements AfterContentChecked {
    @ViewChild('drawingArea') drawingArea!: ElementRef;
    @ViewChild('tracesDetailView') tracesDetailView?: TracesDetailViewComponent;

    public canvasWidth: number = 0;
    wertschoepfungsketteHidden: boolean = false;
    direktfolgegraphHidden: boolean = true;
    logInformationHidden: boolean = true;

    @Output() filterChanged = new EventEmitter();

    constructor(
        private _displayService: DisplayService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _eventlogDataService: EventlogDataService,
        private _traceCaseSelectionService: TraceCaseSelectionService
    ) {}

    ngAfterContentChecked() {
        if (this.drawingArea != undefined) {
            this.canvasWidth = this.drawingArea?.nativeElement.clientWidth;
        }
    }

    switchDirection() {
        this._directlyFollowsGraphService.switchDirection();
    }

    changeView(nextView: string) {
        switch (nextView) {
            case ChangeViewButtonComponent.valueChainView:
                this.wertschoepfungsketteHidden = false;
                this.direktfolgegraphHidden = true;
                this.logInformationHidden = true;
                break;
            case ChangeViewButtonComponent.directlyFollowsGraphView:
                this.wertschoepfungsketteHidden = true;
                this.direktfolgegraphHidden = false;
                this.logInformationHidden = true;
                break;
            case ChangeViewButtonComponent.logInformationView:
                this.direktfolgegraphHidden = true;
                this.wertschoepfungsketteHidden = true;
                this.logInformationHidden = false;
                break;
        }
    }

    applyFilter(filterValue: string) {
        this._eventlogDataService.changeFilter(filterValue);
        this.filterChanged.emit(filterValue);
    }

    clickDrawArea() {
        this._traceCaseSelectionService.selectTraceCaseIds([]);
    }

    refresh() {
        this.tracesDetailView?.refresh();
    }
}
