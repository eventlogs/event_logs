import { Edge } from './edge';
import { Vertex } from './vertex';

export class Graph {
    private _vertices: Array<Vertex>;
    private _edges: Array<Edge>;

    public get vertices(): Array<Vertex> {
        return this._vertices;
    }

    public get edges(): Array<Edge> {
        return this._edges;
    }

    constructor(vertices: Array<Vertex>, edges: Array<Edge>) {
        this._vertices = vertices;
        this._edges = edges;
    }
}
