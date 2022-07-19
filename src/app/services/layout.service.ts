import { Injectable } from '@angular/core';
import { Diagram } from '../classes/diagram/diagram';
import { Element } from '../classes/diagram/element';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    public static readonly XOFFSET = 10;
    private static readonly YOFFSET = 50;
    public static readonly XSTEP = 150;
    public static readonly YSTEP = 50;

    // Ordnet die Elemente des Diagrams an und gibt die maximalen Ausmaße der Zeichnung zurück
    public layout(diagram: Diagram): [number, number] {
        let x = 0;
        let y = 0;
        let xMax = 0;

        let layoutTraceLabel = function (element: Element) {
            element.x += LayoutService.XOFFSET;
            element.y += LayoutService.YOFFSET + y * LayoutService.YSTEP;
        };

        let layoutEventElements = function (elements: Element[]) {
            elements.forEach(svg => {
                svg.x +=
                    LayoutService.XOFFSET + (x - 0.5) * LayoutService.XSTEP;
                svg.y += LayoutService.YOFFSET + y * LayoutService.YSTEP;
            });
        };

        diagram.traces.forEach(trace => {
            layoutTraceLabel(trace.svgElements[0]);
            x++;
            trace.events.forEach(event => {
                layoutEventElements(event.svgElements);
                x++;
            });
            if (x > xMax) {
                xMax = x;
            }
            x = 0;
            y++;
        });

        return LayoutService.calculateLayoutSize(xMax, y);
    }

    private static calculateLayoutSize(
        xMax: number,
        y: number
    ): [number, number] {
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
