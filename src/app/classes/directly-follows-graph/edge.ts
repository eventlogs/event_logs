import * as internal from 'stream';
import { Vertex } from './vertex';

export class Edge {
    private _startVertex: Vertex;
    private _endVertex: Vertex;
    private _activityCount: number;
    private _pathSvgElement: SVGElement | undefined;
    private _textSvgElement: SVGElement | undefined;
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

    public get pathSvgElement(): SVGElement | undefined {
        return this._pathSvgElement;
    }

    public set pathSvgElement(svgElement: SVGElement | undefined) {
        this._pathSvgElement = svgElement;
    }

    public get textSvgElement(): SVGElement | undefined {
        return this._textSvgElement;
    }

    public set textSvgElement(svgElement: SVGElement | undefined) {
        this._textSvgElement = svgElement;
    }

    public get isReversed(): boolean {
        return this._isReversed;
    }
    public set isReversed(value: boolean) {
        this._isReversed = value;
    }

    constructor(
        startVertex: Vertex,
        endVertex: Vertex,
        activityCount: number = 0,
        isReversed: boolean = false
    ) {
        this._startVertex = startVertex;
        this._endVertex = endVertex;
        this._activityCount = activityCount;
        this._isReversed = isReversed;
    }

    public reverse(): void {
        let temp = this._startVertex;
        this._startVertex = this._endVertex;
        this._endVertex = temp;
        this._isReversed = !this._isReversed;
    }

    public isTargetingSelf(): boolean {
        return this._startVertex == this._endVertex;
    }
}
