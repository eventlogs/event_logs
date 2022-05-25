export enum ElementType {
    text,
    box,
}

export class Element {
    private _x: number;
    private _y: number;
    private _svgElement: SVGElement | undefined;
    private _type: ElementType;

    public get type(): ElementType {
        return this._type;
    }
    public set type(value: ElementType) {
        this._type = value;
    }

    constructor(type: ElementType) {
        this._x = 0;
        this._y = 0;
        this._type = type;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    public registerSvg(svg: SVGElement) {
        this._svgElement = svg;
        this._svgElement.onmousedown = event => {
            this.processMouseDown(event);
        };
        this._svgElement.onmouseup = event => {
            this.processMouseUp(event);
        };
    }

    private processMouseDown(event: MouseEvent) {}

    private processMouseUp(event: MouseEvent) {}
}
