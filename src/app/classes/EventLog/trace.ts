import { EventLogAttribute } from './eventlogattribute';
import { Event } from './event';

export class Trace {
    private _attributes: Array<EventLogAttribute>;
    private _events: Array<Event>;
    private _caseId: Number;

    public get attributes(): Array<EventLogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventLogAttribute>) {
        this._attributes = value;
    }

    public get events(): Array<Event> {
        return this._events;
    }
    public set events(value: Array<Event>) {
        this._events = value;
    }

    public get caseId(): Number {
        return this._caseId;
    }
    public set caseId(value: Number) {
        this._caseId = value;
    }

    constructor(
        attributes: Array<EventLogAttribute>,
        events: Array<Event>,
        caseId: Number
    ) {
        this._attributes = attributes;
        this._events = events;
        this._caseId = caseId;
    }
}
