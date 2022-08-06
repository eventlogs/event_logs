import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogParserService } from './services/log-parser.service';
import { DisplayService } from './services/chain/value-chain/display-service/display.service';
import { debounceTime, Subscription } from 'rxjs';
import { DirectlyFollowsGraphService } from './services/directly-follows-graph/display.service';
import { EventlogDataService } from './services/eventlog-data.service';
import { XesParserService } from './services/xes-parser.service';
import { LogService } from './services/log.service';
import { DrawingAreaComponent } from './components/drawingArea/drawingArea.component';
import { TraceCaseSelectionService } from './services/chain/common/trace-case-selection-service/trace-case-selection.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    @ViewChild('drawingArea') drawingArea!: DrawingAreaComponent;

    public textareaFc: FormControl;
    private _sub: Subscription;
    private _subSelectedTraces: Subscription;
    public _selectedTraceCaseIds: Array<number> = [];
    private _xesImport: boolean = false;

    constructor(
        private _logParserService: LogParserService,
        private _xesParserService: XesParserService,
        private _displayService: DisplayService,
        private traceCaseSelectionService: TraceCaseSelectionService,
        private _logService: LogService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        public _eventlogDataService: EventlogDataService
    ) {
        this.textareaFc = new FormControl();
        this._sub = this.textareaFc.valueChanges
            .pipe(debounceTime(400))
            .subscribe(val => this.processSourceChange(val));

        this.processLogImport(this.logExampleValue());

        this._subSelectedTraces =
            this.traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    console.log("update views sub selected traces");
                    this.updateViews();
                }
            );
        console.log("update views constructor");
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
            this.traceCaseSelectionService.selectTraceCaseIds([]);
        }
    }

    private processSourceChange(newSource: string) {
        console.log("Parse new source in textfield");
        const startLogParse = Date.now();
        const result = this._logParserService.parse(newSource);
        console.log("Done parsing new souce - took " + ((Date.now() - startLogParse)/1000) + " seconds");
        // Ausgewählte Traces zurücksetzen, wenn mindestens eine Case Id nicht mehr vorhanden ist
        for (const caseId of this._selectedTraceCaseIds) {
            const caseIdStillExists =
                result.traces.filter(
                    trace => [caseId].indexOf(trace.caseId) !== -1
                ).length > 0;
            if (!caseIdStillExists) {
                this.traceCaseSelectionService.selectTraceCaseIds([]);
                break;
            }
        }

        if (result !== undefined) {
            if (!this._xesImport) {
                this._eventlogDataService.eventLog = result;
                console.log("update views source change");
                this.updateViews();
            }
        }
        this._xesImport = false;
    }

    processImport([fileExtension, fileContent]: [string, string]) {
        if (['log', 'txt'].includes(fileExtension)) {
            this.processLogImport(fileContent);
        } else if ('xes' === fileExtension) {
            this.processXesImport(fileContent);
        } else {
            alert(
                'The current filetype ' +
                    fileExtension +
                    ' can not be imported!'
            );
        }
    }

    processLogImport(fileContent: string) {
        this.updateTextarea(fileContent);
    }

    processXesImport(fileContent: string) {
        try {
            console.log("parsing content");
            const startParsing = Date.now();
            const result = this._xesParserService.parse(fileContent);
            console.log("done parsing - took " + ((Date.now() - startParsing)/1000) + " seconds");
            this._xesImport = true;
            if (result !== undefined) {
                console.log("updating event log representation");
                const startStoreLog = Date.now();
                this._eventlogDataService.eventLog = result;
                console.log("done updating log rep - took " + ((Date.now() - startStoreLog)/1000) + " seconds");
                console.log("updating textarea");
                const startTextarea = Date.now();
                this.updateTextarea(this._logService.generate(result));
                console.log("done updating textarea - took " + ((Date.now() - startTextarea)/1000) + " seconds");
                console.log("update views xes import");
                this.updateViews();
            }
        } catch (e) {
            this._xesImport = false;
            if (e === XesParserService.PARSING_ERROR) {
                alert(
                    'The uploaded XES file could not be parsed.\n' +
                        'Check the file for valid XES syntax and try again.'
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

    updateViews() {
        this._displayService.displayEventLog(
            this._eventlogDataService.eventLog
        );
        this._directlyFollowsGraphService.displayDirectlyFollowsGraph(
            this._eventlogDataService.eventLog
        );
        this.drawingArea?.refresh();
    }

    logExampleValue() {
        return (
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'concept:name\n' +
            'org:resource\n' +
            'lifecycle:transition\n' +
            'time:timestamp\n' +
            'numberRepairs\n' +
            'defectFixed\n' +
            'defectType\n' +
            'phoneType\n' +
            '.events\n' +
            '1 Register System complete 1970-01-02T12:23:00.000Z\n' +
            '1 \'Analyze Defect\' Tester3 start 1970-01-02T12:23:00.000Z\n' +
            '1 \'Analyze Defect\' Tester3 complete 1970-01-02T12:30:00.000Z \'\' \'\' 6 T2\n' +
            '1 \'Repair (Complex)\' SolverC1 start 1970-01-02T12:31:00.000Z\n' +
            '1 \'Repair (Complex)\' SolverC1 complete 1970-01-02T12:49:00.000Z\n' +
            '1 \'Test Repair\' Tester3 start 1970-01-02T12:49:00.000Z\n' +
            '1 \'Test Repair\' Tester3 complete 1970-01-02T12:55:00.000Z 0 true\n' +
            '1 \'Inform User\' System complete 1970-01-02T13:10:00.000Z\n' +
            '1 \'Archive Repair\' System complete 1970-01-02T13:10:00.000Z 0 true\n' +
            '10 Register System complete 1970-01-01T11:09:00.000Z\n' +
            '10 \'Analyze Defect\' Tester2 start 1970-01-01T11:09:00.000Z\n' +
            '10 \'Analyze Defect\' Tester2 complete 1970-01-01T11:15:00.000Z \'\' \'\' 3 T1\n' +
            '10 \'Repair (Simple)\' SolverS1 start 1970-01-01T11:35:00.000Z\n' +
            '10 \'Repair (Simple)\' SolverS1 complete 1970-01-01T11:42:00.000Z\n' +
            '10 \'Test Repair\' Tester6 start 1970-01-01T11:42:00.000Z\n' +
            '10 \'Test Repair\' Tester6 complete 1970-01-01T11:48:00.000Z 1 false\n' +
            '10 \'Restart Repair\' System complete 1970-01-01T11:54:00.000Z\n' +
            '10 \'Repair (Simple)\' SolverS2 start 1970-01-01T11:54:00.000Z\n' +
            '10 \'Inform User\' System complete 1970-01-01T11:55:00.000Z\n' +
            '10 \'Repair (Simple)\' SolverS2 complete 1970-01-01T12:03:00.000Z\n' +
            '10 \'Test Repair\' Tester4 start 1970-01-01T12:03:00.000Z\n' +
            '10 \'Test Repair\' Tester4 complete 1970-01-01T12:09:00.000Z 2 true\n' +
            '10 \'Archive Repair\' System complete 1970-01-01T12:14:00.000Z 2 true\n' +
            '100 Register System complete 1970-01-04T02:28:00.000Z\n' +
            '100 \'Analyze Defect\' Tester4 start 1970-01-04T02:28:00.000Z\n' +
            '100 \'Analyze Defect\' Tester4 complete 1970-01-04T02:36:00.000Z \'\' \'\' 8 T2\n' +
            '100 \'Repair (Complex)\' SolverC1 start 1970-01-04T02:52:00.000Z\n' +
            '100 \'Repair (Complex)\' SolverC1 complete 1970-01-04T03:09:00.000Z\n' +
            '100 \'Test Repair\' Tester1 start 1970-01-04T03:09:00.000Z\n' +
            '100 \'Test Repair\' Tester1 complete 1970-01-04T03:18:00.000Z 0 true\n' +
            '100 \'Inform User\' System complete 1970-01-04T03:20:00.000Z\n' +
            '100 \'Archive Repair\' System complete 1970-01-04T03:28:00.000Z 0 true'
        )
    }
}
