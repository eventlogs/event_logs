import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { SvgService } from './svg.service';

@Injectable({
    providedIn: 'root',
})
//Layout mittels Sugiyama Algorithmus
export class LayoutService {
    public layout(graph: Graph): void {
        this.makeGraphAcyclic(graph);
        this.setLayers(graph);
        this.createDummyVertices(graph);

        this.minimizeCrossings(graph);

        //this.setPosition(graph);
        this.correctEdgeDirection(graph.edges);
    }

    constructor(private _svgService: SvgService) {}

    private minimizeCrossings(graph: Graph): void {
        let maxLayer: number = this.getMaxLayer(graph.vertices);
        let maxVerticesOnLayer: number = this.getMaxVerticesOnLayer(
            graph.vertices,
            maxLayer
        );
        let maxSize: number =
            2 * maxVerticesOnLayer * this._svgService.rectWidth;

        let graphClone: Graph = Object.assign(
            new Graph(new Array<Vertex>(), new Array<Edge>()),
            graph
        );

        //Zufällige Permutation für die erste Ebene
        this.permutateFirstLayerPositions(graphClone.vertices);
        //Betrachte iterative die zwei aufeinanderfolgenden Ebenen
        for (let i = 1; i < maxLayer; i++)
            this.setNextLayerPositions(graphClone, i, i + 1);
        console.log(graphClone);
        //minimize crossings by permuting next layer, while keeping previous fixed
        //repeat steps 2 and 3 in reverse order starting with last layer
        //repeat steps 2 too 4 till no improvement
        //repeast seteps 1 too 5 with different starting permutation
    }

    private getMaxLayer(vertices: Vertex[]): number {
        let maxLayer: number = 0;

        vertices.forEach(
            vertex => (maxLayer = Math.max(maxLayer, vertex.layer))
        );

        return maxLayer;
    }

    private getMaxVerticesOnLayer(
        vertices: Vertex[],
        maxLayer: number
    ): number {
        let verticesOnLayer: number[] = new Array<number>(maxLayer);
        let maxVerticesOnLayer = 0;

        verticesOnLayer.forEach(n => (n = 0));
        vertices.forEach(
            vertex =>
                (maxVerticesOnLayer = Math.max(
                    maxVerticesOnLayer,
                    ++verticesOnLayer[vertex.layer - 1]
                ))
        );

        return maxVerticesOnLayer;
    }

    private permutateFirstLayerPositions(vertices: Vertex[]): void {
        let firstLayerVertices: Vertex[] = vertices.filter(
            vertex => vertex.layer == 1
        );

        for (let i = 0; i < firstLayerVertices.length; i++)
            firstLayerVertices[i].position = i + 1;

        for (let i = 0; i < firstLayerVertices.length; i++) {
            let n: number = Math.floor(
                Math.random() * firstLayerVertices.length
            );
            let tmp: number = firstLayerVertices[i].position;
            firstLayerVertices[i].position = firstLayerVertices[n].position;
            firstLayerVertices[n].position = tmp;
        }
    }

    private setNextLayerPositions(
        graph: Graph,
        layer: number,
        nextLayer: number
    ): void {
        let vertices: Vertex[] = graph.vertices.filter(
            vertex => vertex.layer == layer
        );
        let nextVertices: Vertex[] = graph.vertices.filter(
            vertex => vertex.layer == nextLayer
        );

        nextVertices.forEach(nextVertex => {
            let edges: Edge[] = graph.edges.filter(
                edge => edge.endVertex === nextVertex
            );
            let neighbours: Vertex[] = vertices.filter(
                vertex =>
                    edges.find(edge => edge.startVertex === vertex) != undefined
            );
            let value: number = 0;
            neighbours.forEach(neighbour => (value += neighbour.position));
            nextVertex.position = value / neighbours.length;
        });
    }

    private makeGraphAcyclic(graph: Graph): void {
        let edges: Edge[] = [];
        graph.edges.forEach(edge => edges.push(edge));

        let vertices: Vertex[] = [];
        graph.vertices.forEach(vertex => vertices.push(vertex));

        let newGraph: Graph = new Graph(vertices, edges);

        while (vertices.length != 0) {
            let sinks: Vertex[] = newGraph.getSinks();

            while (sinks.length != 0) {
                sinks.forEach(vertex => {
                    let incomingEdges = vertex.getIncomingEdges(edges);

                    newGraph.removeVertex(vertex);
                    newGraph.removeEdges(incomingEdges);

                    sinks = newGraph.getSinks();
                });
            }

            let isolatedVertices: Vertex[] = newGraph.getIsolatedVertices();
            newGraph.removeVertices(isolatedVertices);

            let sources: Vertex[] = newGraph.getSources();

            while (sources.length != 0) {
                sources.forEach(vertex => {
                    let outgoingEdges = vertex.getOutgoingEdges(edges);

                    newGraph.removeVertex(vertex);
                    newGraph.removeEdges(outgoingEdges);

                    sources = newGraph.getSinks();
                });
            }

            if (vertices.length != 0) {
                let vertex = newGraph.getMaxEdgeDifferenceVertex();

                let outgoingEdges = vertex.getOutgoingEdges(edges);
                let incomingEdges = vertex.getIncomingEdges(edges);

                newGraph.removeVertex(vertex);
                newGraph.removeEdges(outgoingEdges);
                newGraph.removeEdges(incomingEdges);
                incomingEdges.forEach(edge => edge.reverse());
            }
        }
    }

    private setLayers(graph: Graph): void {
        let sinks: Vertex[] = graph.getSinks();

        sinks.forEach(vertex => {
            this.calculateLayer(vertex, graph);
        });
    }

    private calculateLayer(vertex: Vertex, graph: Graph): number {
        let incomingEdges = vertex.getIncomingEdges(graph.edges);

        let layer: number = 1;

        incomingEdges.forEach(edge => {
            layer = Math.max(
                layer,
                this.calculateLayer(edge.startVertex, graph) + 1
            );
        });

        return (vertex.layer = layer);
    }

    private createDummyVertices(graph: Graph): void {
        graph.edges.forEach(edge => {
            let layerDiff: number = Math.abs(
                edge.startVertex.layer - edge.endVertex.layer
            );

            //Lege Dummyknoten an, wenn zwischen ihnen Ebenen liegen.
            if (layerDiff > 1) {
                let newVertices: Vertex[] = new Array<Vertex>(layerDiff - 1);
                //Erstelle für jede Ebene einen Knoten
                for (let i = 1; i < layerDiff; i++) {
                    let vertexName: String =
                        edge.startVertex.activityName.toString() +
                        ' To ' +
                        edge.endVertex.activityName.toString() +
                        ' ' +
                        i.toString();
                    let vertex: Vertex = new Vertex(vertexName);
                    vertex.layer =
                        Math.min(edge.startVertex.layer, edge.endVertex.layer) +
                        i;
                    graph.vertices.push(vertex);
                    newVertices[i - 1] = vertex;
                }

                //Kante zu ursprünglichen Startknoten
                let newEdge: Edge = new Edge(
                    edge.startVertex,
                    newVertices[0],
                    edge.activityCount,
                    edge.isReversed
                );
                graph.edges.push(newEdge);

                //Kanten zwischen Dummyknoten
                for (let i = 0; i < layerDiff - 2; i++) {
                    newEdge = new Edge(
                        newVertices[i],
                        newVertices[i + 1],
                        edge.activityCount,
                        edge.isReversed
                    );
                    graph.edges.push(newEdge);
                }

                //Kante zu ursprünglichen Endknoten
                newEdge = new Edge(
                    newVertices[layerDiff - 2],
                    edge.endVertex,
                    edge.activityCount,
                    edge.isReversed
                );
                graph.edges.push(newEdge);

                graph.removeEdge(edge);
            }
        });
    }

    private setPosition(graph: Graph): void {
        let sinks: Vertex[] = graph.getSinks();

        let max: number = 0;

        sinks.forEach(vertex => {
            max = Math.max(max, vertex.layer);
        });

        let positions: number[] = new Array<number>(max);

        for (let i = 0; i < max; i++) positions[i] = 1;

        graph.vertices.forEach(
            vertex => (vertex.position = positions[vertex.layer - 1]++)
        );
    }

    private correctEdgeDirection(edges: Edge[]): void {
        edges.forEach(edge => {
            if (edge.isReversed) edge.reverse();
        });
    }
}
