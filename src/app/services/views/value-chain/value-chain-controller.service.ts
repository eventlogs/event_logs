import { Inject, Injectable } from "@angular/core";
import { SvgService } from "../../common/svg-service/svg.service";
import { EventLog } from "../../../classes/EventLog/eventlog";
import { DisplayService } from "./display-service/display.service";
import { LayoutService } from "../../common/layout-service/layout.service";
import { TraceCaseSelectionService } from "../../common/trace-case-selection-service/trace-case-selection.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValueChainControllerService {
    _elements$: BehaviorSubject<Array<SVGElement>>;
    widthPx: number = 1080;
    heightPx: number = 390;

    constructor(private _displayService: DisplayService,
        @Inject(LayoutService.VALUE_CHAIN_INSTANCE)
        private _layoutService: LayoutService,
        @Inject(SvgService.VALUE_CHAIN_INSTANCE)
        private _svgService: SvgService,
        private _traceCaseSelectionService: TraceCaseSelectionService
    ) {
        this._elements$ = new BehaviorSubject(new Array<SVGElement>());
    }

    public updateValueChain(log: EventLog) {
        let diagram = this._displayService.displayEventLog(log);
        [this.widthPx, this.heightPx] = this._layoutService.layout(
            this._displayService.diagram
        );
        const elements = this._svgService.createSvgElements(
            diagram,
            this._traceCaseSelectionService.selectedTraceCaseIds,
            false
        );
        this._elements$.next(elements);
    }
}
