import { Injectable } from '@angular/core';
import { Event } from '../classes/EventLog/event';
import { EventLog } from '../classes/EventLog/eventlog';
import { Trace } from '../classes/EventLog/trace';
import { ParserService } from './parser.service';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _EventLog: EventLog = new EventLog([], [], [], [], []); //

    public get eventLog(): EventLog {
        return this._EventLog;
    }
    public set eventLog(value: EventLog) {
        this._EventLog = value;
    }

    constructor() {}
}
