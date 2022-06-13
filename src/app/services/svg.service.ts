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

    private readonly FONT = '15px sans-Serif';
    private readonly MAXFONTWIDTH = 120;
    private readonly XTEXTOFFSET = 5;
    private readonly YTEXTOFFSET = 4;
    private readonly YNEXTROWOFFSET = 20;

    private activityColorMap = new Map<String, number>();

    /// Erstellt alle benötigten SVGElemente für ein gegebenes Diagram
    /// Alle SVG's werden außerdem zurückgegeben
    public createSvgElements(diagram: Diagram): Array<SVGElement> {
        const result: Array<SVGElement> = [];

        diagram.traces.forEach(trace => {
            const textNumber = this.createSvgForText(
                trace.svgElements[0],
                trace.count.toString()
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

    private getSubStrings(text: String): [String, String] {
        for (let i = 0; i <= text.length; i++) {
            let length = this.GetStringWidth(text.substring(0, i));
            if (length > this.MAXFONTWIDTH) {
                for (let j = i; j <= text.length; j++) {
                    let length2 = this.GetStringWidth(text.substring(i, j));
                    console.log(length2);
                    if (length2 > this.MAXFONTWIDTH) {
                        console.log(i);
                        console.log(j);
                        return [
                            text.substring(0, i - 1),
                            text.substring(i, j - 1) + '...',
                        ];
                    }
                }
                return [text.substring(0, i - 1), text.substring(i)];
            }
        }
        return [text, ''];
    }

    private createSvgForText(element: Element, text: String): SVGElement {
        const svg = this.createSvgElement('text');
        svg.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
        svg.setAttribute('y', `${element.y - this.YTEXTOFFSET}`);
        let stringWidth = this.GetStringWidth(text);
        if (stringWidth > this.MAXFONTWIDTH) {
            let subStrings = this.getSubStrings(text);
            console.log(subStrings);
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
