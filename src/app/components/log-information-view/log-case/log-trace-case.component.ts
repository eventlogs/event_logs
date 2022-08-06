import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Trace } from '../../../classes/EventLog/trace';
import { DisplayService } from '../../../services/chain/log-information/display-service/display.service';
import { Subscription } from 'rxjs';
import { Diagram } from '../../../classes/diagram/diagram';
import { LayoutService } from '../../../services/chain/common/layout-service/layout.service';
import { SvgService } from '../../../services/chain/common/svg-service/svg.service';
import { TraceCaseSelectionService } from '../../../services/chain/common/trace-case-selection-service/trace-case-selection.service';

@Component({
    selector: 'app-log-trace-case',
    providers: [DisplayService],
    templateUrl: './log-trace-case.component.html',
    styleUrls: ['./log-trace-case.component.scss'],
})
export class LogTraceCaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvas: ElementRef<SVGElement> | undefined;

    @Input() traceCaseItem?: Trace;
    @Input() closedStatus: string = 'show';
    @Input() openStatus: string = 'hide';

    public layoutService = LayoutService;

    public svgWidthPx: number = 0;
    public svgHeightPx: number = 0;

    private _sub: Subscription | undefined;
    private _diagram: Diagram | undefined;
    private _subSelectedTraces: Subscription | undefined;
    private _selectedTraceCaseIds: Array<number> = [];

    status: string = this.closedStatus;

    constructor(
        private _displayService: DisplayService,
        private _traceCaseSelectionService: TraceCaseSelectionService,
        @Inject(LayoutService.LOG_INFORMATION_INSTANCE)
        private _layoutService: LayoutService,
        @Inject(SvgService.LOG_INFORMATION_INSTANCE)
        private _svgService: SvgService
    ) {}

    ngOnInit(): void {
        if (this.traceCaseItem) {
            this._displayService.displayLogTraceCase(this.traceCaseItem);
        }

        this._sub = this._displayService.diagram$.subscribe(diagram => {
            this._diagram = diagram;
            [this.svgWidthPx, this.svgHeightPx] = this._layoutService.layout(
                this._diagram
            );
            if (this.canvas == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            console.log("CV init");
            this.draw();
        });
        this._subSelectedTraces =
            this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    console.log("borders only");
                    this.drawSelectedBorder();
                }
            );
    }

    ngAfterViewInit(): void {
        console.log("after view init");
        this.draw();
    }

    ngOnDestroy(): void {
        this._sub?.unsubscribe();
        this._subSelectedTraces?.unsubscribe();
    }

    private draw() {
        if (this.canvas === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }

        this.clearDrawingArea();
        console.log("creating svg elements for case view");
        const startCaseView = Date.now();
        const elements = this._svgService.createSvgElements(
            this._displayService.diagram,
            this._selectedTraceCaseIds
        );
        console.log("svg elements ready - took " + ((Date.now() - startCaseView)/1000) + " seconds");
        console.log("draw case view");
        const startDrawCv = Date.now();
        for (const element of elements) {
            this.canvas.nativeElement.appendChild(element);
            console.log("draw element");
        }
        console.log("finished drawing case view - took " + ((Date.now() - startDrawCv)/1000) + " seconds");
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

    toggleStatus() {
        if (this.status === this.closedStatus) {
            this.status = this.openStatus;
        } else {
            this.status = this.closedStatus;
        }
    }

    public getDataWidthStyle() {
        return (
            this.svgWidthPx -
            LayoutService.X_LABELSIZE_LOG_INFORMATION -
            LayoutService.X_OFFSET_LOG_INFORMATION
        );
    }
}
