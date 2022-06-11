import { Edge } from './edge';

export class Vertex {
    private _activityName: String;
    private _activityCount: number;
    private _layer: number;
    private _position: number;
    private _svgElement: SVGElement | undefined;

    public get activityName(): String {
        return this._activityName;
    }

    public set activityName(value: String) {
        this._activityName = value;
    }

    public get activityCount(): number {
        return this._activityCount;
    }

    public set activityCount(value: number) {
        this._activityCount = value;
    }

    public get layer(): number {
        return this._layer;
    }

    public set layer(value: number) {
        this._layer = value;
    }

    public get position(): number {
        return this._position;
    }

    public set position(value: number) {
        this._position = value;
    }

    public get svgElement(): SVGElement | undefined {
        return this._svgElement;
    }

    public set svgElement(svgElement: SVGElement | undefined) {
        this._svgElement = svgElement;
        if (this._svgElement != undefined) {
            this._svgElement.onmousedown = event => {
                this.processMouseDown(event);
            };
            this._svgElement.onmouseup = event => {
                this.processMouseUp(event);
            };
        }
    }

    constructor(activityName: String, activityCount: number) {
        this._activityName = activityName;
        this._activityCount = activityCount;
        this._layer = 0;
        this._position = 0;
    }

    private processMouseDown(event: MouseEvent) {}

    private processMouseUp(event: MouseEvent) {}

    public getSvgElementXValue(): number {
        let xString = this.svgElement?.getAttribute('x');
        let x: number = 0;
        if (xString != null) x = +xString;
        return x;
    }

    public getSvgElementYValue(): number {
        let yString = this.svgElement?.getAttribute('y');
        let y: number = 0;
        if (yString != null) y = +yString;
        return y;
    }

    //Gibt alle Kanten mit Knoten niedrigerer Ebenen zurück
    public getLowerLayerEdges(edges: Edge[]): Edge[] {
        let lowerLayerEdges: Edge[] = [];

        edges.forEach(edge => {
            if (
                (this === edge.startVertex &&
                    edge.startVertex.layer > edge.endVertex.layer) ||
                (this === edge.endVertex &&
                    edge.startVertex.layer < edge.endVertex.layer)
            )
                lowerLayerEdges.push(edge);
        });

        return lowerLayerEdges;
    }

    //Gibt alle Kanten mit Knoten höherer Ebenen zurück
    public getUpperLayerEdges(edges: Edge[]): Edge[] {
        let upperLayerEdges: Edge[] = [];

        edges.forEach(edge => {
            if (
                (this === edge.startVertex &&
                    edge.startVertex.layer < edge.endVertex.layer) ||
                (this === edge.endVertex &&
                    edge.startVertex.layer > edge.endVertex.layer)
            )
                upperLayerEdges.push(edge);
        });

        return upperLayerEdges;
    }

    //Berechnet die Position einer Kante zu den anderen Kanten
    public calculateEdgePosition(edge: Edge, edges: Edge[]): number {
        let position = 1;

        edges.forEach(e => {
            //Kanten verlaufen in die selbe Richtung
            if (
                edge.startVertex === e.startVertex ||
                edge.endVertex === e.endVertex
            ) {
                if (
                    (this === e.startVertex &&
                        edge.endVertex.getSvgElementXValue() >
                            e.endVertex.getSvgElementXValue()) ||
                    (this === e.endVertex &&
                        edge.startVertex.getSvgElementXValue() >
                            e.startVertex.getSvgElementXValue())
                )
                    position++;
            }
            //Kanten verlaufen in gegengesetzte Richtungen
            else {
                if (
                    (this === e.startVertex &&
                        edge.startVertex.getSvgElementXValue() >=
                            e.endVertex.getSvgElementXValue()) ||
                    (this === e.endVertex &&
                        edge.startVertex.getSvgElementXValue() >=
                            e.endVertex.getSvgElementXValue())
                )
                    position++;
            }

            //Verlaufen zwischen 2 Knoten Kanten in beide Richtungen, positioniere eine Kante weiter links
            if (
                (edge.startVertex == this &&
                    edge.endVertex == e.startVertex &&
                    edge.startVertex.layer < edge.endVertex.layer) ||
                (edge.endVertex == this &&
                    edge.startVertex == e.endVertex &&
                    edge.startVertex.layer < edge.endVertex.layer)
            )
                position--;
        });

        return position;
    }
}
