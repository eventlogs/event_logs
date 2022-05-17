import {Injectable} from '@angular/core';
import {Diagram} from '../classes/diagram/diagram';
import { ElementType } from '../classes/diagram/element';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private static readonly XOFFSET = 10;
    private static readonly YOFFSET = 50;
    private static readonly XSTEP = 150;
    private static readonly YSTEP = 50;

    public layout(diagram: Diagram): void {

        let x = 0;
        let y = 0;

        diagram.traces.forEach( (trace) => {
            trace.svgElements[0].x = trace.svgElements[0].x + LayoutService.XOFFSET + x * LayoutService.XSTEP;
            trace.svgElements[0].y = trace.svgElements[0].y + LayoutService.YOFFSET + y * LayoutService.YSTEP;
            x++;
            trace.events.forEach( (el) => {
                el.svgElements.forEach( (svg => {
                    if ( svg.type === ElementType.text ) {
                        svg.x = svg.x + LayoutService.XOFFSET + x * LayoutService.XSTEP;
                        svg.y = svg.y + LayoutService.YOFFSET + y * LayoutService.YSTEP;                                           
                    } else if ( svg.type === ElementType.rect ) {
                        svg.x = svg.x + LayoutService.XOFFSET + x * LayoutService.XSTEP;
                        svg.y = svg.y + LayoutService.YOFFSET/2 + y * LayoutService.YSTEP;        
                    }
                }))

                x++;
            })
            x = 0;
            y++;
        })
    }
}
