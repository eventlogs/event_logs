import {Injectable} from '@angular/core';
import {Diagram} from '../classes/diagram/diagram';
import {Element} from '../classes/diagram/element';

@Injectable({
    providedIn: 'root'
})
export class SvgService {

    /// Erstellt alle benötigten SVGElemente für ein gegebenes Diagram
    /// Alle SVG's werden außerdem zurückgegeben
    public createSvgElements(diagram: Diagram): Array<SVGElement> {
        const result: Array<SVGElement> = [];

        diagram.traces.forEach(
            (trace) => {
                const textNumber = this.createSvgForText( trace.svgElements[0], trace.count.toString());
                result.push( textNumber );
                trace.events.forEach((ev) => {
                    if ( ev.svgElements.length)
                    {
                        const text = this.createSvgForText(  ev.svgElements[0], ev.activity );
                        result.push( text );
                        const rect = this.createRectForElement( ev.svgElements[1] );
                        result.push( rect );
                    }
                })
            }
        )
        return result;
    }

    private createRectForElement(element: Element) : SVGElement {
        const svg = this.createSvgElement('rect');

        svg.setAttribute('x', `${element.x}`);
        svg.setAttribute('y', `${element.y}`);
        svg.setAttribute('width', '130');
        svg.setAttribute('height', '30');
        svg.setAttribute('fill',"none");
        svg.setAttribute('stroke-width',"2");
        svg.setAttribute('stroke',"black");
        element.registerSvg(svg);

        return svg;
    }

    private createSvgForText( element: Element, text: String ) : SVGElement {
        const svg = this.createSvgElement('text');
        svg.setAttribute('x', `${element.x}`);
        svg.setAttribute('y', `${element.y}`);
        svg.setAttribute('font', 'bold 30px sans-serif');
        svg.textContent = text.toString()
        element.registerSvg(svg);
        return svg;
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
