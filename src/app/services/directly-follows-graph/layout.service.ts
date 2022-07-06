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
    private _graphWidth: number = 0;
    private _graphHeight: number = 0;

    public get graphWidth(): number {
        return this._graphWidth;
    }

    public get graphHeight(): number {
        return this._graphHeight;
    }

    public layout(graph: Graph): void {
        this.makeGraphAcyclic(graph);
        this.setLayers(graph);
        this.createDummyVertices(graph);

        this.minimizeCrossings(graph);

        this.correctEdgeDirection(graph.edges);
    }

    constructor(private _svgService: SvgService) {}

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

    private createDummyVertices(graph: Graph): Edge[] {
        let oldEdges: Edge[] = [];

        graph.edges.forEach(edge => {
            let layerDiff: number = Math.abs(
                edge.startVertex.layer - edge.endVertex.layer
            );

            //Lege Dummyknoten an, wenn zwischen ihnen Ebenen liegen.
            if (layerDiff > 1) {
                let newVertices: Vertex[] = new Array<Vertex>(layerDiff - 1);
                //Erstelle für jede Ebene einen Knoten
                for (let i = 1; i < layerDiff; i++) {
                    let vertexName: String;
                    if (edge.isReversed)
                        vertexName =
                            edge.endVertex.activityName.toString() +
                            ' To ' +
                            edge.startVertex.activityName.toString() +
                            ' ' +
                            i.toString();
                    else
                        vertexName =
                            edge.startVertex.activityName.toString() +
                            ' To ' +
                            edge.endVertex.activityName.toString() +
                            ' ' +
                            i.toString();

                    let vertex: Vertex = new Vertex(vertexName, 0, true);
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

                //graph.removeEdge(edge);
                oldEdges.push(edge);
            }
        });

        graph.removeEdges(oldEdges);

        return oldEdges;
    }

    private minimizeCrossings(graph: Graph): void {
        let maxLayer: number = this.getMaxLayer(graph.vertices);
        this.calcGraphWidth(graph.vertices, maxLayer);
        this.calcGraphHeight(maxLayer);

        let differentStartingPermutation: number = 0;
        let crossings: number = Number.MAX_VALUE;
        let improved: boolean = false;

        //Teste zufällige Permutation für die erste Ebene
        do {
            differentStartingPermutation++;

            let graphClone: Graph = Object.assign(
                new Graph(new Array<Vertex>(), new Array<Edge>()),
                graph
            );
            let crossingsClone: number = Number.MAX_VALUE;

            this.permutateFirstLayerPositions(graphClone.vertices);

            //Permutiere die Ebenen solange Verbesserungen erzielt werden
            do {
                improved = false;

                let graphCloneNew: Graph = Object.assign(
                    new Graph(new Array<Vertex>(), new Array<Edge>()),
                    graphClone
                );

                //Betrachte iterativ die zwei aufeinanderfolgenden Ebenen von unten nach oben
                for (let i = 1; i < maxLayer; i++) {
                    this.setNextLayerPositions(graphCloneNew, i, i + 1);
                    this.setPositionOffset(graphCloneNew, i + 1);
                }
                //Betrachte iterativ die zwei aufeinanderfolgenden Ebenen von oben nach unten
                for (let i = maxLayer; i > 1; i--) {
                    this.setNextLayerPositions(graphCloneNew, i, i - 1);
                    this.setPositionOffset(graphCloneNew, i - 1);
                }

                let crossingsCloneNew = this.countCrossings(
                    graphCloneNew,
                    maxLayer
                );

                if (crossingsCloneNew < crossingsClone) {
                    crossingsClone = crossingsCloneNew;
                    graphClone = graphCloneNew;
                    improved = true;
                }
            } while (crossingsClone != 0 && improved);

            if (crossingsClone < crossings) {
                graph = graphClone;
                crossings = crossingsClone;
            }
        } while (crossings != 0 && differentStartingPermutation < 23);
    }

    private getMaxLayer(vertices: Vertex[]): number {
        let maxLayer: number = 0;

        vertices.forEach(
            vertex => (maxLayer = Math.max(maxLayer, vertex.layer))
        );

        return maxLayer;
    }

    private calcGraphWidth(vertices: Vertex[], maxLayer: number): void {
        for (let i = 1; i <= maxLayer; i++) {
            let layerVertices: Vertex[] = vertices.filter(
                vertex => vertex.layer === i
            );
            let size: number = 0;
            layerVertices.forEach(vertex => {
                if (!vertex.isDummy) size += this._svgService.positionOffset;
                else
                    size +=
                        this._svgService.positionOffset -
                        this._svgService.rectWidth;

                this._graphWidth = Math.max(this._graphWidth, size);
            });
        }
    }

    private calcGraphHeight(maxLayer: number): void {
        this._graphHeight =
            maxLayer * this._svgService.layerOffset +
            this._svgService.rectHeight;
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
            let edges: Edge[];
            let neighbours: Vertex[];

            if (layer < nextLayer) {
                edges = graph.edges.filter(
                    edge => edge.endVertex === nextVertex
                );

                neighbours = vertices.filter(
                    vertex =>
                        edges.find(edge => edge.startVertex === vertex) !=
                        undefined
                );
            } else {
                edges = graph.edges.filter(
                    edge => edge.startVertex === nextVertex
                );

                neighbours = vertices.filter(
                    vertex =>
                        edges.find(edge => edge.endVertex === vertex) !=
                        undefined
                );
            }

            if (neighbours.length > 0) {
                let value: number = 0;
                neighbours.forEach(neighbour => (value += neighbour.position));
                nextVertex.position = value / neighbours.length;
            }
        });
    }

    private setPositionOffset(graph: Graph, layer: number): void {
        let vertices: Vertex[] = graph.vertices.filter(
            vertex => vertex.layer === layer
        );

        let sortedVertices: Vertex[] = vertices.sort((v1, v2) => {
            if (v1.position > v2.position) return 1;
            if (v1.position < v2.position || Math.random() < 0.5) return -1;
            else return 0;
        });

        //Kleinerer Abstand für Dummyknoten
        let positionOffsetDummy: number =
            this._svgService.positionOffset - this._svgService.rectWidth;

        //Setze Position der Knoten, dass genügend Abstand zwischen ihnen besteht
        for (let i = 1; i < sortedVertices.length; i++) {
            if (!sortedVertices[i - 1].isDummy)
                sortedVertices[i].position = Math.max(
                    sortedVertices[i].position,
                    sortedVertices[i - 1].position +
                        this._svgService.positionOffset
                );
            else
                sortedVertices[i].position = Math.max(
                    sortedVertices[i].position,
                    sortedVertices[i - 1].position + positionOffsetDummy
                );
        }

        //Setze Position der Knoten, dass sie nicht über die maximale Größe hinausgehen
        if (
            sortedVertices[sortedVertices.length - 1].position >
            this._graphWidth
        ) {
            sortedVertices[sortedVertices.length - 1].position =
                this._graphWidth;
            for (let i = sortedVertices.length - 2; i >= 0; i--) {
                if (!sortedVertices[i].isDummy)
                    sortedVertices[i].position = Math.min(
                        sortedVertices[i].position,
                        sortedVertices[i + 1].position -
                            this._svgService.positionOffset
                    );
                else
                    sortedVertices[i].position = Math.min(
                        sortedVertices[i].position,
                        sortedVertices[i + 1].position - positionOffsetDummy
                    );
            }
        }
    }

    private countCrossings(graph: Graph, maxLayer: number): number {
        let count = 0;
        for (let i = 1; i < maxLayer; i++) {
            let edges: Edge[] = graph.edges.filter(
                edge => edge.startVertex.layer === i
            );

            edges.forEach(edge =>
                edges.forEach(e => {
                    if (
                        (e.startVertex.position < edge.startVertex.position &&
                            e.endVertex.position > edge.endVertex.position) ||
                        (e.startVertex.position > edge.startVertex.position &&
                            e.endVertex.position < edge.endVertex.position)
                    )
                        count++;
                })
            );
        }
        return count;
    }

    private correctEdgeDirection(edges: Edge[]): void {
        edges.forEach(edge => {
            if (edge.isReversed) edge.reverse();
        });
    }
}
