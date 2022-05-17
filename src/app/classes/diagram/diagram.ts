import {Element} from './element';
import { GraphTrace } from './GraphTrace';

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
