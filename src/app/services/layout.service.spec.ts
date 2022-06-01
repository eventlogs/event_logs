import { TestBed } from '@angular/core/testing';
import { Diagram } from '../classes/diagram/diagram';
import { GraphEvent } from '../classes/diagram/GraphEvent';
import { GraphTrace } from '../classes/diagram/GraphTrace';
import { LayoutService } from './layout.service';
import { Element, ElementType } from '../classes/diagram/element';

describe('LayoutService', () => {
    let service: LayoutService;

    const graphElement1: GraphEvent = new GraphEvent('a', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement2: GraphEvent = new GraphEvent('b', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement3: GraphEvent = new GraphEvent('c', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement4: GraphEvent = new GraphEvent('a', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement5: GraphEvent = new GraphEvent('b', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement6: GraphEvent = new GraphEvent('c', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement7: GraphEvent = new GraphEvent('a', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement8: GraphEvent = new GraphEvent('b', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement9: GraphEvent = new GraphEvent('c', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement10: GraphEvent = new GraphEvent('a', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement11: GraphEvent = new GraphEvent('b', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement12: GraphEvent = new GraphEvent('c', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement13: GraphEvent = new GraphEvent('a', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement14: GraphEvent = new GraphEvent('b', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const graphElement15: GraphEvent = new GraphEvent('c', [
        new Element(ElementType.text),
        new Element(ElementType.box),
    ]);
    const shortTrace: GraphTrace = new GraphTrace(
        [graphElement1, graphElement2, graphElement3],
        1,
        [new Element(ElementType.text)],
        [1, 2, 3]
    );
    const shortTrace2: GraphTrace = new GraphTrace(
        [graphElement4],
        1,
        [new Element(ElementType.text)],
        [1]
    );
    const longTrace: GraphTrace = new GraphTrace(
        [
            graphElement1,
            graphElement2,
            graphElement3,
            graphElement4,
            graphElement5,
            graphElement6,
            graphElement7,
            graphElement8,
            graphElement9,
            graphElement10,
            graphElement11,
            graphElement12,
            graphElement13,
            graphElement14,
            graphElement15,
        ],
        1,
        [new Element(ElementType.text)],
        [1]
    );
    let diagram1row3col: Diagram = new Diagram([shortTrace]);
    let diagram2row3col: Diagram = new Diagram([shortTrace, shortTrace2]);
    let diagram1row15col: Diagram = new Diagram([longTrace]);

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LayoutService);
        //reset Diagrams
        resetDiagrams();

        function resetDiagrams() {
            diagram1row3col = new Diagram([shortTrace]);
            diagram2row3col = new Diagram([shortTrace, shortTrace2]);
            diagram1row15col = new Diagram([longTrace]);
        }
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should layout 525px in x when 3 Events are present', () => {
        // 10 Offset + 75px für den Text+  3 x 150px pro Event = 525px
        let test = service.layout(diagram1row3col);
        expect(test[0]).toBe(535);
    });

    it('should layout 2335 in x when 15 Traces are present', () => {
        //50 Offset zur Mitte vom Trace + 25px für den zweite Hälfte vom Trace + 50px für einen vollen Trace
        let test = service.layout(diagram1row15col);
        expect(test[0]).toBe(2335);
    });

    it('should layout 75px in y when one Trace is present', () => {
        // 50 Offset zur Mitte vom Trace + 25px für den zweite Hälfte vom Trace
        let test = service.layout(diagram1row3col);
        expect(test[1]).toBe(75);
    });

    it('should layout 125px in y when 2 Traces are present', () => {
        //50 Offset zur Mitte vom Trace + 25px für den zweite Hälfte vom Trace + 50px für einen vollen Trace
        let test = service.layout(diagram2row3col);
        expect(test[1]).toBe(125);
    });

    it('should layout all traces to the correct position', () => {
        //50 Offset zur Mitte vom Trace + 25px für den zweite Hälfte vom Trace + 50px für einen vollen Trace
        service.layout(diagram2row3col);

        diagram2row3col.traces[0].svgElements.forEach(svg => {
            if (svg.type === ElementType.text) {
                expect(svg.x).toBe(10); // Offset von Links für Texte
                expect(svg.y).toBe(50); // Offset von Oben für Texte
            } else {
                throw 'Trace should only contain text elements';
            }
        });
        diagram2row3col.traces[0].events[0].svgElements.forEach(svg => {
            if (svg.type === ElementType.text) {
                expect(svg.x).toBe(85);
                expect(svg.y).toBe(50);
            } else if (svg.type === ElementType.box) {
                expect(svg.x).toBe(85);
                expect(svg.y).toBe(50);
            }
        });
    });
});
