import { Element } from './element';


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
