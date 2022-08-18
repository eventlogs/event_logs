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

    public addEdges(edges: Edge[]): void {
        edges.forEach(edge => this.edges.push(edge));
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
        let maxDiff = Number.MIN_VALUE;

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

    public getMaxVerticesOnLayer(): number {
        let max: number = 0;

        for (let layer = 1; layer <= this.getMaxLayer(); layer++)
            max = Math.max(max, this.getVerticesByLayer(layer).length);

        return max;
    }

    public getMaxLayer(): number {
        let maxLayer: number = 0;

        this.vertices.forEach(
            vertex => (maxLayer = Math.max(maxLayer, vertex.layer))
        );

        return maxLayer;
    }

    public getVerticesByLayer(layer: number): Vertex[] {
        return this.vertices.filter(vertex => vertex.layer === layer);
    }

    public getVerticesSortedByPosition(layer: number): Vertex[] {
        return this.getVerticesByLayer(layer).sort((v1, v2) => {
            if (v1.position > v2.position) return 1;
            if (v1.position < v2.position || Math.random() < 0.5) return -1;
            else return 0;
        });
    }

    public getMaxActivityCountVertex(): number {
        let max = 0;

        this.vertices.forEach(vertex => {
            max = Math.max(vertex.activityCount, max);
        });

        return max;
    }

    public getMaxPosition(): number {
        let maxPosition = Number.MIN_VALUE;
        this.vertices.forEach(
            vertex => (maxPosition = Math.max(vertex.position, maxPosition))
        );
        return maxPosition;
    }

    public getMinPosition(): number {
        let minPosition = Number.MAX_VALUE;
        this.vertices.forEach(
            vertex => (minPosition = Math.min(vertex.position, minPosition))
        );
        return minPosition;
    }

    public getEdgesByStartVertex(vertex: Vertex): Edge[] {
        let edges: Edge[] = this.edges.filter(
            edge => edge.startVertex === vertex
        );
        return edges;
    }

    public getEdgesByEndVertex(vertex: Vertex): Edge[] {
        let edges: Edge[] = this.edges.filter(
            edge => edge.endVertex === vertex
        );
        return edges;
    }
}
