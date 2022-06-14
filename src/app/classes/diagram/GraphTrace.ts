import { Element } from './element';
import { GraphEvent } from './GraphEvent';

export class GraphTrace {
    public get caseIds(): Array<number> {
        return this._caseIds;
    }
    public get svgElements(): Array<Element> {
        return this._svgElements;
    }
    public get count(): number {
        return this._count;
    }
    public get events(): Array<GraphEvent> {
        return this._events;
    }

    constructor(
        private readonly _events: Array<GraphEvent>,
        private readonly _count: number,
        private readonly _svgElements: Array<Element>,
        private readonly _caseIds: Array<number>
    ) {}
}
