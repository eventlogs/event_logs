import { TestBed } from '@angular/core/testing';
import { Diagram } from '../classes/diagram/diagram';
import { GraphEvent } from '../classes/diagram/GraphEvent';
import { GraphTrace } from '../classes/diagram/GraphTrace';
import { LayoutService } from './layout.service';
import { Element, ElementType } from '../classes/diagram/element';

describe('LayoutService', () => {
    let service: LayoutService;

    let diagram1row3col: Diagram = new Diagram([]);
    let diagram2row3col: Diagram = new Diagram([]);
    let diagram1row15col: Diagram = new Diagram([]);

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LayoutService);
        //reset Diagrams
        resetDiagrams();

        function resetDiagrams() {
            const graphElement1: GraphEvent = new GraphEvent('a', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement2: GraphEvent = new GraphEvent('b', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement3: GraphEvent = new GraphEvent('c', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement4: GraphEvent = new GraphEvent('a', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement5: GraphEvent = new GraphEvent('b', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement6: GraphEvent = new GraphEvent('c', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement7: GraphEvent = new GraphEvent('a', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement8: GraphEvent = new GraphEvent('b', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement9: GraphEvent = new GraphEvent('c', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement10: GraphEvent = new GraphEvent('a', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement11: GraphEvent = new GraphEvent('b', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement12: GraphEvent = new GraphEvent('c', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement13: GraphEvent = new GraphEvent('a', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement14: GraphEvent = new GraphEvent('b', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const graphElement15: GraphEvent = new GraphEvent('c', [
                new Element(ElementType.text, () => undefined),
                new Element(ElementType.box, () => undefined),
            ]);
            const shortTrace: GraphTrace = new GraphTrace(
                [graphElement1, graphElement2, graphElement3],
                1,
                [new Element(ElementType.text, () => undefined)],
                [1, 2, 3]
            );
            const shortTrace2: GraphTrace = new GraphTrace(
                [graphElement4],
                1,
                [new Element(ElementType.text, () => undefined)],
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
                [new Element(ElementType.text, () => undefined)],
                [1]
            );

            diagram1row3col = new Diagram([shortTrace]);
            diagram2row3col = new Diagram([shortTrace, shortTrace2]);
            diagram1row15col = new Diagram([longTrace]);
        }
    });

    const XOFFSET: number = 10;
    const TEXTWIDTH: number = 75;
    const EVENTWIDTH: number = 150;

    const YOFFSETTOMID: number = 50;
    const TRACEHEIGHT: number = 50;

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should layout 525px in x when 3 Events are present', () => {
        let test = service.layout(diagram1row3col);
        expect(test[0]).toBe(XOFFSET + TEXTWIDTH + 3 * EVENTWIDTH);
    });

    it('should layout 2335 in x when 15 Events are present', () => {
        let test = service.layout(diagram1row15col);
        expect(test[0]).toBe(XOFFSET + TEXTWIDTH + 15 * EVENTWIDTH);
    });

    it('should layout 75px in y when one Trace is present', () => {
        let test = service.layout(diagram1row3col);
        expect(test[1]).toBe(YOFFSETTOMID + TRACEHEIGHT * 0.5);
    });

    it('should layout 125px in y when 2 Traces are present', () => {
        let test = service.layout(diagram2row3col);
        expect(test[1]).toBe(YOFFSETTOMID + TRACEHEIGHT * 0.5 + TRACEHEIGHT);
    });

    it('should layout all traces to the correct position', () => {
        service.layout(diagram2row3col);

        diagram2row3col.traces[0].svgElements.forEach(svg => {
            if (svg.type === ElementType.text) {
                expect(svg.x).toBe(XOFFSET); // Offset von Links f??r Texte
                expect(svg.y).toBe(YOFFSETTOMID); // Offset von Oben f??r Texte
            } else {
                throw 'Trace should only contain text elements';
            }
        });
        diagram2row3col.traces[0].events[0].svgElements.forEach(svg => {
            if (svg.type === ElementType.text) {
                expect(svg.x).toBe(XOFFSET + TEXTWIDTH);
                expect(svg.y).toBe(YOFFSETTOMID);
            } else if (svg.type === ElementType.box) {
                expect(svg.x).toBe(XOFFSET + TEXTWIDTH);
                expect(svg.y).toBe(YOFFSETTOMID);
            }
        });
    });
});
