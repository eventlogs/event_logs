import { Component, EventEmitter, Output } from '@angular/core';
import { EventLog } from '../../classes/EventLog/eventlog';
import { DisplayService } from '../../services/display.service';
import { LogService } from '../../services/log.service';
import { DirectlyFollowsGraphService } from '../../services/directly-follows-graph/display.service';
import { XesService } from '../../services/xes.service';
import { EventlogDataService } from '../../services/eventlog-data.service';
import { SvgService as ValueChainSvgService } from '../../services/svg.service';
import { SvgService as DirectlyFollowsGraphSvgService } from '../../services/directly-follows-graph/svg.service';

@Component({
    selector: 'app-export-button',
    templateUrl: './export-button.component.html',
    styleUrls: ['./export-button.component.scss'],
})
export class ExportButtonComponent {
    @Output() processImport = new EventEmitter<[string, string]>();
    public _selectedTraceCaseIds: Array<number> = [];

    constructor(
        public _eventLogDataService: EventlogDataService,
        private _displayService: DisplayService,
        private _logService: LogService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _xesService: XesService,
        private _valueChainSvgService: ValueChainSvgService,
        private _directlyFollowsGraphSvgService: DirectlyFollowsGraphSvgService
    ) {
        this._displayService.selectedTraceCaseIds$.subscribe(
            selectedTraceCaseIds => {
                this._selectedTraceCaseIds = selectedTraceCaseIds;
            }
        );
    }

    getLogExportValue(eventLog: EventLog) {
        return this._logService.generate(eventLog);
    }

    getXesExportValue(eventLog: EventLog) {
        return this._xesService.generate(eventLog);
    }

    processReimport() {
        this.processImport.emit([
            'log',
            this.getLogExportValue(
                this._eventLogDataService
                    .eventLogWithSelectedOrNothingWhenNothingSelected
            ),
        ]);
        this._displayService.selectTraceCaseIds([]);
    }

    getSvgValueChainExportValue() {
        const elements = this._valueChainSvgService.createSvgElements(
            this._displayService.diagram,
            this._selectedTraceCaseIds
        );
        let svg =
            '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">';
        elements.forEach(element => {
            svg += element.outerHTML;
        });
        svg += '</svg>';
        return svg;
    }

    getSvgDirectlyFollowsGraphExportValue() {
        const elements = this._directlyFollowsGraphSvgService.createSvgElements(
            this._directlyFollowsGraphService.graph
        );
        let svg =
            '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">';
        elements.forEach(element => {
            svg += element.outerHTML;
        });
        svg += '</svg>';
        return svg;
    }
}
