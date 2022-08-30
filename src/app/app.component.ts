import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogParserService } from './services/file-operations/log/log-parser.service';
import { DisplayService } from './services/views/value-chain/display-service/display.service';
import { debounceTime, Subscription } from 'rxjs';
import { DirectlyFollowsGraphService } from './services/views/directly-follows-graph/display.service';
import { EventlogDataService } from './services/common/data/eventlog-data.service';
import { XesParserService } from './services/file-operations/xes/xes-parser.service';
import { LogService } from './services/file-operations/log/log.service';
import { DrawingAreaComponent } from './components/drawingArea/drawingArea.component';
import { TraceCaseSelectionService } from './services/common/trace-case-selection-service/trace-case-selection.service';
import { LoadingService } from './services/views/loading/loading.service';
import { ValueChainControllerService } from './services/views/value-chain/value-chain-controller.service';
import { EventLog } from './classes/EventLog/eventlog';
import { XesParser } from './classes/parser/xesParser';
import { TypedJSON } from 'typedjson';
import { LogParser } from './classes/parser/logParser';

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

    constructor(
        private _logParserService: LogParserService,
        private _xesParserService: XesParserService,
        private _displayService: DisplayService,
        private _valueChainControllerService: ValueChainControllerService,
        private _traceCaseSelectionService: TraceCaseSelectionService,
        private _logService: LogService,
        private _directlyFollowsGraphService: DirectlyFollowsGraphService,
        public _eventlogDataService: EventlogDataService,
        private loadingSpinner: LoadingService
    ) {
        this.textareaFc = new FormControl();
        this._sub = this.textareaFc.valueChanges
            .pipe(debounceTime(400))
            .subscribe(val => this.processSourceChange(val));

        this._subSelectedTraces =
            this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
                selectedTraceCaseIds => {
                    this._selectedTraceCaseIds = selectedTraceCaseIds;
                    this.updateViews();
                }
            );
        this.textareaFc.setValue(this.logExampleValue());
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
            this._traceCaseSelectionService.selectTraceCaseIds([]);
        }
    }

    private processSourceChange(newSource: string) {
        try {
            const result = this._logParserService.parse(newSource);

            this._traceCaseSelectionService.selectTraceCaseIds([]);

            if (result !== undefined) {
                this._eventlogDataService.eventLog = result;
                this.updateViews();
            }
        } catch (e) {
            if (e !== LogParser.PARSING_ERROR) {
                alert(
                    'Unexpected error occured while parsing a .log file ' + e
                );
                throw e;
            }
        }
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

    async processLogImport(fileContent: string) {
        this.loadingSpinner.show();
        this.parseLogFile(fileContent)
            .then(result => {
                this._eventlogDataService.eventLog = result;
                this.updateTextarea(fileContent, false);
                this.updateViews();
            })
            .catch(reason => {
                let message;
                if (reason === LogParser.PARSING_ERROR) {
                    message =
                        'The uploaded .log file could not be parsed.\n' +
                        'Check the file for valid .log syntax and try again.';
                } else {
                    message =
                        'Unexpected error occurred when parsing given .log file';
                }
                alert(message);
            })
            .finally(() => {
                this.loadingSpinner.hide();
            });
    }

    async processXesImport(fileContent: string) {
        this.loadingSpinner.show();
        this.parseXesFile(fileContent)
            .then(result => {
                this._eventlogDataService.eventLog = result;
                this.updateTextarea(this._logService.generate(result), false);
                this.updateViews();
            })
            .catch(reason => {
                let message;
                if (reason === XesParser.PARSING_ERROR) {
                    message =
                        'The uploaded XES file could not be parsed.\n' +
                        'Check the file for valid XES syntax and try again.';
                } else {
                    message =
                        'Unexpected error occurred when parsing given XES file';
                }
                alert(message);
            })
            .finally(() => this.loadingSpinner.hide());
    }

    parseLogFile(fileContent: string) {
        return new Promise<EventLog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('./workers/log-parser.worker', import.meta.url)
                );
                worker.onmessage = ({ data }) => {
                    if (data == null) {
                        reject(LogParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(EventLog);
                    const result = serializer.parse(data);
                    if (result != undefined) {
                        resolve(result);
                    } else {
                        reject(LogParser.PARSING_ERROR);
                    }
                };
                worker.onerror = event => {
                    event.preventDefault();
                    reject(LogParser.PARSING_ERROR);
                };
                worker.postMessage(fileContent);
            } else {
                // web worker not available, fallback option
                try {
                    const result = this._logParserService.parse(fileContent);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

    parseXesFile(fileContent: string) {
        return new Promise<EventLog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('./workers/xes-parser.worker', import.meta.url)
                );
                worker.onmessage = ({ data }) => {
                    if (data == null) {
                        reject(XesParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(EventLog);
                    const result = serializer.parse(data);
                    if (result != undefined) {
                        resolve(result);
                    } else {
                        reject(XesParser.PARSING_ERROR);
                    }
                };
                worker.onerror = event => {
                    event.preventDefault();
                    reject(XesParser.PARSING_ERROR);
                };
                worker.postMessage(fileContent);
            } else {
                // web worker not available, fallback option
                try {
                    const result = this._xesParserService.parse(fileContent);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

    updateTextarea(fileContent: string, emitUpdateEvent = true) {
        this.textareaFc.setValue(fileContent, { emitEvent: emitUpdateEvent });
    }

    getTextareaValue() {
        return this.textareaFc.value;
    }

    updateViews() {
        this._valueChainControllerService.updateValueChain(
            this._eventlogDataService.eventLog
        );
        this._directlyFollowsGraphService.displayDirectlyFollowsGraph(
            this._eventlogDataService.eventLog
        );
    }

    updateFilter(filter: String) {
        this.updateViews();
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
            "1 'Analyze Defect' Tester3 start 1970-01-02T12:23:00.000Z\n" +
            "1 'Analyze Defect' Tester3 complete 1970-01-02T12:30:00.000Z '' '' 6 T2\n" +
            "1 'Repair (Complex)' SolverC1 start 1970-01-02T12:31:00.000Z\n" +
            "1 'Repair (Complex)' SolverC1 complete 1970-01-02T12:49:00.000Z\n" +
            "1 'Test Repair' Tester3 start 1970-01-02T12:49:00.000Z\n" +
            "1 'Test Repair' Tester3 complete 1970-01-02T12:55:00.000Z 0 true\n" +
            "1 'Inform User' System complete 1970-01-02T13:10:00.000Z\n" +
            "1 'Archive Repair' System complete 1970-01-02T13:10:00.000Z 0 true\n" +
            '10 Register System complete 1970-01-01T11:09:00.000Z\n' +
            "10 'Analyze Defect' Tester2 start 1970-01-01T11:09:00.000Z\n" +
            "10 'Analyze Defect' Tester2 complete 1970-01-01T11:15:00.000Z '' '' 3 T1\n" +
            "10 'Repair (Simple)' SolverS1 start 1970-01-01T11:35:00.000Z\n" +
            "10 'Repair (Simple)' SolverS1 complete 1970-01-01T11:42:00.000Z\n" +
            "10 'Test Repair' Tester6 start 1970-01-01T11:42:00.000Z\n" +
            "10 'Test Repair' Tester6 complete 1970-01-01T11:48:00.000Z 1 false\n" +
            "10 'Restart Repair' System complete 1970-01-01T11:54:00.000Z\n" +
            "10 'Repair (Simple)' SolverS2 start 1970-01-01T11:54:00.000Z\n" +
            "10 'Inform User' System complete 1970-01-01T11:55:00.000Z\n" +
            "10 'Repair (Simple)' SolverS2 complete 1970-01-01T12:03:00.000Z\n" +
            "10 'Test Repair' Tester4 start 1970-01-01T12:03:00.000Z\n" +
            "10 'Test Repair' Tester4 complete 1970-01-01T12:09:00.000Z 2 true\n" +
            "10 'Archive Repair' System complete 1970-01-01T12:14:00.000Z 2 true\n" +
            '100 Register System complete 1970-01-04T02:28:00.000Z\n' +
            "100 'Analyze Defect' Tester4 start 1970-01-04T02:28:00.000Z\n" +
            "100 'Analyze Defect' Tester4 complete 1970-01-04T02:36:00.000Z '' '' 8 T2\n" +
            "100 'Repair (Complex)' SolverC1 start 1970-01-04T02:52:00.000Z\n" +
            "100 'Repair (Complex)' SolverC1 complete 1970-01-04T03:09:00.000Z\n" +
            "100 'Test Repair' Tester1 start 1970-01-04T03:09:00.000Z\n" +
            "100 'Test Repair' Tester1 complete 1970-01-04T03:18:00.000Z 0 true\n" +
            "100 'Inform User' System complete 1970-01-04T03:20:00.000Z\n" +
            "100 'Archive Repair' System complete 1970-01-04T03:28:00.000Z 0 true"
        );
    }
}
