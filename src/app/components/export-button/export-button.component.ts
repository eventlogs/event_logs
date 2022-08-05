import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { DisplayService } from '../../services/chain/value-chain/display-service/display.service';
import { LogService } from '../../services/log.service';
import { DirectlyFollowsGraphService } from '../../services/directly-follows-graph/display.service';
import { XesService } from '../../services/xes.service';
import { EventlogDataService } from '../../services/eventlog-data.service';
import { SvgService as DirectlyFollowsGraphSvgService } from '../../services/directly-follows-graph/svg.service';
import { saveAs } from 'file-saver';
import { SvgService } from '../../services/chain/common/svg-service/svg.service';
import { TraceCaseSelectionService } from '../../services/chain/common/trace-case-selection-service/trace-case-selection.service';

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
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _logService: LogService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _xesService: XesService,
        @Inject(SvgService.VALUE_CHAIN_INSTANCE)
        private _valueChainSvgService: SvgService,
        private _directlyFollowsGraphSvgService: DirectlyFollowsGraphSvgService
    ) {
        this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
            selectedTraceCaseIds => {
                this._selectedTraceCaseIds = selectedTraceCaseIds;
            }
        );
    }

    exportLog(completeEventLog: boolean) {
        this.saveFile(
            this._logService.generate(
                completeEventLog
                    ? this._eventLogDataService.eventLog
                    : this._eventLogDataService
                          .eventLogWithSelectedOrNothingWhenNothingSelected
            ),
            'text/plain;charset=utf-8',
            true,
            'event.log'
        );
    }

    exportXes(completeEventLog: boolean) {
        this.saveFile(
            this._xesService.generate(
                completeEventLog
                    ? this._eventLogDataService.eventLog
                    : this._eventLogDataService
                          .eventLogWithSelectedOrNothingWhenNothingSelected
            ),
            'text/plain;charset=utf-8',
            true,
            'event.xes'
        );
    }

    processReimport() {
        this.processImport.emit([
            'log',
            this._logService.generate(
                this._eventLogDataService
                    .eventLogWithSelectedOrNothingWhenNothingSelected
            ),
        ]);
        this._traceCaseSelectionService.selectTraceCaseIds([]);
    }

    exportSvgValueChain() {
        const elements = this._valueChainSvgService.createSvgElements(
            this._displayService.diagram,
            this._selectedTraceCaseIds,
            true,
            true
        );
        this.saveFile(
            this.getSvg(elements),
            'text/plain;charset=utf-8',
            true,
            'event.svg'
        );
    }

    exportSvgDirectlyFollowsGraph() {
        const elements = this._directlyFollowsGraphSvgService.createSvgElements(
            this._directlyFollowsGraphService.graph
        );
        this.saveFile(
            this.getSvg(elements),
            'text/plain;charset=utf-8',
            true,
            'event.svg'
        );
    }

    getSvg(elements: SVGElement[]) {
        let svg =
            '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">';
        elements.forEach(element => {
            svg += element.outerHTML;
        });
        svg += '</svg>';
        return svg;
    }

    saveFile(
        fileContent: string,
        fileType: string,
        datePrefix: boolean,
        fileName: string
    ) {
        saveAs(
            new Blob([fileContent], { type: fileType }),
            (datePrefix ? new Date().toLocaleString() + '_' : '') + fileName
        );
    }

    shouldDisableExport(selectedOnly: boolean) {
        if (this._eventLogDataService.eventLog.traces.length === 0) {
            return true;
        }
        if (selectedOnly && this._selectedTraceCaseIds.length === 0) {
            return true;
        }
        return false;
    }
}
