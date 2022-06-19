import * as internal from 'stream';
import { Vertex } from './vertex';

export class Edge {
    private _startVertex: Vertex;
    private _endVertex: Vertex;
    private _activityCount: number;
    private _svgElement: SVGElement | undefined;
    private _isReversed: boolean;

    public get startVertex(): Vertex {
        return this._startVertex;
    }
    public set startVertex(value: Vertex) {
        this._startVertex = value;
    }

    public get endVertex(): Vertex {
        return this._endVertex;
    }
    public set endVertex(value: Vertex) {
        this._endVertex = value;
    }

    public get activityCount(): number {
        return this._activityCount;
    }
    public set activityCount(value: number) {
        this._activityCount = value;
    }

    public get svgElement(): SVGElement | undefined {
        return this._svgElement;
    }

    public set svgElement(svgElement: SVGElement | undefined) {
        this._svgElement = svgElement;
        if (this._svgElement != undefined) {
            this._svgElement.onmousedown = event => {
                this.processMouseDown(event);
            };
            this._svgElement.onmouseup = event => {
                this.processMouseUp(event);
            };
        }
    }

    public get isReversed(): boolean {
        return this._isReversed;
    }
    public set isReversed(value: boolean) {
        this._isReversed = value;
    }

    constructor(startVertex: Vertex, endVertex: Vertex, activityCount: number) {
        this._startVertex = startVertex;
        this._endVertex = endVertex;
        this._activityCount = activityCount;
        this._isReversed = false;
    }

    public reverse(): void {
        let temp = this._startVertex;
        this._startVertex = this._endVertex;
        this._endVertex = temp;
        this._isReversed = !this._isReversed;
    }

    private processMouseDown(event: MouseEvent) {}

    private processMouseUp(event: MouseEvent) {}
}
