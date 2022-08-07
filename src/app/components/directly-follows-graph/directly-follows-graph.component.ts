import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { DirectlyFollowsGraphService } from 'src/app/services/views/directly-follows-graph/display.service';
import { LayoutService } from 'src/app/services/views/directly-follows-graph/layout.service';
import { SvgService } from 'src/app/services/views/directly-follows-graph/svg.service';

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
                console.log("DFG draw");
                this.draw();
            }
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
        console.log("creating svg elements for graph");
        const start = Date.now();
        const svgElements = this._svgService.createSvgElements(
            this._displayService.graph
        );
        console.log("svg elements ready - took " + ((Date.now() - start)/1000) + " seconds");
        for (const svgElement of svgElements) {
            this.directlyFollowsGraph.nativeElement.appendChild(svgElement);
        }

        this.widthPx =
            this._layoutService.graphWidth + this._svgService.offsetXValue;
        this.heightPx =
            this._layoutService.graphHeight + this._svgService.offsetYValue;

        if (this._displayService.verticalDirection)
            this.widthPx += this._svgService.offsetXValue;
        else this.heightPx += this._svgService.offsetYValue;
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
}
