import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { Event } from '../classes/EventLog/event';
import { TraceCaseSelectionService } from './chain/common/trace-case-selection-service/trace-case-selection.service';
import { FilterArgument } from '../components/filter-area/filter-area.component';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _eventLog: EventLog;
    private _filteredEventLog: EventLog;
    private _filter: FilterArgument = new FilterArgument('', false, false);

    constructor(private _traceCaseSelectionService: TraceCaseSelectionService) {
        this._eventLog = new EventLog([], [], [], [], []);
        this._filteredEventLog = new EventLog([], [], [], [], []);
    }

    public get eventLog(): EventLog {
        if (this._filter.filterValue === '') {
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
        if (this._traceCaseSelectionService.selectedTraceCaseIds.length === 0) {
            return extractOtherFunction(this._eventLog);
        }
        const filteredTraces = this._eventLog.traces.filter(
            trace =>
                this._traceCaseSelectionService.selectedTraceCaseIds.indexOf(
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

    public changeFilter(arg: FilterArgument) {
        this._filter = arg;
        if (arg.filterValue === '') {
            return;
        }
        this._filteredEventLog.traces = [];
        this._eventLog.traces.forEach(trace => {
            if (
                trace.events.some(event => {
                    if (
                        this._filter.filterActivity &&
                        event.activity.includes(arg.filterValue)
                    ) {
                        console.log(event.activity);
                        return true;
                    }
                    if (!this._filter.filterAttributeValues) {
                        return false;
                    }
                    return event.attributes.some(attribute => {
                        return attribute.value
                            .toString()
                            .includes(arg.filterValue);
                    });
                })
            ) {
                this._filteredEventLog.traces.push(trace);
            }
        });
    }
}
