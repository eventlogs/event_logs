import { Injectable } from '@angular/core';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private static readonly XOFFSET = 10;
    private static readonly YOFFSET = 50;
    private static readonly XSTEP = 150;
    private static readonly YSTEP = 50;

    public layout(graph: Graph): void {
        let x = 0;
        // let y = 0;

        // graph.traces.forEach(trace => {
        //     trace.svgElements[0].x =
        //         trace.svgElements[0].x +
        //         LayoutService.XOFFSET +
        //         x * LayoutService.XSTEP;
        //     trace.svgElements[0].y =
        //         trace.svgElements[0].y +
        //         LayoutService.YOFFSET +
        //         y * LayoutService.YSTEP;
        //     x++;
        //     trace.events.forEach(el => {
        //         el.svgElements.forEach(svg => {
        //             svg.x =
        //                 svg.x +
        //                 LayoutService.XOFFSET +
        //                 (x - 0.5) * LayoutService.XSTEP;
        //             svg.y =
        //                 svg.y + LayoutService.YOFFSET + y * LayoutService.YSTEP;
        //         });

        //         x++;
        //     });
        //     x = 0;
        //     y++;
        // });
    }
}
