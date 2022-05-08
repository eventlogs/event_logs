import { EventLogAttribute } from "./eventlogattribute"
import { Classifier } from "./classifier";
import { Trace } from "./trace";

export class EventLog {
    private _classifiers: Array<Classifier>;
    private _globalEventAttributes: Array<EventLogAttribute>;
    private _globalTraceAttributes: Array<EventLogAttribute>;
    private _attributes: Array<EventLogAttribute>;
    private _traces: Array<Trace>;

    public get classifiers(): Array<Classifier> {
        return this._classifiers;
    }
    public set classifiers(value: Array<Classifier>) {
        this._classifiers = value;
    }

    public get globalEventAttributes(): Array<EventLogAttribute> {
        return this._globalEventAttributes;
    }
    public set globalEventAttributes(value: Array<EventLogAttribute>) {
        this._globalEventAttributes = value;
    }

    public get globalTraceAttributes(): Array<EventLogAttribute> {
        return this._globalTraceAttributes;
    }
    public set globalTraceAttributes(value: Array<EventLogAttribute>) {
        this._globalTraceAttributes = value;
    }

    public get attributes(): Array<EventLogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventLogAttribute>) {
        this._attributes = value;
    }

    public get traces(): Array<Trace> {
        return this._traces;
    }
    public set traces(value: Array<Trace>) {
        this._traces = value;
    }


    constructor( classifiers: Array<Classifier>,
        globalEventAttributes: Array<EventLogAttribute>,
        globalTraceAttributes: Array<EventLogAttribute>,
        traces : Array<Trace>,
        attributes: Array<EventLogAttribute>) {
        this._classifiers = classifiers;
        this._globalEventAttributes = globalEventAttributes;
        this._globalTraceAttributes = globalTraceAttributes;
        this._attributes = attributes;
        this._traces = traces;
    }
}