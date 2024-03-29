import { Injectable } from '@angular/core';
import { Edge } from 'src/app/classes/directly-follows-graph/edge';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { DirectlyFollowsGraphService } from './display.service';
import { SvgService as ValueChainSvgService } from '../../common/svg-service/svg.service';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private _rectWidth: number = 150;
    private _rectHeight: number = 40;
    private _offsetXValue: number = this._rectWidth * 1.5;
    private _offsetYValue: number = this._rectHeight * 3;
    private maxActivityCountVertex = 0;
    private minValue: number = 50;
    private _svgElements: SVGElement[] = [];
    private font: string = '15px sans-Serif';
    private maxFontWidth: number = 130;

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

        this.maxActivityCountVertex = graph.getMaxActivityCountVertex();

        this._svgElements.push(this.createGradients(graph));

        graph.vertices.forEach(vertex => {
            let container = this.createContainer(vertex);

            let box = this.createRect(vertex);
            //Mache Elemente zu Kindern, damit sie gemeinsam manipuliert werden können.
            container.append(box);

            if (!vertex.isDummy) {
                let text = this.createTextForGraph(vertex);
                container.append(text);
            } else if (
                vertex.layer !== 1 &&
                vertex.layer !== graph.getMaxLayer()
            ) {
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
            if (!edge.endVertex.isDummy || edge.endVertex.isEnd) {
                let text = this.createTextForEdge(edge);
                this._svgElements.push(text);
            }
            this._svgElements.push(path);
        });

        return this._svgElements;
    }

    private createGradients(graph: Graph): SVGElement {
        let defs = this.createSvgElement('defs');

        graph.vertices.forEach(vertex => {
            if (!vertex.isDummy) {
                let linearGradient = this.createSvgElement('linearGradient');
                linearGradient.setAttribute(
                    'id',
                    vertex.activityName + 'Gradient'
                );
                linearGradient.setAttribute('x1', '0%');
                linearGradient.setAttribute('y1', '0%');
                linearGradient.setAttribute('x2', '100%');
                linearGradient.setAttribute('y2', '0%');

                let color = ValueChainSvgService.activityColorMap.get(
                    vertex.activityName
                );

                //Anpassung von Durchlässigkeit und Offset, um weniger häufige Knoten abzugrenzen
                let opacity =
                    vertex.activityCount / this.maxActivityCountVertex;

                let offset = 33 - 33 * opacity;

                let stop1 = this.createStop(offset, opacity, color);

                let stop2 = this.createStop(50, 1, color);

                offset = 67 + 33 * opacity;
                let stop3 = this.createStop(offset, opacity, color);

                linearGradient.append(stop1);
                linearGradient.append(stop2);
                linearGradient.append(stop3);

                defs.append(linearGradient);
            }
        });

        return defs;
    }

    private createStop(
        offset: number,
        opacity: number,
        color: String | undefined
    ): SVGElement {
        let stop = this.createSvgElement('stop');
        stop.setAttribute('offset', offset.toString() + '%');
        if (color != undefined)
            stop.setAttribute('stop-color', color.toString());
        stop.setAttribute('stop-opacity', opacity.toString());

        return stop;
    }

    private createContainer(vertex: Vertex): SVGElement {
        let svg = this.createSvgElement('svg');

        let x: number = this.minValue;
        let y: number = this.minValue;

        //Setze Abstand zwischen Positionen und Ebenen basierend auf der Ausrichtung
        if (this._displayService.verticalDirection) {
            x += this.offsetXValue * (vertex.position - 1);
            y += this.offsetYValue * (vertex.layer - 1);
            if (vertex.isStart) y += this.rectHeight / 2;
            if (vertex.isStart || vertex.isEnd) x += this.rectWidth / 4;
        } else {
            x += this.offsetXValue * (vertex.layer - 1);
            y += this.offsetYValue * (vertex.position - 1);
            if (vertex.isStart) x += this.rectWidth / 2;
            if (vertex.isStart || vertex.isEnd) y += this.rectHeight / 4;
        }

        svg.setAttribute('name', vertex.activityName.toString());
        svg.setAttribute('x', x.toString());
        svg.setAttribute('y', y.toString());

        let width: number = this.rectWidth;
        let height: number = this.rectHeight;

        if (vertex.isStart || vertex.isEnd) {
            height /= 2;
            width /= 2;
        }

        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());

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

        let width: number = this.rectWidth;
        let height: number = this.rectHeight;

        if (!vertex.isDummy) {
            rect.setAttribute(
                'fill',
                "url('#" + vertex.activityName + "Gradient')"
            );
            rect.setAttribute('fill-opacity', '1');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke', 'black');
        } else if (vertex.isStart || vertex.isEnd) {
            if (vertex.isStart || vertex.isEnd) {
                width /= 2;
                height /= 2;
            }

            rect.setAttribute('fill', 'rgb(125,125,125)');
            rect.setAttribute('fill-opacity', '1');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke', 'black');
        } else {
            rect.setAttribute('fill-opacity', '0');
        }

        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());

        return rect;
    }

    private createTextForGraph(vertex: Vertex): SVGElement {
        let text = this.createSvgElement('text');

        text.setAttribute('x', `50%`);
        text.setAttribute('y', `50%`);
        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font-family', 'sans-serif');
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

        tspan.textContent = this.getSubString(text);

        return tspan;
    }

    private getSubString(text: string): string {
        for (let i = 0; i <= text.length; i++) {
            let length = this.getStringWidth(text.substring(0, i));
            if (length > this.maxFontWidth) {
                return text.substring(0, i - 2) + '...';
            }
        }
        return text;
    }

    private getStringWidth(text: string): number {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', '100%');
        canvas.setAttribute('height', '380px');
        var ctx = canvas.getContext('2d');
        ctx!.font = this.font;
        return ctx!.measureText(text.toString()).width;
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

        let polygon = this.createSvgElement('polygon');
        polygon.setAttribute('points', '0 0, 10 5, 0 10');

        marker.append(polygon);

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
        if (!edge.endVertex.isDummy || edge.endVertex.isEnd)
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

        if (edge.startVertex.isStart) {
            if (this._displayService.verticalDirection) {
                startXOffset -= this.rectWidth / 4;
                startYOffset -= this.rectHeight / 2;
            } else {
                startXOffset -= this.rectWidth / 2;
                startYOffset -= this.rectHeight / 4;
            }
        }

        if (edge.endVertex.isEnd)
            if (this._displayService.verticalDirection) {
                endXOffset -= this.rectWidth / 4;
            } else {
                endYOffset -= this.rectHeight / 4;
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
        if (d !== undefined) {
            let startX: number = +d[1];
            let endX: number = +d[d.length - 2];

            let startY: number = +d[2];
            let endY: number = +d[d.length - 1];

            let xOffset: number = 4.5;
            let yOffset: number = -4.5;

            if (edge.startVertex === edge.endVertex) {
                if (!this._displayService.verticalDirection) {
                    xOffset = 0;
                    yOffset = 25;
                } else {
                    xOffset = 27.5;
                    yOffset = 0;
                }
            } else if (
                (startY < endY && startX > endX) ||
                (startY > endY && startX < endX)
            )
                xOffset *= -1;

            let x = 0.4 * startX + 0.6 * endX + xOffset;
            text.setAttribute('x', x.toString());

            let y = 0.4 * startY + 0.6 * endY + yOffset;
            text.setAttribute('y', y.toString());

            let transformOrigin = x.toString() + 'px ' + y.toString() + 'px';
            text.setAttribute('transform-origin', transformOrigin);

            let rotation: number = 0;

            if (this._displayService.verticalDirection) {
                if (edge.startVertex !== edge.endVertex) rotation = 90;
            }

            if (startX !== endX && startY !== endY)
                rotation =
                    (360 / (2 * Math.PI)) *
                    Math.atan(((endY - startY) ^ 2) / ((endX - startX) ^ 2));
            text.setAttribute('transform', 'rotate(' + rotation + ')');
        }
    }

    private createSvgElement(name: string): SVGElement {
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

        this.updateEdges(graph, vertex.layer);
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

    private updateEdges(graph: Graph, layer: number): void {
        let edges = graph.getEdgesByLayer(layer);

        edges.forEach(edge => {
            edge.pathSvgElement?.setAttribute(
                'd',
                this.setPathCoordinates(edge, graph)
            );
            if (!edge.endVertex.isDummy || edge.endVertex.isEnd) {
                let text = edge.textSvgElement;
                if (text !== undefined && text !== null)
                    this.setTextCoordinates(edge, text);
            }
        });
    }
}
