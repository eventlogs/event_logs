import { Injectable } from '@angular/core';
import { Diagram } from '../classes/diagram/diagram';
import { Element, ElementType } from '../classes/diagram/element';
import { LayoutService } from '../services/layout.service';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    private readonly backgroundColors = [
        'rgb(227, 26, 28)',
        'rgb(251, 154, 153)',
        'rgb(254, 191, 111)',
        'rgb(166, 206, 227)',
        'rgb(32, 120, 181)',
        'rgb(125, 227, 183)',
        'rgb(152, 250, 232, 1)',
        'rgb(112, 203, 255)',
        'rgb(227, 175, 166)',
        'rgb(181, 65, 33)',
    ];
    private readonly FONT = '15px sans-Serif';
    private readonly MAXFONTWIDTH = 120;
    private readonly XTEXTOFFSET = 5;
    private readonly YTEXTOFFSET = 4;
    private readonly YNEXTROWOFFSET = 20;

    private readonly xTraceBorderOffset = -5;
    private readonly yTraceBorderOffset = -23;
    private readonly widthTraceBorderPerElement = 150;
    private readonly widthTraceBorderOffset = 70;

    private readonly midPointOfHeight = 0;
    private readonly boxWidth = 125;
    private readonly boxHeight = 40;
    private readonly peakOffset = 10;
    private readonly topXCoordinate = 0 - (this.boxHeight / 2);
    private readonly leftXCoordinate = -20;

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
                trace.caseIds.every(val => selectedTraceCaseIds.includes(val))
            ) {
                let traceBorder = this.createSelectedTraceBorder(
                    trace.svgElements[0].x + this.xTraceBorderOffset,
                    trace.svgElements[0].y + this.yTraceBorderOffset,
                    trace.events.length * this.widthTraceBorderPerElement +
                        this.widthTraceBorderOffset
                );
                result.push(traceBorder);
            }

            const textNumber = this.createSvgForTraceCountLabel(
                trace.svgElements[0],
                trace.count.toString() +
                    (trace.count == 1 ? " trace" : " traces")
            );
            result.push(textNumber);
            trace.events.forEach(ev => {
                ev.svgElements.forEach(svgEl => {
                    if (svgEl.type === ElementType.text) {
                        const text = this.createSvgForText(
                            ev.svgElements[1],
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
                            ev.svgElements[0],
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
        svg.setAttribute('height', '46');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        return svg;
    }

    private createBoxForElement(element: Element, fill: number): SVGElement {
        const svg = this.createSvgElement('polygon');
        svg.setAttribute('transform', `translate( ${element.x} ${element.y} )`);
        svg.setAttribute('points', `${this.leftXCoordinate},${this.topXCoordinate}
                                                     ${this.boxWidth},${this.topXCoordinate}
                                                     ${this.boxWidth + this.peakOffset},${this.midPointOfHeight}
                                                     ${this.boxWidth},${this.boxHeight/2}
                                                     ${this.leftXCoordinate},${this.boxHeight/2}
                                                     ${this.leftXCoordinate + this.peakOffset},${this.midPointOfHeight}`);
        svg.setAttribute(
            'fill',
            this.backgroundColors[fill % this.backgroundColors.length]
        );
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');

        element.registerSvg(svg);

        return svg;
    }

    private getSubStrings(text: String): [String, String] {
        for (let i = 0; i <= text.length; i++) {
            let length = this.GetStringWidth(text.substring(0, i));
            if (length > this.MAXFONTWIDTH) {
                for (let j = i; j <= text.length; j++) {
                    let length2 = this.GetStringWidth(text.substring(i, j - 1));
                    if (length2 > this.MAXFONTWIDTH) {
                        return [
                            text.substring(0, i),
                            text.substring(i, j - 2) + '...',
                        ];
                    }
                }
                return [text.substring(0, i), text.substring(i)];
            }
        }
        return [text, ''];
    }

    private createSvgForTraceCountLabel(element: Element, text: String): SVGElement {
        const svg = this.createSvgElement('text');
        svg.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
        svg.setAttribute('y', `${element.y}`);
        let stringWidth = this.GetStringWidth(text);
        svg.setAttribute('width', `${stringWidth}`);
        svg.setAttribute('font', this.FONT);
        svg.textContent = text.toString();
        element.registerSvg(svg);
        return svg;
    }

    private createSvgForText(element: Element, text: String): SVGElement {
        const svg = this.createSvgElement('text');
        svg.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
        svg.setAttribute('y', `${element.y - this.YTEXTOFFSET}`);
        let stringWidth = this.GetStringWidth(text);
        if (stringWidth > this.MAXFONTWIDTH) {
            let subStrings = this.getSubStrings(text);
            const svg1 = this.createSvgElement('tspan');
            svg1.setAttribute('font', this.FONT);
            svg1.textContent = subStrings[0].toString();
            const svg2 = this.createSvgElement('tspan');
            svg2.setAttribute('font', this.FONT);
            svg2.textContent = subStrings[1].toString();
            svg2.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
            svg2.setAttribute('dy', `${this.YNEXTROWOFFSET}` + 'px');
            svg.appendChild(svg1);
            svg.appendChild(svg2);
        } else {
            svg.setAttribute('font', this.FONT);
            svg.textContent = text.toString();
        }
        element.registerSvg(svg);
        return svg;
    }

    private GetStringWidth(text: String): number {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', '100%');
        canvas.setAttribute('height', '380px');
        var ctx = canvas.getContext('2d');
        ctx!.font = this.FONT;
        var strWidth = ctx!.measureText(text.toString()).width;
        return strWidth;
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
