import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
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
    @Input() clientWidth: number | undefined;

    private _subscription: Subscription;
    private _graph: Graph | undefined;
    public heightPx: number = 390;
    //public widthPercent: number = 100;
    public widthPx: number = 100;

    constructor(
        private _layoutService: LayoutService,
        private _svgService: SvgService,
        private _displayService: DirectlyFollowsGraphService
    ) {
        this._subscription = this._displayService.graph$.subscribe(graph => {
            this._graph = graph;
            this._layoutService.layout(this._graph);
            this.draw();
        });
    }

    // private calcWidth(pixelWidth: number) {
    //     if (this.clientWidth != undefined) {
    //         let drawingWidth = (pixelWidth / this.clientWidth) * 100;
    //         drawingWidth < 100
    //             ? (this.widthPercent = 100)
    //             : (this.widthPercent = drawingWidth);
    //     }
    // }

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

        this.heightPx = this._layoutService.graphHeight;
        this.widthPx =
            this._layoutService.graphWidth + 2 * this._svgService.rectWidth;
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
