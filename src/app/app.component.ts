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

        this.processXesImport(this.xesExampleValue());

        this._subSelectedTraces =
            this.traceCaseSelectionService.selectedTraceCaseIds$.subscribe(
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
            this.traceCaseSelectionService.selectTraceCaseIds([]);
        }
    }

    private processSourceChange(newSource: string) {
        const result = this._logParserService.parse(newSource);

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
            }
            this.updateViews();
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
            const result = this._xesParserService.parse(fileContent);
            this._xesImport = true;
            if (result !== undefined) {
                this._eventlogDataService.eventLog = result;
                this.updateTextarea(this._logService.generate(result));
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

    xesExampleValue() {
        return (
            '<?xml version="1.0" encoding="UTF-8"?>' +
            '<log xes.version="1.0" xes.features="nested-attributes">' +
            '<extension name="Lifecycle" prefix="lifecycle" uri="http://www.xes-standard.org/lifecycle.xesext"/>' +
            '<extension name="Organizational" prefix="org" uri="http://www.xes-standard.org/org.xesext"/>' +
            '<extension name="Time" prefix="time" uri="http://www.xes-standard.org/time.xesext"/>' +
            '<extension name="Concept" prefix="concept" uri="http://www.xes-standard.org/concept.xesext"/>' +
            '<extension name="Semantic" prefix="semantic" uri="http://www.xes-standard.org/semantic.xesext"/>' +
            '<global scope="trace">' +
            '<string key="concept:name" value="__INVALID__"/>' +
            '</global>' +
            '<global scope="event">' +
            '<string key="concept:name" value="__INVALID__"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '</global>' +
            '<classifier name="MXML_Legacy_Classifier" keys="concept:name lifecycle:transition"/>' +
            '<classifier name="Event_Name" keys="concept:name"/>' +
            '<classifier name="Resource" keys="org:resource"/>' +
            '<classifier name="Event_Name_AND_Resource" keys="concept:name org:resource"/>' +
            '<string key="source" value="CPN Tools simulation"/>' +
            '<string key="concept:name" value="repairExample.mxml"/>' +
            '<string key="lifecycle:model" value="standard"/>' +
            '<string key="description" value="Simulated process"/>' +
            '<trace>' +
            '<string key="concept:name" value="1"/>' +
            '<string key="description" value="Simulated process instance"/>' +
            '<event>' +
            '<string key="concept:name" value="Register"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:23:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="org:resource" value="Tester3"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:23:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="defectType" value="6"/>' +
            '<string key="org:resource" value="Tester3"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="phoneType" value="T2"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:30:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Complex)"/>' +
            '<string key="org:resource" value="SolverC1"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:31:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Complex)"/>' +
            '<string key="org:resource" value="SolverC1"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:49:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="org:resource" value="Tester3"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:49:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="numberRepairs" value="0"/>' +
            '<string key="org:resource" value="Tester3"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-02T12:55:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Inform User"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-02T13:10:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Archive Repair"/>' +
            '<string key="numberRepairs" value="0"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-02T13:10:00.000Z"/>' +
            '</event>' +
            '</trace>' +
            '<trace>' +
            '<string key="concept:name" value="10"/>' +
            '<string key="description" value="Simulated process instance"/>' +
            '<event>' +
            '<string key="concept:name" value="Register"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:09:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="org:resource" value="Tester2"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:09:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="defectType" value="3"/>' +
            '<string key="org:resource" value="Tester2"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="phoneType" value="T1"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:15:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Simple)"/>' +
            '<string key="org:resource" value="SolverS1"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:35:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Simple)"/>' +
            '<string key="org:resource" value="SolverS1"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:42:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="org:resource" value="Tester6"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:42:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="numberRepairs" value="1"/>' +
            '<string key="org:resource" value="Tester6"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="false"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:48:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Restart Repair"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:54:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Simple)"/>' +
            '<string key="org:resource" value="SolverS2"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:54:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Inform User"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-01T11:55:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Simple)"/>' +
            '<string key="org:resource" value="SolverS2"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-01T12:03:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="org:resource" value="Tester4"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-01T12:03:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="numberRepairs" value="2"/>' +
            '<string key="org:resource" value="Tester4"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-01T12:09:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Archive Repair"/>' +
            '<string key="numberRepairs" value="2"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-01T12:14:00.000Z"/>' +
            '</event>' +
            '</trace>' +
            '<trace>' +
            '<string key="concept:name" value="100"/>' +
            '<string key="description" value="Simulated process instance"/>' +
            '<event>' +
            '<string key="concept:name" value="Register"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-04T02:28:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="org:resource" value="Tester4"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-04T02:28:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Analyze Defect"/>' +
            '<string key="defectType" value="8"/>' +
            '<string key="org:resource" value="Tester4"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="phoneType" value="T2"/>' +
            '<date key="time:timestamp" value="1970-01-04T02:36:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Complex)"/>' +
            '<string key="org:resource" value="SolverC1"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-04T02:52:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Repair (Complex)"/>' +
            '<string key="org:resource" value="SolverC1"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-04T03:09:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="org:resource" value="Tester1"/>' +
            '<string key="lifecycle:transition" value="start"/>' +
            '<date key="time:timestamp" value="1970-01-04T03:09:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Test Repair"/>' +
            '<string key="numberRepairs" value="0"/>' +
            '<string key="org:resource" value="Tester1"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-04T03:18:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Inform User"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<date key="time:timestamp" value="1970-01-04T03:20:00.000Z"/>' +
            '</event>' +
            '<event>' +
            '<string key="concept:name" value="Archive Repair"/>' +
            '<string key="numberRepairs" value="0"/>' +
            '<string key="org:resource" value="System"/>' +
            '<string key="lifecycle:transition" value="complete"/>' +
            '<string key="defectFixed" value="true"/>' +
            '<date key="time:timestamp" value="1970-01-04T03:28:00.000Z"/>' +
            '</event>' +
            '</trace>' +
            '</log>'
        );
    }
}
