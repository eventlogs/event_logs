import { Injectable } from '@angular/core';
import { Diagram } from '../classes/diagram/diagram';
import { Element, ElementType } from '../classes/diagram/element';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private readonly backgroundColors = [
        'rgb(206, 57, 57)',
        'rgb(210, 55, 89)',
        'rgb(205, 62, 119)',
        'rgb(193, 76, 146)',
        'rgb(175, 91, 169)',
        'rgb(151, 105, 185)',
        'rgb(125, 117, 195)',
        'rgb(97, 128, 199)',
        'rgb(71, 136, 196)',
        'rgb(54, 142, 189)',
    ];

    private readonly xTraceBorderOffset = -5;
    private readonly yTraceBorderOffset = -24;
    private readonly widthTraceBorderPerElement = 150;
    private readonly widthTraceBorderOffset = 70;

    private activityColorMap = new Map<String, number>();

    /// Erstellt alle benötigten SVGElemente für ein gegebenes Diagram
    /// Alle SVG's werden außerdem zurückgegeben
    public createSvgElements(
        diagram: Diagram,
        selectedTraceCaseIds: Array<number>
    ): Array<SVGElement> {
        const result: Array<SVGElement> = [];

        diagram.traces.forEach(trace => {
            // Rahmen um die ausgewählten Traces
            if (
                JSON.stringify(selectedTraceCaseIds) ==
                JSON.stringify(trace.caseIds)
            ) {
                let traceBorder = this.createSelectedTraceBorder(
                    trace.svgElements[0].x + this.xTraceBorderOffset,
                    trace.svgElements[0].y + this.yTraceBorderOffset,
                    trace.events.length * this.widthTraceBorderPerElement +
                        this.widthTraceBorderOffset
                );
                result.push(traceBorder);
            }

            const textNumber = this.createSvgForText(
                trace.svgElements[0],
                trace.count.toString()
            );
            result.push(textNumber);
            trace.events.forEach(ev => {
                ev.svgElements.forEach(svgEl => {
                    if (svgEl.type === ElementType.text) {
                        const text = this.createSvgForText(
                            ev.svgElements[0],
                            ev.activity
                        );
                        result.push(text);
                    } else if (svgEl.type === ElementType.box) {
                        if (!this.activityColorMap.has(ev.activity)) {
                            this.activityColorMap.set(
                                ev.activity,
                                this.activityColorMap.size %
                                    this.backgroundColors.length
                            ); // Wenn die Map größer ist als Size Farben recyclen
                        }
                        const rect = this.createBoxForElement(
                            ev.svgElements[1],
                            this.activityColorMap.get(ev.activity)!
                        );
                        result.push(rect);
                    }
                });
            });
        });
        this.activityColorMap.clear();
        return result;
    }

    private createSelectedTraceBorder(x: number, y: number, width: number) {
        const svg = this.createSvgElement('rect');
        svg.setAttribute('x', `${x}`);
        svg.setAttribute('y', `${y}`);
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', '48');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        return svg;
    }

    private createBoxForElement(element: Element, fill: number): SVGElement {
        const svg = this.createSvgElement('polygon');
        svg.setAttribute('transform', `translate( ${element.x} ${element.y} )`);
        svg.setAttribute('points', '-20,-20 125,-20 135,0 125,20 -20,20 -10,0');
        svg.setAttribute(
            'fill',
            this.backgroundColors[fill % this.backgroundColors.length]
        );
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');

        element.registerSvg(svg);

        return svg;
    }

    private createSvgForText(element: Element, text: String): SVGElement {
        const svg = this.createSvgElement('text');
        svg.setAttribute('x', `${element.x}`);
        svg.setAttribute('y', `${element.y}`);
        svg.setAttribute('font', 'bold 30px sans-serif');
        svg.textContent = text.toString();
        element.registerSvg(svg);
        return svg;
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
