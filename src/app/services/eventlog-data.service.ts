import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { DisplayService } from './display.service';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _eventLog: EventLog;

    constructor(private _displayService: DisplayService) {
        this._eventLog = new EventLog([], [], [], [], []);
    }

    public get eventLog(): EventLog {
        return this._eventLog;
    }

    public set eventLog(value: EventLog) {
        this._eventLog = value;
    }

    public get eventLogWithSelectedOrAllWhenNothingSelected() {
        if (this._displayService.selectedTraceCaseIds.length === 0) {
            return this._eventLog;
        }
        const filteredTraces = this._eventLog.traces.filter(
            trace =>
                this._displayService.selectedTraceCaseIds.indexOf(
                    trace.caseId
                ) !== -1
        );
        return new EventLog(
            this._eventLog.classifiers,
            this._eventLog.globalEventAttributes,
            this._eventLog.globalTraceAttributes,
            filteredTraces,
            this._eventLog.attributes
        );
    }
}
