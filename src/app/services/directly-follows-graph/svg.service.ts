import { Injectable } from '@angular/core';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';
import { Vertex } from 'src/app/classes/directly-follows-graph/vertex';

@Injectable({
    providedIn: 'root',
})
export class SvgService {
    public createSvgElements(graph: Graph): SVGElement[] {
        let result: SVGElement[] = [];

        graph.vertices.forEach(vertex => {
            let text = this.createSvgForText(vertex);
            result.push(text);
            let box = this.createBoxForElement(vertex);
            result.push(box);

            console.log('SvgService createSvgElements');
        });

        console.log('SvgService createSvgElements');
        return result;
    }

    private createBoxForElement(vertex: Vertex): SVGElement {
        let svgElement = this.createSvgElement('rect');
        svgElement.setAttribute(
            'transform',
            `translate( ${vertex.layer} ${vertex.y} )`
        );
        svgElement.setAttribute('width', '150');
        svgElement.setAttribute('height', '40');
        svgElement.setAttribute('fill', 'rgb(125, 125, 125)');
        svgElement.setAttribute('stroke-width', '2');
        svgElement.setAttribute('stroke', 'black');

        vertex.svgElement = svgElement;

        return svgElement;
    }

    private createSvgForText(vertex: Vertex): SVGElement {
        let svgElement = this.createSvgElement('text');
        svgElement.setAttribute('x', `${vertex.layer}`);
        svgElement.setAttribute('y', `${vertex.y}`);
        svgElement.setAttribute('font', 'bold 30px sans-serif');
        svgElement.textContent = vertex.activityName.toString();
        vertex.svgElement = svgElement;
        return svgElement;
    }

    private createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
