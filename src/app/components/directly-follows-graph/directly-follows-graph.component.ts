import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
import { LayoutService } from 'src/app/services/directly-follows-graph/layout.service';
import { SvgService } from 'src/app/services/directly-follows-graph/svg.service';

@Component({
    selector: 'app-directly-follows-graph',
    templateUrl: './directly-follows-graph.component.html',
    styleUrls: ['./directly-follows-graph.component.scss'],
})
export class DirectlyFollowsGraphComponent implements OnDestroy {
    @ViewChild('directlyFollowsGraph') directlyFollowsGraph:
        | ElementRef<SVGElement>
        | undefined;

    private _graphSubscription: Subscription;
    private _graph: Graph | undefined;
    private _directionSubscription: Subscription;
    public heightPx: number = 390;
    public widthPx: number = 100;

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
