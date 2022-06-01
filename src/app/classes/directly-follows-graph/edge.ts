import * as internal from 'stream';
import { Vertex } from './vertex';

export class Edge {
    private _startVertex: Vertex;
    private _endVertex: Vertex;
    private _activityCount: number;

    public get startVertice(): Vertex {
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

    constructor(startVertex: Vertex, endVertex: Vertex, activityCount: number) {
        this._startVertex = startVertex;
        this._endVertex = endVertex;
        this._activityCount = activityCount;
    }
}
