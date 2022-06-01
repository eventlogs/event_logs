import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { DirectlyFollowsGraphService } from 'src/app/services/directly-follows-graph/display.service';
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

    private _subscription: Subscription;
    private _graph: Graph | undefined;

    constructor(
        private _svgService: SvgService,
        private _displayService: DirectlyFollowsGraphService
    ) {
        this._subscription = this._displayService.graph$.subscribe(graph => {
            this._graph = graph;
            this.draw();
        });
    }
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
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
    }

    private clearDrawingArea() {
        const drawingArea = this.directlyFollowsGraph?.nativeElement;
        if (drawingArea?.childElementCount === undefined) {
            return;
        }

        while (drawingArea?.childElementCount > 0) {
            drawingArea.removeChild(drawingArea.lastChild as ChildNode);
        }
    }
}
