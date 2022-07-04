import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogParserService } from './services/log-parser.service';
import { DisplayService } from './services/display.service';
import { debounceTime, Subscription } from 'rxjs';
import { XesService } from './services/xes.service';
import { DirectlyFollowsGraphService } from './services/directly-follows-graph/display.service';
import { EventlogDataService } from './services/eventlog-data.service';
import { XesParserService } from './services/xes-parser.service';
import { LogService } from './services/log.service';
import { TracesDetailViewComponent } from './components/traces-detail-view/traces-detail-view.component';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    @ViewChild('tracesDetailView') tracesDetailView!: TracesDetailViewComponent;
    @ViewChild('sidenav') sidenav!: MatSidenavContainer;

    public textareaFc: FormControl;
    private _sub: Subscription;
    private _subSelectedTraces: Subscription;
    public _selectedTraceCaseIds: Array<number> = [];

    constructor(
        private _logParserService: LogParserService,
        private _xesParserService: XesParserService,
        private _displayService: DisplayService,
        private _logService: LogService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        private _xesService: XesService,
        private _eventlogDataService: EventlogDataService
    ) {
        this.textareaFc = new FormControl();
        this._sub = this.textareaFc.valueChanges
            .pipe(debounceTime(400))
            .subscribe(val => this.processSourceChange(val));
        this.textareaFc.setValue(this.textareaExampleValue());
        this._eventlogDataService.eventLog = this._logParserService.parse(
            this.textareaExampleValue()
        );

        this._subSelectedTraces =
            this._displayService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    this.updateViews();
                }
            );
        this.updateViews();
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
        this._subSelectedTraces.unsubscribe();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        var activeElement = document.activeElement;
        var inputs = ['input', 'textarea'];
        if (
            activeElement &&
            inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1
        ) {
            return;
        }

        if (event.key == 'Escape') {
            this._displayService.selectTraceCaseIds([]);
        }
        if (event.key == 'Delete') {
            let eventLog = this._eventlogDataService.eventLog;
            eventLog.deleteTraceByCaseIds(
                this._displayService.selectedTraceCaseIds
            );
            this._displayService.selectTraceCaseIds([]);
            this.updateTextarea(this._logService.generate(eventLog));
        }
    }

    private processSourceChange(newSource: string) {
        const result = this._logParserService.parse(newSource);
        if (result !== undefined) {
            this._eventlogDataService.eventLog = result;
            this.updateViews();
        }
    }

    processXesImport(fileContent: string) {
        try {
            const result = this._xesParserService.parse(fileContent);
            if (result !== undefined) {
                this._eventlogDataService.eventLog = result;
                this.updateTextarea(this._logService.generate(result));
                this.updateViews();
            }
        } catch (e) {
            if (e === XesParserService.PARSING_ERROR) {
                alert(
                    'Die hochgeladenen XES-Datei konnte nicht geparsed werden.\n' +
                        'Prüfe die Datei auf einen valide XES-Syntax und versuche es erneut.'
                );
            } else {
                throw e;
            }
        }
    }

    updateTextarea(fileContent: string) {
        this.textareaFc.setValue(fileContent);
    }

    getTextareaValue() {
        return this.textareaFc.value;
    }

    textareaExampleValue() {
        return (
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'activity\n' +
            'booleanValue\n' +
            'intValue\n' +
            'floatValue\n' +
            'dateValue\n' +
            'stringValue\n' +
            '.events\n' +
            '1 Auto true 1 1.3 2020-01-31 basadf\n' +
            '1 Schiff true 2 2.3 2020-01-31 dasf\n' +
            '2 BusBus false 3 4.5 2020-01-31 adsf\n' +
            '2 Bus false 4 6.7 2020-01-31 adfd'
        );
    }

    getLogExportValue() {
        return this._logService.generate(
            this._eventlogDataService
                .eventLogWithSelectedOrAllWhenNothingSelected
        );
    }

    getXesExportValue() {
        return this._xesService.generate(
            this._eventlogDataService
                .eventLogWithSelectedOrAllWhenNothingSelected
        );
    }

    updateViews() {
        this._displayService.displayEventLog(
            this._eventlogDataService.eventLog
        );
        this._directlyFollowsGraphService.displayDirectlyFollowsGraph(
            this._eventlogDataService
                .eventLogWithSelectedOrAllWhenNothingSelected
        );

        if (!this._displayService.selectedTraceCaseIds.length) {
            this.sidenav?.close();
        }

        this.tracesDetailView?.refresh();
    }
}
