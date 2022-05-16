export enum ElementType {
    text,
    rect,
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

    constructor() {
        this._x = 0;
        this._y = 0;
        this._type = ElementType.text;
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
        this._svgElement.onmousedown = (event) => {
            this.processMouseDown(event);
        };
        this._svgElement.onmouseup = (event) => {
            this.processMouseUp(event);
        };
    }

    private processMouseDown(event: MouseEvent) {
        if (this._svgElement === undefined) {
            return;
        }
        this._svgElement.setAttribute('fill', 'red');
    }

    private processMouseUp(event: MouseEvent) {
        if (this._svgElement === undefined) {
            return;
        }
        this._svgElement.setAttribute('fill', 'black');
    }

}
