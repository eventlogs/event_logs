import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { pathToFileURL } from 'url';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private rectWidth: number = 150;
    private rectHeight: number = 40;
    private layerOffset: number = this.rectHeight * 2.5;
    private activityCount = 0;

    public createSvgElements(graph: Graph): SVGElement[] {
        let result: SVGElement[] = [];

        this.setMaxActivityCount(graph);

        graph.vertices.forEach(vertex => {
            let container = this.createContainer(vertex);
            let text = this.createTextForGraph(vertex);
            let box = this.createRect(vertex);
            //Mache Box und Text zu Kindern, damit sie gemeinsam manipuliert werden können.
            container.append(box);
            container.append(text);
            vertex.svgElement = container;
            result.push(container);
        });

        //Pfeilspitze für Kanten erstellen
        let arrow = this.createArrow();
        result.push(arrow);

        graph.edges.forEach(edge => {
            let path = this.createPath(edge, graph.edges);
            let text = this.createTextForEdge(edge);
            result.push(text);
            result.push(path);
        });

        return result;
    }

    private setMaxActivityCount(graph: Graph) {
        this.activityCount = 0;
        graph.vertices.forEach(vertex => {
            this.activityCount = Math.max(
                vertex.activityCount,
                this.activityCount
            );
        });
    }

    private createContainer(vertex: Vertex): SVGElement {
        let svg = this.createSvgElement('svg');

        svg.setAttribute('x', vertex.position.toString());
        //Setze Abstand zwischen den Ebenen
        let y = 50 + this.layerOffset * (vertex.layer - 1);
        svg.setAttribute('y', y.toString());
        svg.setAttribute('width', this.rectWidth.toString());
        svg.setAttribute('height', this.rectHeight.toString());

        vertex.svgElement = svg;

        return svg;
    }

    private createRect(vertex: Vertex): SVGElement {
        let rect = this.createSvgElement('rect');

        rect.setAttribute('rx', '15');
        rect.setAttribute('ry', '15');
        rect.setAttribute('width', this.rectWidth.toString());
        rect.setAttribute('height', this.rectHeight.toString());
        rect.setAttribute('fill', 'rgb(150, 150, 150)');
        //Setze höhere Füllstärke, für häufiger vorkommende Knoten
        let fillOpacity =
            0.1 + 0.8 * (vertex.activityCount / this.activityCount);
        rect.setAttribute('fill-opacity', fillOpacity.toString());
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('stroke', 'black');

        return rect;
    }

    private createTextForGraph(vertex: Vertex): SVGElement {
        let text = this.createSvgElement('text');

        text.setAttribute('x', `50%`);
        text.setAttribute('y', `50%`);
        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font', 'bold 30px sans-serif');
        text.appendChild(
            this.createTspanForText(vertex.activityName.toString(), -0.2)
        );
        text.appendChild(
            this.createTspanForText(vertex.activityCount.toString(), 0.5)
        );

        return text;
    }

    private createTspanForText(text: string, offset: number): SVGElement {
        let tspan = this.createSvgElement('tspan');

        tspan.setAttribute('x', (this.rectWidth / 2).toString());
        tspan.setAttribute('dy', (this.rectHeight * offset).toString());
        tspan.setAttribute('width', `100%`);
        tspan.setAttribute('height', `100%`);
        tspan.setAttribute('text-anchor', `middle`);
        tspan.setAttribute('dominant-baseline', `middle`);

        tspan.textContent = text;

        return tspan;
    }

    private createArrow(): SVGElement {
        let defs = this.createSvgElement('defs');
        defs.append(this.createMarker());

        return defs;
    }

    private createMarker(): SVGElement {
        let marker = this.createSvgElement('marker');

        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('id', 'marker');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('orient', 'auto');

        let path = this.createSvgElement('path');
        path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        path.setAttribute('fill', 'context-stroke');

        marker.append(path);

        return marker;
    }

    private createPath(edge: Edge, edges: Edge[]): SVGElement {
        let path = this.createSvgElement('path');

        let id =
            'path' +
            edge.startVertex.activityName +
            edge.endVertex.activityName;
        path.setAttribute('id', id);
        path.setAttribute('d', this.setCoordinates(edge, edges));
        path.setAttribute('marker-end', 'url(#marker)');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');

        edge.svgElement = path;

        return path;
    }

    private setCoordinates(edge: Edge, edges: Edge[]) {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let startXOffset = 0;
        let endXOffset = 0;
        let startYOffset = 0;
        let endYOffset = 0;

        //Setze Koordinaten basierend auf den Ebenen
        if (edge.startVertex.layer < edge.endVertex.layer) {
            let upperLayerEdges = edge.startVertex.getUpperLayerEdges(edges);
            startXOffset =
                edge.startVertex.calculateEdgePosition(edge, upperLayerEdges) /
                (upperLayerEdges.length + 1);
            startXOffset *= this.rectWidth;

            let lowerLayerEdges = edge.endVertex.getLowerLayerEdges(edges);
            endXOffset =
                edge.endVertex.calculateEdgePosition(edge, lowerLayerEdges) /
                (lowerLayerEdges.length + 1);
            endXOffset *= this.rectWidth;

            startYOffset = this.rectHeight;
        } else {
            let lowerLayerEdges = edge.startVertex.getLowerLayerEdges(edges);
            startXOffset =
                edge.startVertex.calculateEdgePosition(edge, lowerLayerEdges) /
                (lowerLayerEdges.length + 1);
            startXOffset *= this.rectWidth;

            let upperLayerEdges = edge.endVertex.getUpperLayerEdges(edges);
            endXOffset =
                edge.endVertex.calculateEdgePosition(edge, upperLayerEdges) /
                (upperLayerEdges.length + 1);
            endXOffset *= this.rectWidth;

            endYOffset = this.rectHeight;
        }

        startX = edge.startVertex.getSvgElementXValue() + startXOffset;
        endX = edge.endVertex.getSvgElementXValue() + endXOffset;
        startY = edge.startVertex.getSvgElementYValue() + startYOffset;
        endY = edge.endVertex.getSvgElementYValue() + endYOffset;

        let coordinates =
            'M ' + startX + ' ' + startY + ' L ' + endX + ' ' + endY;

        return coordinates;
    }

    private createTextForEdge(edge: Edge): SVGElement {
        let text = this.createSvgElement('text');

        let d = edge.svgElement?.getAttribute('d')?.split(' ');
        if (d != undefined) {
            let startX: number = +d[1];
            let endX: number = +d[d.length - 2];
            let x = (startX + endX + 20) / 2;
            text.setAttribute('x', x.toString());

            let startY: number = +d[2];
            let endY: number = +d[d.length - 1];
            let y = (startY + endY + 20) / 2;
            text.setAttribute('y', y.toString());
        }

        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font', 'bold 30px sans-serif');
        text.textContent = edge.activityCount.toString();

        return text;
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
