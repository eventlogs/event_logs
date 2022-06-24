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

    public removeVertex(vertex: Vertex): void {
        let index = this._vertices.findIndex(v => v === vertex);
        if (index > -1) this._vertices.splice(index, 1);
    }

    public removeVertices(vertices: Vertex[]): void {
        vertices.forEach(vertex => this.removeVertex(vertex));
    }

    public removeEdge(edge: Edge): void {
        let index = this._edges.findIndex(e => e === edge);
        if (index > -1) this._edges.splice(index, 1);
    }

    public removeEdges(edges: Edge[]): void {
        edges.forEach(edge => this.removeEdge(edge));
    }

    public getSinks(): Vertex[] {
        let vertices: Vertex[] = [];

        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length == 0 && incomingEdges.length != 0)
                vertices.push(vertex);
        });

        return vertices;
    }

    public getIsolatedVertices(): Vertex[] {
        let vertices: Vertex[] = [];

        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length == 0 && incomingEdges.length == 0)
                vertices.push(vertex);
        });

        return vertices;
    }

    public getSources(): Vertex[] {
        let vertices: Vertex[] = [];

        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length != 0 && incomingEdges.length == 0)
                vertices.push(vertex);
        });

        return vertices;
    }

    //Gibt den Knoten zurück, der den maximalen Wert bezüglich ausgehender Kanten minus eingehender Kanten besitzt.
    public getMaxEdgeDifferenceVertex(): Vertex {
        let maxVertex: Vertex = this._vertices[0];

        let maxOutgoingEdges = maxVertex.getOutgoingEdges(this._edges);
        let maxIncomingEdges = maxVertex.getIncomingEdges(this._edges);
        let maxDiff = maxOutgoingEdges.length - maxIncomingEdges.length;

        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            let diff = outgoingEdges.length - incomingEdges.length;

            if (diff > maxDiff) {
                maxVertex = vertex;
                maxDiff = diff;
            }
        });

        return maxVertex;
    }
}
