import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { DirectlyFollowsGraphService } from './display.service';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private _rectWidth: number = 150;
    private _rectHeight: number = 40;
    private _offsetXValue: number = this._rectWidth * 1.5;
    private _offsetYValue: number = this._rectHeight * 2.5;
    private minValue: number = 50;
    private maxValue: number = Number.MAX_VALUE;
    private maxActivityCount: number = 0;
    private _svgElements: SVGElement[] = [];

    public get rectWidth(): number {
        return this._rectWidth;
    }

    public get rectHeight(): number {
        return this._rectHeight;
    }

    public get offsetXValue(): number {
        return this._offsetXValue;
    }

    public get offsetYValue(): number {
        return this._offsetYValue;
    }

    public get svgElements(): SVGElement[] {
        return this._svgElements;
    }

    constructor(private _displayService: DirectlyFollowsGraphService) {}

    public createSvgElements(graph: Graph): SVGElement[] {
        this._svgElements = [];

        this.setMaxActivityCount(graph);

        graph.vertices.forEach(vertex => {
            let container = this.createContainer(vertex);

            if (!vertex.isDummy) {
                let text = this.createTextForGraph(vertex);
                let box = this.createRect(vertex);
                //Mache Box und Text zu Kindern, damit sie gemeinsam manipuliert werden können.
                container.append(box);
                container.append(text);
            } else {
                let path = this.createPathForDummyVertex(vertex);
                container.append(path);
            }

            vertex.registerSvgElement(container, () =>
                this.updateLayer(vertex, graph)
            );
            this._svgElements.push(container);
        });

        //Pfeilspitze für Kanten erstellen
        let arrow = this.createArrow();
        this._svgElements.push(arrow);

        graph.edges.forEach(edge => {
            let path = this.createPath(edge, graph);
            if (!edge.endVertex.isDummy) {
                let text = this.createTextForEdge(edge);
                this._svgElements.push(text);
            }
            this._svgElements.push(path);
        });

        return this._svgElements;
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

        let x: number = this.minValue;
        let y: number = this.minValue;

        //Setze Abstand zwischen Positionen und Ebenen basierend auf der Ausrichtung
        if (this._displayService.verticalDirection) {
            x += this.offsetXValue * (vertex.position - 1);
            y += this.offsetYValue * (vertex.layer - 1);
        } else {
            x += this.offsetXValue * (vertex.layer - 1);
            y += this.offsetYValue * (vertex.position - 1);
        }

        svg.setAttribute('name', vertex.activityName.toString());
        svg.setAttribute('x', x.toString());
        svg.setAttribute('y', y.toString());
        svg.setAttribute('width', this.rectWidth.toString());
        svg.setAttribute('height', this.rectHeight.toString());

        //vertex.svgElement = svg;

        return svg;
    }

    private createPathForDummyVertex(vertex: Vertex): SVGElement {
        let path = this.createSvgElement('path');

        let startX: number = 0;
        let startY: number = 0;
        let endX: number = 0;
        let endY: number = 0;

        if (this._displayService.verticalDirection) {
            startX += this.rectWidth / 2;
            endX += this.rectWidth / 2;
            endY += this.rectHeight;
        } else {
            startY += this.rectHeight / 2;
            endX += this.rectWidth;
            endY += this.rectHeight / 2;
        }

        let coordinates =
            'M ' + startX + ' ' + startY + ' L ' + endX + ' ' + endY;

        path.setAttribute('d', coordinates);
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        path.setAttribute('pointer-events', 'none');

        return path;
    }

    private createRect(vertex: Vertex): SVGElement {
        let rect = this.createSvgElement('rect');

        rect.setAttribute('name', vertex.activityName.toString());
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
        text.setAttribute('pointer-events', 'none');

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
        tspan.setAttribute('pointer-events', 'none');

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
        path.setAttribute('pointer-events', 'none');

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
        path.setAttribute('d', this.setPathCoordinates(edge, graph));
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        if (!edge.endVertex.isDummy)
            path.setAttribute('marker-end', 'url(#marker)');
        path.setAttribute('pointer-events', 'none');

        edge.pathSvgElement = path;

        return path;
    }

    private setPathCoordinates(edge: Edge, graph: Graph) {
        let startX: number = 0;
        let startY: number = 0;
        let endX: number = 0;
        let endY: number = 0;
        let startXOffset: number = 0;
        let endXOffset: number = 0;
        let startYOffset: number = 0;
        let endYOffset: number = 0;

        //Setze Koordinaten basierend auf Ausrichtung und den Ebenen
        //Kante verläuft von niedriger Ebene zu hoher Ebene
        if (edge.startVertex.layer < edge.endVertex.layer) {
            let upperLayerEdges = edge.startVertex.getUpperLayerEdges(
                graph.edges
            );

            let lowerLayerEdges = edge.endVertex.getLowerLayerEdges(
                graph.edges
            );

            if (this._displayService.verticalDirection) {
                startXOffset =
                    edge.startVertex.calculateEdgePosition(
                        edge,
                        upperLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (upperLayerEdges.length + 1);
                startXOffset *= this.rectWidth;

                startYOffset = this.rectHeight;

                endXOffset =
                    edge.endVertex.calculateEdgePosition(
                        edge,
                        lowerLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (lowerLayerEdges.length + 1);
                endXOffset *= this.rectWidth;
            } else {
                startXOffset = this.rectWidth;

                startYOffset =
                    edge.startVertex.calculateEdgePosition(
                        edge,
                        upperLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (upperLayerEdges.length + 1);
                startYOffset *= this.rectHeight;

                endYOffset =
                    edge.endVertex.calculateEdgePosition(
                        edge,
                        lowerLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (lowerLayerEdges.length + 1);
                endYOffset *= this.rectHeight;
            }
            //Kante verläuft von hoher Ebene zu niedriger Ebene
        } else if (edge.startVertex.layer > edge.endVertex.layer) {
            let lowerLayerEdges = edge.startVertex.getLowerLayerEdges(
                graph.edges
            );

            let upperLayerEdges = edge.endVertex.getUpperLayerEdges(
                graph.edges
            );

            if (this._displayService.verticalDirection) {
                startXOffset =
                    edge.startVertex.calculateEdgePosition(
                        edge,
                        lowerLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (lowerLayerEdges.length + 1);

                startXOffset *= this.rectWidth;

                endXOffset =
                    edge.endVertex.calculateEdgePosition(
                        edge,
                        upperLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (upperLayerEdges.length + 1);
                endXOffset *= this.rectWidth;

                endYOffset = this.rectHeight;
            } else {
                startYOffset =
                    edge.startVertex.calculateEdgePosition(
                        edge,
                        lowerLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (lowerLayerEdges.length + 1);
                startYOffset *= this.rectHeight;

                endXOffset = this.rectWidth;

                endYOffset =
                    edge.endVertex.calculateEdgePosition(
                        edge,
                        upperLayerEdges,
                        this._displayService.verticalDirection
                    ) /
                    (upperLayerEdges.length + 1);
                endYOffset *= this.rectHeight;
            }
            //Start- und Endknoten der Kante sind gleich
        } else {
            if (this._displayService.verticalDirection) {
                startXOffset = this._rectWidth;
                endXOffset = this.rectWidth;
                startYOffset = this._rectHeight * 0.75;
                endYOffset = this.rectHeight * 0.25;
            } else {
                startXOffset = this._rectWidth * 0.75;
                startYOffset = this._rectHeight;
                endXOffset = this.rectWidth * 0.25;
                endYOffset = this.rectHeight;
            }
        }

        startX = edge.startVertex.getSvgElementXValue() + startXOffset;
        endX = edge.endVertex.getSvgElementXValue() + endXOffset;
        startY = edge.startVertex.getSvgElementYValue() + startYOffset;
        endY = edge.endVertex.getSvgElementYValue() + endYOffset;

        let coordinates = 'M ' + startX + ' ' + startY;

        if (this._displayService.verticalDirection && edge.isTargetingSelf())
            coordinates +=
                ' Q ' +
                (startX + 25) +
                ' ' +
                (startY + endY) / 2 +
                ' ' +
                endX +
                ' ' +
                endY;
        else if (
            !this._displayService.verticalDirection &&
            edge.isTargetingSelf()
        )
            coordinates +=
                ' Q ' +
                (startX + endX) / 2 +
                ' ' +
                (startY + 25) +
                ' ' +
                endX +
                ' ' +
                endY;
        else coordinates += ' L ' + endX + ' ' + endY;

        return coordinates;
    }

    private createTextForEdge(edge: Edge): SVGElement {
        let text = this.createSvgElement('text');

        let name = edge.pathSvgElement?.getAttribute('name') + 'Text';
        text.setAttribute('name', name);

        this.setTextCoordinates(edge, text);

        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font', 'bold 30px sans-serif');
        text.textContent = edge.activityCount.toString();
        text.setAttribute('pointer-events', 'none');

        edge.textSvgElement = text;

        return text;
    }

    private setTextCoordinates(edge: Edge, text: SVGElement): void {
        let d = edge.pathSvgElement?.getAttribute('d')?.split(' ');
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
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }

    public updateLayer(vertex: Vertex, graph: Graph): void {
        if (this._displayService.verticalDirection)
            this.updateLayerVertical(vertex, graph);
        else this.updateLayerHorizontal(vertex, graph);

        this.updateEdges(graph);
    }

    private updateLayerVertical(vertex: Vertex, graph: Graph): void {
        this.maxValue =
            this.minValue + graph.getMaxVerticesOnLayer() * this._offsetXValue;

        if (vertex.getSvgElementXValue() < this.minValue)
            vertex.svgElement?.setAttribute('x', this.minValue.toString());

        if (vertex.getSvgElementXValue() > this.maxValue)
            vertex.svgElement?.setAttribute('x', this.maxValue.toString());

        let vertices: Vertex[] =
            this._displayService.graph.getVerticesSortedByPosition(
                vertex.layer
            );

        let index = vertices.findIndex(v => v === vertex);

        if (index > 0) {
            let x: number = vertices[index - 1].getSvgElementXValue();

            if (x + this.rectWidth > vertex.getSvgElementXValue()) {
                let newX: number = Math.max(
                    x + this.offsetXValue,
                    vertex.getSvgElementXValue() + this.rectWidth
                );
                vertices[index - 1].svgElement?.setAttribute(
                    'x',
                    newX.toString()
                );
                vertices[index - 1].position =
                    (vertices[index - 1].getSvgElementXValue() -
                        this.minValue) /
                        this.offsetXValue +
                    1;
            }
        }

        if (index < vertices.length - 1) {
            let x: number = vertices[index + 1].getSvgElementXValue();

            if (x - this.rectWidth < vertex.getSvgElementXValue()) {
                let newX: number = Math.min(
                    x - this.offsetXValue,
                    vertex.getSvgElementXValue() - this.rectWidth
                );
                newX = Math.max(this.minValue, newX);
                vertices[index + 1].svgElement?.setAttribute(
                    'x',
                    newX.toString()
                );
                vertices[index + 1].position =
                    (vertices[index + 1].getSvgElementXValue() -
                        this.minValue) /
                        this.offsetXValue +
                    1;
            }
        }

        vertex.position =
            (vertex.getSvgElementXValue() - this.minValue) / this.offsetXValue +
            1;
    }

    private updateLayerHorizontal(vertex: Vertex, graph: Graph): void {
        this.maxValue =
            this.minValue + graph.getMaxVerticesOnLayer() * this._offsetYValue;

        if (vertex.getSvgElementYValue() < this.minValue)
            vertex.svgElement?.setAttribute('y', this.minValue.toString());

        if (vertex.getSvgElementYValue() > this.maxValue)
            vertex.svgElement?.setAttribute('y', this.maxValue.toString());

        let vertices: Vertex[] =
            this._displayService.graph.getVerticesSortedByPosition(
                vertex.layer
            );

        let index = vertices.findIndex(v => v === vertex);

        if (index > 0) {
            let y: number = vertices[index - 1].getSvgElementYValue();

            if (y + this.rectHeight > vertex.getSvgElementYValue()) {
                let newY: number = Math.max(
                    y + this.offsetYValue,
                    vertex.getSvgElementYValue() + this.rectHeight
                );
                vertices[index - 1].svgElement?.setAttribute(
                    'y',
                    newY.toString()
                );
                vertices[index - 1].position =
                    (vertices[index - 1].getSvgElementYValue() -
                        this.minValue) /
                        this.offsetYValue +
                    1;
            }
        }

        if (index < vertices.length - 1) {
            let y: number = vertices[index + 1].getSvgElementYValue();

            if (y - this.rectHeight < vertex.getSvgElementYValue()) {
                let newY: number = Math.min(
                    y - this.offsetYValue,
                    vertex.getSvgElementYValue() - this.rectHeight
                );
                newY = Math.max(this.minValue, newY);
                vertices[index + 1].svgElement?.setAttribute(
                    'y',
                    newY.toString()
                );
                vertices[index + 1].position =
                    (vertices[index + 1].getSvgElementYValue() -
                        this.minValue) /
                        this.offsetYValue +
                    1;
            }
        }

        vertex.position =
            (vertex.getSvgElementYValue() - this.minValue) / this.offsetYValue +
            1;
    }

    private updateEdges(graph: Graph): void {
        graph.edges.forEach(edge => {
            edge.pathSvgElement?.setAttribute(
                'd',
                this.setPathCoordinates(edge, graph)
            );
            if (!edge.endVertex.isDummy) {
                let text = edge.textSvgElement;
                if (text != undefined) this.setTextCoordinates(edge, text);
            }
        });
    }
}
