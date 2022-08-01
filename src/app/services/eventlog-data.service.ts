import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { DisplayService } from './display.service';
import { Event } from '../classes/EventLog/event';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _eventLog: EventLog;
    private _filteredEventLog: EventLog;
    private _filter: string = '';

    constructor(private _displayService: DisplayService) {
        this._eventLog = new EventLog([], [], [], [], []);
        this._filteredEventLog = new EventLog([], [], [], [], []);
    }

    public get eventLog(): EventLog {
        // console.log(this._eventLog);
        if (this._filter === '') {
            return this._eventLog;
        }
        return this._filteredEventLog;
    }

    public set eventLog(value: EventLog) {
        this._eventLog = value;
        this.changeFilter(this._filter);
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

    public changeFilter(str: string) {
        this._filter = str;
        if (str === '') {
            return;
        }
        console.log(str);
        //this._filteredEventLog = JSON.parse(JSON.stringify(this._eventLog));
        this._filteredEventLog.traces = [];
        // for( let trace in this._eventLog.traces) {

        // }
        console.log('this._eventLog');
        console.log(this._eventLog);
        this._eventLog.traces.forEach(trace => {
            if (
                trace.events.some(event => {
                    console.log('event');
                    console.log(event);
                    if (event.activity.includes(str)) {
                        return true;
                    }
                    console.log('attributes');
                    console.log(event.attributes);
                    return event.attributes.some(attribute => {
                        return attribute.value.toString().includes(str);
                    });
                })
            ) {
                this._filteredEventLog.traces.push(trace);
            }
        });
        console.log('this._filteredEventLog');
        console.log(this._filteredEventLog);
    }
}
