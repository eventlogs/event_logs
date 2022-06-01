export class Vertex {
    private _activityName: String;
    private _activityCount: number;
    private _layer: number;
    private _y: number;
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

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

    public set svgElement(svgElement: SVGElement) {
        this._svgElement = svgElement;
        this._svgElement.onmousedown = event => {
            this.processMouseDown(event);
        };
        this._svgElement.onmouseup = event => {
            this.processMouseUp(event);
        };
    }

    constructor(activityName: String, activityCount: number) {
        this._activityName = activityName;
        this._activityCount = activityCount;
        this._layer = 50;
        this._y = 50;
    }

    private processMouseDown(event: MouseEvent) {}

    private processMouseUp(event: MouseEvent) {}
}
