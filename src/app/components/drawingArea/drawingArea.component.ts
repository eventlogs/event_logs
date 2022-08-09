import {
    AfterContentChecked,
    Component,
    ElementRef,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
import { DirectlyFollowsGraphService } from 'src/app/services/views/directly-follows-graph/display.service';
import { EventlogDataService } from 'src/app/services/common/data/eventlog-data.service';
import { ChangeViewButtonComponent } from '../change-view-button/change-view-button.component';
import { TraceCaseSelectionService } from '../../services/common/trace-case-selection-service/trace-case-selection.service';
import { FilterArgument } from '../filter-area/filter-area.component';
import { LoadingService } from '../../services/views/loading/loading.service';

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent implements AfterContentChecked {
    @ViewChild('drawingArea') drawingArea!: ElementRef;

    loading$ = this.loader.loading$;
    public canvasWidth: number = 0;
    wertschoepfungsketteHidden: boolean = false;
    direktfolgegraphHidden: boolean = true;
    logInformationHidden: boolean = true;

    @Output() filterChanged = new EventEmitter();

    constructor(
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _eventlogDataService: EventlogDataService,
        public loader: LoadingService
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

    applyFilter(FilterArgument: FilterArgument) {
        this._eventlogDataService.changeFilter(FilterArgument);
        this.filterChanged.emit(FilterArgument);
    }

    clickDrawArea() {
        this._traceCaseSelectionService.selectTraceCaseIds([]);
    }
}
