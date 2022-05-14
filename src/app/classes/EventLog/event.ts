import { EventLogAttribute } from "./eventlogattribute";

export class Event {
    private _attributes: Array<EventLogAttribute>;
    private _activity: String;
    
    public get attributes(): Array<EventLogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventLogAttribute>) {
        this._attributes = value;
    }

    public get activity(): String {
        return this._activity;
    }
    public set activity(value: String) {
        this._activity = value;
    }

    constructor( attributes: Array<EventLogAttribute>, activity: string) {
        this._activity = activity;
        this._attributes = attributes;
    }
}