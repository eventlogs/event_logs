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

            let box = this.createRect(vertex);
            //Mache Elemente zu Kindern, damit sie gemeinsam manipuliert werden können.
            container.append(box);

            if (!vertex.isDummy) {
                let text = this.createTextForGraph(vertex);
                container.append(text);
            } else {
                let path = this.createPathForDummyVertex(vertex);
                container.append(path);
            }

            vertex.svgElement = container;
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
        let svg = SvgService.createSvgElement('svg');

        let x: number = 50;
        let y: number = 50;

        //Setze Abstand zwischen Positionen und Ebenen basierend auf der Ausrichtung
        if (this._displayService.verticalDirection) {
            x += vertex.position;
            y += this.offsetYValue * (vertex.layer - 1);
        } else {
            x += this.offsetXValue * (vertex.layer - 1);
            y += vertex.position;
        }

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
        let rect = SvgService.createSvgElement('rect');

        rect.setAttribute('name', vertex.activityName.toString());
        rect.setAttribute('rx', '15');
        rect.setAttribute('ry', '15');
        rect.setAttribute('width', this.rectWidth.toString());
        rect.setAttribute('height', this.rectHeight.toString());

        if (!vertex.isDummy) {
            rect.setAttribute('fill', 'rgb(150, 150, 150)');
            //Setze höhere Füllstärke, für häufiger vorkommende Knoten
            let fillOpacity =
                0.1 + 0.8 * (vertex.activityCount / this.maxActivityCount);
            rect.setAttribute('fill-opacity', fillOpacity.toString());
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke', 'black');
        } else {
            rect.setAttribute('fill-opacity', '0');
        }

        return rect;
    }

    private createTextForGraph(vertex: Vertex): SVGElement {
        let text = SvgService.createSvgElement('text');

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
        let tspan = SvgService.createSvgElement('tspan');

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

    private static createArrow(): SVGElement {
        let defs = SvgService.createSvgElement('defs');
        defs.append(SvgService.createMarker());

        return defs;
    }

    private static createMarker(): SVGElement {
        let marker = SvgService.createSvgElement('marker');

        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('id', 'marker');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('orient', 'auto');

        let path = SvgService.createSvgElement('path');
        path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        path.setAttribute('fill', 'context-stroke');
        path.setAttribute('pointer-events', 'none');

        marker.append(path);

        return marker;
    }

    private createPath(edge: Edge, graph: Graph): SVGElement {
        let path = SvgService.createSvgElement('path');

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

    private static createTextForEdge(edge: Edge): SVGElement {
        let text = SvgService.createSvgElement('text');

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

    private static createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }

    public updateLayer(vertex: Vertex, graph: Graph): void {
        let positionValue: number;
        let offsetValue: number;
        let axis: string;
        let rectSize;

        if (this._displayService.verticalDirection) {
            positionValue = vertex.getSvgElementXValue();
            offsetValue = this.offsetXValue;
            axis = 'x';
            rectSize = this.rectWidth;
        } else {
            positionValue = vertex.getSvgElementYValue();
            offsetValue = this.offsetYValue;
            axis = 'y';
            rectSize = this.rectHeight;
        }

        if (positionValue < this.minValue)
            vertex.svgElement?.setAttribute(axis, this.minValue.toString());

        let vertices: Vertex[] = graph.getVerticesSortedByPosition(
            vertex.layer
        );

        let index: number = vertices.findIndex(v => v === vertex);

        //Knoten wird nach links/oben geschoben
        if (index > 0) {
            let previousPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[index - 1].getSvgElementXValue()
                : vertices[index - 1].getSvgElementYValue();

            if (previousPositionValue + rectSize > positionValue) {
                let newPositionValue: number = Math.max(
                    previousPositionValue + offsetValue,
                    positionValue + rectSize
                );

                vertices[index - 1].svgElement?.setAttribute(
                    axis,
                    newPositionValue.toString()
                );

                vertices[index - 1].position =
                    (newPositionValue - this.minValue) / offsetValue + 1;
            }
        }

        //Knoten wird nach rechts/unten geschoben
        if (index < vertices.length - 1) {
            let nextPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[index + 1].getSvgElementXValue()
                : vertices[index + 1].getSvgElementYValue();

            if (nextPositionValue - rectSize < positionValue) {
                let newPositionValue: number;

                //Position abhängig davon setzen, ob genügend Platz ist
                if (positionValue / rectSize > index + 1)
                    newPositionValue = Math.min(
                        nextPositionValue - offsetValue,
                        positionValue - rectSize
                    );
                else newPositionValue = positionValue + offsetValue;

                newPositionValue = Math.max(this.minValue, newPositionValue);
                vertices[index + 1].svgElement?.setAttribute(
                    axis,
                    newPositionValue.toString()
                );

                vertices[index + 1].position =
                    (newPositionValue - this.minValue) / this.offsetXValue + 1;
            }
        }

        vertex.position = (positionValue - this.minValue) / offsetValue + 1;

        vertices = graph.getVerticesSortedByPosition(vertex.layer);

        index = vertices.findIndex(v => v === vertex);

        this.updateOffset(vertices, offsetValue, rectSize, axis, index);

        this.updateEdges(graph);
    }

    private updateOffset(
        vertices: Vertex[],
        offsetValue: number,
        rectSize: number,
        axis: string,
        index: number
    ): void {
        for (let i = index - 1; i > 0; i--) {
            let currentPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[i].getSvgElementXValue()
                : vertices[i].getSvgElementYValue();

            let previousPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[i - 1].getSvgElementXValue()
                : vertices[i - 1].getSvgElementYValue();

            if (previousPositionValue + rectSize > currentPositionValue) {
                let newPositionValue: number = currentPositionValue - rectSize;

                vertices[i - 1].svgElement?.setAttribute(
                    axis,
                    newPositionValue.toString()
                );

                previousPositionValue = this._displayService.verticalDirection
                    ? vertices[i - 1].getSvgElementXValue()
                    : vertices[i - 1].getSvgElementYValue();

                vertices[i - 1].position =
                    (previousPositionValue - this.minValue) / offsetValue + 1;
            } else {
                break;
            }
        }

        for (let i = index + 1; i < vertices.length - 1; i++) {
            let currentPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[i].getSvgElementXValue()
                : vertices[i].getSvgElementYValue();

            let nextPositionValue: number = this._displayService
                .verticalDirection
                ? vertices[i + 1].getSvgElementXValue()
                : vertices[i + 1].getSvgElementYValue();

            if (currentPositionValue + rectSize > nextPositionValue) {
                let newPositionValue: number = currentPositionValue + rectSize;

                vertices[i + 1].svgElement?.setAttribute(
                    axis,
                    newPositionValue.toString()
                );

                nextPositionValue = this._displayService.verticalDirection
                    ? vertices[i + 1].getSvgElementXValue()
                    : vertices[i + 1].getSvgElementYValue();

                vertices[i + 1].position =
                    (nextPositionValue - this.minValue) / offsetValue + 1;
            } else {
                break;
            }
        }
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
