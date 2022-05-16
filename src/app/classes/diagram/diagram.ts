import {Element} from './element';

export class GraphEvent {
    public get svgElements(): Array<Element> {
        return this._svgElements;
    }
    public get activity(): String {
        return this._activity;
    }
    constructor( 
        private readonly _activity: String,
        private readonly _svgElements: Array<Element>) {

    }
}

export class GraphTrace {
    public get events(): Array<GraphEvent> {
        return this._events;
    }

    constructor(    
        private readonly _events: Array<GraphEvent>,
        private readonly _count: Number,
        private readonly _caseIds: Array<Number>) {

    }
}

export class Diagram {
    private readonly _elements: Array<Element>; // TODO entfernen?
    private readonly _traces: Array<GraphTrace>;
    
    public get traces(): Array<GraphTrace> {
        return this._traces;
    }

    constructor(traces: Array<GraphTrace>) {
        this._elements = [];
        this._traces = traces;
    }

    get elements(): Array<Element> {
        return this._elements;
    }

    public addElement(element: Element): void {
        this._elements.push(element);
    }
}
