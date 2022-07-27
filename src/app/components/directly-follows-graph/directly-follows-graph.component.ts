import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
import { LayoutService } from 'src/app/services/directly-follows-graph/layout.service';
import { SvgService } from 'src/app/services/directly-follows-graph/svg.service';

@Component({
    selector: 'app-directly-follows-graph',
    templateUrl: './directly-follows-graph.component.html',
    styleUrls: ['./directly-follows-graph.component.scss'],
})
export class DirectlyFollowsGraphComponent implements OnDestroy, AfterViewInit {
    @ViewChild('directlyFollowsGraph') directlyFollowsGraph:
        | ElementRef<SVGElement>
        | undefined;

    private _graphSubscription: Subscription;
    private _graph: Graph | undefined;
    private _directionSubscription: Subscription;
    public heightPx: number = 390;
    public widthPx: number = 100;
    private _svg: SVGElement | undefined;
    private _draggingVertex: Vertex | undefined;

    constructor(
        private _layoutService: LayoutService,
        private _svgService: SvgService,
        private _displayService: DirectlyFollowsGraphService
    ) {
        this._graphSubscription = this._displayService.graph$.subscribe(
            graph => {
                this._graph = graph;
                this._layoutService.layout(this._graph);
                this.draw();
            }
        );
        this._directionSubscription =
            this._displayService.verticalDirection$.subscribe(direction =>
                this.draw()
            );
    }

    ngAfterViewInit(): void {
        this._svg = this.directlyFollowsGraph?.nativeElement as SVGElement;
        this._svg.onmousedown = event => {
            this.processMouseDown(event);
        };
        this._svg.onmouseup = event => {
            this.processMouseUp(event);
        };
    }

    private processMouseDown(event: MouseEvent) {
        let target = event.target as SVGElement;
        this._draggingVertex = this._graph?.vertices.find(
            vertex => vertex.activityName === target.getAttribute('name')
        );

        let current: string | null | undefined;
        let mouseStart: number;

        if (this._displayService.verticalDirection) {
            current = this._draggingVertex?.svgElement?.getAttribute('x');
            mouseStart = event.clientX;
        } else {
            current = this._draggingVertex?.svgElement?.getAttribute('y');
            mouseStart = event.clientY;
        }

        if (this._svg == undefined || current == undefined) return;

        this._svg.onmousemove = event => {
            this.processMouseMove(event, current!, mouseStart);
        };
    }

    private processMouseMove(
        event: MouseEvent,
        current: string | null,
        mouseStart: number
    ) {
        if (this._draggingVertex == undefined || this._graph == undefined)
            return;

        event.preventDefault();
        if (this._draggingVertex.svgElement === undefined) return;

        if (current == undefined) return;

        if (this._displayService.verticalDirection) {
            let x: number = +current + event.clientX - mouseStart;
            this._draggingVertex.svgElement.setAttribute('x', x.toString());
        } else {
            let y: number = +current + event.clientY - mouseStart;
            this._draggingVertex.svgElement.setAttribute('y', y.toString());
        }

        this._svgService.updateLayer(this._draggingVertex, this._graph);
    }

    private processMouseUp(event: MouseEvent) {
        if (this._svg !== undefined) this._svg.onmousemove = null;
        this._draggingVertex = undefined;
    }

    ngOnDestroy(): void {
        this._graphSubscription.unsubscribe();
    }

    private draw() {
        if (this.directlyFollowsGraph === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }

        this.clearDrawingArea();
        const svgElements = this._svgService.createSvgElements(
            this._displayService.graph
        );
        for (const svgElement of svgElements) {
            this.directlyFollowsGraph.nativeElement.appendChild(svgElement);
        }

        if (this._graph != undefined) {
            this.calcGraphWidth(this._graph);
            this.calcGraphHeight(this._graph);
        }
    }

    private clearDrawingArea() {
        this.heightPx = 390;
        this.widthPx = 100;

        const drawingArea = this.directlyFollowsGraph?.nativeElement;
        if (drawingArea?.childElementCount === undefined) {
            return;
        }

        while (drawingArea?.childElementCount > 0) {
            drawingArea.removeChild(drawingArea.lastChild as ChildNode);
        }
    }

    private calcGraphWidth(graph: Graph): void {
        if (this._displayService.verticalDirection) {
            this.widthPx =
                (graph.getMaxPosition() + 1) * this._svgService.offsetXValue;
        } else {
            this.widthPx = graph.getMaxLayer() * this._svgService.offsetXValue;
        }
    }

    private calcGraphHeight(graph: Graph): void {
        if (this._displayService.verticalDirection) {
            this.heightPx = graph.getMaxLayer() * this._svgService.offsetYValue;
        } else {
            this.heightPx =
                (graph.getMaxPosition() + 1) * this._svgService.offsetYValue;
        }
    }
}
