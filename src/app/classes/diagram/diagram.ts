import { Element } from './element';
import { GraphTrace } from './GraphTrace';

export class Diagram {
    private readonly _traces: Array<GraphTrace>;

    public get traces(): Array<GraphTrace> {
        return this._traces;
    }

    constructor(traces: Array<GraphTrace>) {
        this._traces = traces;
    }
}
