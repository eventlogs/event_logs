import {
    AfterContentChecked,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { DisplayService } from 'src/app/services/chain/value-chain/display-service/display.service';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
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

    constructor(
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _directyFollowsGraphService: DirectlyFollowsGraphService
    ) {}

    ngAfterContentChecked() {
        if (this.drawingArea != undefined) {
            this.canvasWidth = this.drawingArea?.nativeElement.clientWidth;
        }
    }

    switchDirection() {
        this._directyFollowsGraphService.switchDirection();
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

    clickDrawArea() {
        if (this.direktfolgegraphHidden)
            this._traceCaseSelectionService.selectTraceCaseIds([]);
    }

    refresh() {
        this.tracesDetailView?.refresh();
    }
}
