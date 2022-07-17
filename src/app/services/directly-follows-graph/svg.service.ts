import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { pathToFileURL } from 'url';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private _rectWidth: number = 150;
    private _rectHeight: number = 40;
    private _positionOffset: number = this._rectWidth * 1.5;
    private _layerOffset: number = this._rectHeight * 2.5;
    private maxActivityCount = 0;

    public get rectWidth(): number {
        return this._rectWidth;
    }

    public get rectHeight(): number {
        return this._rectHeight;
    }

    public get positionOffset(): number {
        return this._positionOffset;
    }

    public get layerOffset(): number {
        return this._layerOffset;
    }

    public createSvgElements(graph: Graph): SVGElement[] {
        let result: SVGElement[] = [];

        this.setMaxActivityCount(graph);

        graph.vertices.forEach(vertex => {
            let container = this.createContainer(vertex);

            if (!vertex.isDummy) {
                let text = this.createTextForGraph(vertex);
                let box = this.createRect(vertex);
                //Mache Box und Text zu Kindern, damit sie gemeinsam manipuliert werden können.
                container.append(box);
                container.append(text);
            }

            vertex.svgElement = container;
            result.push(container);
        });

        //Pfeilspitze für Kanten erstellen
        let arrow = this.createArrow();
        result.push(arrow);

        graph.edges.forEach(edge => {
            let path = this.createPath(edge, graph);
            if (!edge.endVertex.isDummy) {
                let text = this.createTextForEdge(edge);
                result.push(text);
            }
            result.push(path);
        });

        return result;
    }

    private setMaxActivityCount(graph: Graph) {
        this.maxActivityCount = 0;
        graph.vertices.forEach(vertex => {
            this.maxActivityCount = Math.max(
                vertex.activityCount,
                this.maxActivityCount
            );
        });
    }

    private createContainer(vertex: Vertex): SVGElement {
        let svg = this.createSvgElement('svg');

        //Setze Abstand zwischen den Positionen
        let x = 50 + vertex.position;
        svg.setAttribute('x', x.toString());
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
            0.1 + 0.8 * (vertex.activityCount / this.maxActivityCount);
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

    private createPath(edge: Edge, graph: Graph): SVGElement {
        let path = this.createSvgElement('path');

        let id =
            'path' +
            edge.startVertex.activityName +
            edge.endVertex.activityName;
        path.setAttribute('id', id);
        path.setAttribute('d', this.setCoordinates(edge, graph));
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        if (!edge.endVertex.isDummy)
            path.setAttribute('marker-end', 'url(#marker)');

        edge.svgElement = path;

        return path;
    }

    private setCoordinates(edge: Edge, graph: Graph) {
        let startX: number = 0;
        let startY: number = 0;
        let endX: number = 0;
        let endY: number = 0;
        let startXOffset: number = 0;
        let endXOffset: number = 0;
        let startYOffset: number = 0;
        let endYOffset: number = 0;

        //Setze Koordinaten basierend auf den Ebenen
        //Kante verläuft von oben nach unten
        if (edge.startVertex.layer < edge.endVertex.layer) {
            let upperLayerEdges = edge.startVertex.getUpperLayerEdges(
                graph.edges
            );
            startXOffset =
                edge.startVertex.calculateEdgePosition(edge, upperLayerEdges) /
                (upperLayerEdges.length + 1);
            startXOffset *= this.rectWidth;

            let lowerLayerEdges = edge.endVertex.getLowerLayerEdges(
                graph.edges
            );
            endXOffset =
                edge.endVertex.calculateEdgePosition(edge, lowerLayerEdges) /
                (lowerLayerEdges.length + 1);
            endXOffset *= this.rectWidth;

            startYOffset = this.rectHeight;
            //Kante verläuft von unten nach oben
        } else if (edge.startVertex.layer > edge.endVertex.layer) {
            let lowerLayerEdges = edge.startVertex.getLowerLayerEdges(
                graph.edges
            );
            startXOffset =
                edge.startVertex.calculateEdgePosition(edge, lowerLayerEdges) /
                (lowerLayerEdges.length + 1);
            startXOffset *= this.rectWidth;

            let upperLayerEdges = edge.endVertex.getUpperLayerEdges(
                graph.edges
            );
            endXOffset =
                edge.endVertex.calculateEdgePosition(edge, upperLayerEdges) /
                (upperLayerEdges.length + 1);
            endXOffset *= this.rectWidth;

            endYOffset = this.rectHeight;
            //Start- und Endknoten der Kante sind gleich
        } else {
            startXOffset = this._rectWidth;
            endXOffset = this.rectWidth;
            startYOffset = this._rectHeight * 0.75;
            endYOffset = this.rectHeight * 0.25;
        }

        startX = edge.startVertex.getSvgElementXValue() + startXOffset;
        endX = edge.endVertex.getSvgElementXValue() + endXOffset;
        startY = edge.startVertex.getSvgElementYValue() + startYOffset;
        endY = edge.endVertex.getSvgElementYValue() + endYOffset;

        //Setze Pfadpunkte von Dummyknoten in die Mitte der Knoten
        if (edge.startVertex.isDummy) {
            startX -= this._rectWidth / 2;

            if (edge.startVertex.layer < edge.endVertex.layer)
                startY -= this.rectHeight / 2;

            if (edge.startVertex.layer > edge.endVertex.layer)
                startY += this.rectHeight / 2;
        }

        if (edge.endVertex.isDummy) {
            endX -= this._rectWidth / 2;

            if (edge.startVertex.layer < edge.endVertex.layer)
                endY += this.rectHeight / 2;

            if (edge.startVertex.layer > edge.endVertex.layer)
                endY -= this.rectHeight / 2;
        }

        let coordinates = 'M ' + startX + ' ' + startY;

        if (edge.isTargetingSelf())
            coordinates +=
                ' Q ' +
                (startX + 25) +
                ' ' +
                (startY + endY) / 2 +
                ' ' +
                endX +
                ' ' +
                endY;
        else coordinates += ' L ' + endX + ' ' + endY;

        return coordinates;
    }

    private createTextForEdge(edge: Edge): SVGElement {
        let text = this.createSvgElement('text');

        let d = edge.svgElement?.getAttribute('d')?.split(' ');
        if (d != undefined) {
            let startX: number = +d[1];
            let endX: number = +d[d.length - 2];
            let x = (startX + endX + 25) / 2;
            text.setAttribute('x', x.toString());

            let startY: number = +d[2];
            let endY: number = +d[d.length - 1];
            let y = (startY + endY + 25) / 2;
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
