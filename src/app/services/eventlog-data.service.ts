import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { DisplayService } from './display.service';
import { Event } from '../classes/EventLog/event';

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
        return this.eventLogWithSelectedOrOtherWhenNothingSelected(
            thisEventLog => thisEventLog
        );
    }

    public get eventLogWithSelectedOrNothingWhenNothingSelected() {
        return this.eventLogWithSelectedOrOtherWhenNothingSelected(
            thisEventLog =>
                new EventLog(
                    thisEventLog.classifiers,
                    thisEventLog.globalEventAttributes,
                    thisEventLog.globalTraceAttributes,
                    [],
                    thisEventLog.attributes
                )
        );
    }

    public getCaseId(event: Event): number {
        for (let trace of this._eventLog.traces) {
            if (trace.events.includes(event)) {
                return trace.caseId;
            }
        }
        return 0;
    }

    private eventLogWithSelectedOrOtherWhenNothingSelected(
        extractOtherFunction: (thisEventLog: EventLog) => EventLog
    ): EventLog {
        if (this._displayService.selectedTraceCaseIds.length === 0) {
            return extractOtherFunction(this._eventLog);
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
