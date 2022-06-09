import { Injectable } from '@angular/core';
import { Diagram } from '../classes/diagram/diagram';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private static readonly XOFFSET = 10;
    private static readonly YOFFSET = 50;
    private static readonly XSTEP = 150;
    private static readonly YSTEP = 50;

    // Ordnet die Elemente des Diagrams an und gibt die maximalen Ausmaße der Zeichnung zurück
    public layout(diagram: Diagram): [number, number] {
        let x = 0;
        let y = 0;
        let xMax = 0;

        diagram.traces.forEach(trace => {
            trace.svgElements[0].x =
                trace.svgElements[0].x +
                LayoutService.XOFFSET +
                x * LayoutService.XSTEP;
            trace.svgElements[0].y =
                trace.svgElements[0].y +
                LayoutService.YOFFSET +
                y * LayoutService.YSTEP;
            x++;
            trace.events.forEach(el => {
                el.svgElements.forEach(svg => {
                    svg.x =
                        svg.x +
                        LayoutService.XOFFSET +
                        (x - 0.5) * LayoutService.XSTEP;
                    svg.y =
                        svg.y + LayoutService.YOFFSET + y * LayoutService.YSTEP;
                });

                x++;
            });
            if (x > xMax) {
                xMax = x;
            }
            x = 0;
            y++;
        });

        return this.calculateLayoutSize(xMax, y);
    }

    private calculateLayoutSize(xMax: number, y: number): [number, number] {
        // Halbe Stepsize wird wieder abgezogen da die Elemente in der Zeichnug ihren Nullpunkt in der Mitte haben
        return [
            LayoutService.XOFFSET +
                xMax * LayoutService.XSTEP -
                (xMax > 0 ? LayoutService.XSTEP / 2 : 0),
            LayoutService.YOFFSET +
                y * LayoutService.YSTEP -
                (y > 0 ? LayoutService.YSTEP / 2 : 0),
        ];
    }
}
