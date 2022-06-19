import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';

@Injectable({
    providedIn: 'root',
})
//Layout mittels Sugiyama Algorithmus
export class LayoutService {
    public layout(graph: Graph): void {
        this.makeGraphAcyclic(graph);
        this.setLayers(graph);

        this.setPosition(graph);
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
                if (vertex != undefined) {
                    let outgoingEdges = vertex.getOutgoingEdges(edges);
                    let incomingEdges = vertex.getIncomingEdges(edges);

                    newGraph.removeVertex(vertex);
                    newGraph.removeEdges(outgoingEdges);
                    newGraph.removeEdges(incomingEdges);
                    incomingEdges.forEach(edge => edge.reverse());
                }
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
            layer =
                Math.max(layer, this.calculateLayer(edge.startVertex, graph)) +
                1;
        });

        return (vertex.layer = layer);
    }
}
