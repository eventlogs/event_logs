import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _EventLog: EventLog;

    public get eventLog(): EventLog {
        return this._EventLog;
    }

    public set eventLog(value: EventLog) {
        this._EventLog = value;
    }

    constructor() {
        this._EventLog = new EventLog([], [], [], [], []);
    }
}
