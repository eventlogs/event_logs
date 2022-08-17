import { Diagram } from '../../../classes/diagram/diagram';
import { Element, ElementType } from '../../../classes/diagram/element';
import { LayoutService } from '../layout-service/layout.service';
import { GraphTrace } from '../../../classes/diagram/GraphTrace';

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

    public static readonly LOG_INFORMATION_INSTANCE =
        'LogInformationSvgService';
    public static readonly VALUE_CHAIN_INSTANCE = 'ValueChainSvgService';

    private readonly FONT = '15px sans-Serif';
    private readonly XTEXTOFFSET = 5;
    private readonly YTEXTOFFSET = 4;
    private readonly YNEXTROWOFFSET = 20;
    public static readonly MAXFONTWIDTH_LOG_INFOMRATION = 168;
    public static readonly MAXFONTWIDTH_VALUE_CHAIN = 120;

    private readonly xTraceBorderOffset = -5;
    private readonly yTraceBorderOffset = -23;

    private readonly xCheckboxOffset = -35;
    private readonly yCheckboxOffset = -10;

    private readonly yDescriptionLabelOffset = 4;

    private readonly midPointOfHeight = 0;
    private readonly peakOffset = 10;

    private readonly leftXCoordinate = -20;
    public static readonly BOX_WIDTH_VALUE_CHAIN =
        LayoutService.X_STEP_VALUE_CHAIN - 25;
    public static readonly BOX_HEIGHT_VALUE_CHAIN =
        LayoutService.Y_STEP_VALUE_CHAIN - 10;
    public static readonly BOX_WIDTH_LOG_INFORMATION =
        LayoutService.X_STEP_LOG_INFORMATION - 25;
    public static readonly BOX_HEIGHT_LOG_INFORMATION =
        LayoutService.Y_OFFSET_LOG_INFORMATION * 2 - 10;

    private readonly maxFontWidth;
    private readonly boxWidth;
    private readonly boxHeight;
    private readonly labelExtractor;
    private readonly labelExtraSizeExtractor;
    private readonly topXCoordinate;

    constructor(
        private layoutService: LayoutService,
        maxFontWidth: number,
        boxWidth: number,
        boxHeight: number,
        labelExtractor: (trace: GraphTrace) => string,
        labelExtraSizeExtractor: (trace: GraphTrace) => number
    ) {
        this.maxFontWidth = maxFontWidth;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.labelExtractor = labelExtractor;
        this.labelExtraSizeExtractor = labelExtraSizeExtractor;
        this.topXCoordinate = 0 - this.boxHeight / 2;
    }

    private static _activityColorMap = new Map<String, String>();
    public static get activityColorMap() {
        return SvgService._activityColorMap;
    }

    /// Erstellt alle benötigten SVGElemente für ein gegebenes Diagram
    /// Alle SVG's werden außerdem zurückgegeben
    public createSvgElements(
        diagram: Diagram,
        selectedTraceCaseIds: Array<number>,
        reuseColors = true,
        isExport: boolean = false,
        maxLabelExtraLettersOpt: number = -1
    ): Array<SVGElement> {
        if (!reuseColors) {
            SvgService.activityColorMap.clear();
        }
        const result: Array<SVGElement> = [];

        const maxLabelExtraLetters =
            maxLabelExtraLettersOpt === -1
                ? Math.max(...diagram.traces.map(this.labelExtraSizeExtractor))
                : maxLabelExtraLettersOpt;

        diagram.traces.forEach(trace => {
            if (!isExport) {
                // Rahmen um die ausgewählten Traces
                let partiallySelected = trace.caseIds.some(val =>
                    selectedTraceCaseIds.includes(val)
                );
                let allSelected = trace.caseIds.every(val =>
                    selectedTraceCaseIds.includes(val)
                );
                if (partiallySelected) {
                    let traceBorder = SvgService.createSelectedTraceBorder(
                        trace.svgElements[0].x + this.xTraceBorderOffset,
                        trace.svgElements[0].y + this.yTraceBorderOffset,
                        trace.events.length * this.layoutService.xStep +
                            (this.layoutService.xLabelSize - 5) +
                            LayoutService.X_LABEL_CHAR_EXTRA_OFFSET *
                                maxLabelExtraLetters,
                        allSelected
                    );
                    result.push(traceBorder);
                }
                // Checkboxen für Traces
                let traceCheckboxBorder = SvgService.createTraceCheckboxBorder(
                    trace.svgElements[0],
                    trace.svgElements[0].x + this.xCheckboxOffset,
                    trace.svgElements[0].y + this.yCheckboxOffset
                );
                result.push(traceCheckboxBorder);
                if (partiallySelected) {
                    let traceCheckboxCheck =
                        SvgService.createTraceCheckboxCheck(
                            trace.svgElements[0].x + this.xCheckboxOffset,
                            trace.svgElements[0].y + this.yCheckboxOffset,
                            allSelected
                        );
                    result.push(traceCheckboxCheck);
                }
            }

            const descriptionLabel = this.createSvgForDescriptionLabel(
                trace.svgElements[0],
                this.labelExtractor(trace)
            );
            result.push(descriptionLabel);
            trace.events.forEach(ev => {
                ev.svgElements.forEach(svgEl => {
                    if (svgEl.type === ElementType.text) {
                        const text = this.createSvgForText(
                            ev.svgElements[1],
                            ev.activity
                        );
                        result.push(text);
                    } else if (svgEl.type === ElementType.box) {
                        if (!SvgService.activityColorMap.has(ev.activity)) {
                            SvgService.activityColorMap.set(
                                ev.activity,
                                this.backgroundColors[
                                    SvgService.activityColorMap.size %
                                        this.backgroundColors.length
                                ]
                            ); // Wenn die Map größer ist als Size Farben recyclen
                        }
                        const rect = this.createBoxForElement(
                            ev.svgElements[0],
                            SvgService.activityColorMap.get(ev.activity)!
                        );
                        result.push(rect);
                    }
                });
            });
        });
        return result;
    }

    private static createSelectedTraceBorder(
        x: number,
        y: number,
        width: number,
        allSelected: boolean
    ) {
        const svg = SvgService.createSvgElement('rect');
        svg.setAttribute('x', `${x}`);
        svg.setAttribute('y', `${y}`);
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', '46');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        if (!allSelected) {
            svg.setAttribute('stroke-dasharray', '6 3');
        }
        return svg;
    }

    private static createTraceCheckboxBorder(
        element: Element,
        x: number,
        y: number
    ) {
        const svg = SvgService.createSvgElement('polygon');
        svg.setAttribute(
            'points',
            `${x},${y} ${x},${y + 20} ${x + 20},${y + 20} ${x + 20},${y}`
        );
        svg.setAttribute('fill', '#ffffff');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        element.registerSvg(svg);
        return svg;
    }

    private static createTraceCheckboxCheck(
        x: number,
        y: number,
        allSelected: boolean
    ) {
        const svg = SvgService.createSvgElement('polyline');
        svg.setAttribute(
            'points',
            `${x + 4},${y + 10} ${x + 8},${y + 14} ${x + 16},${y + 4}`
        );
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        if (!allSelected) {
            svg.setAttribute('stroke-dasharray', '2 2');
        }
        return svg;
    }

    private createBoxForElement(element: Element, fill: String): SVGElement {
        const svg = SvgService.createSvgElement('polygon');
        svg.setAttribute('transform', `translate( ${element.x} ${element.y} )`);
        svg.setAttribute(
            'points',
            `${this.leftXCoordinate},${this.topXCoordinate}
                                                     ${this.boxWidth},${
                this.topXCoordinate
            }
                                                     ${
                                                         this.boxWidth +
                                                         this.peakOffset
                                                     },${this.midPointOfHeight}
                                                     ${this.boxWidth},${
                this.boxHeight / 2
            }
                                                     ${this.leftXCoordinate},${
                this.boxHeight / 2
            }
                                                     ${
                                                         this.leftXCoordinate +
                                                         this.peakOffset
                                                     },${this.midPointOfHeight}`
        );
        svg.setAttribute('fill', fill.toString());
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');

        element.registerSvg(svg);

        return svg;
    }

    private getSubStrings(text: String): [String, String] {
        for (let i = 0; i <= text.length; i++) {
            let length = this.GetStringWidth(text.substring(0, i));
            if (length > this.maxFontWidth) {
                for (let j = i; j <= text.length; j++) {
                    let length2 = this.GetStringWidth(text.substring(i, j - 1));
                    if (length2 > this.maxFontWidth) {
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

    private createSvgForDescriptionLabel(
        element: Element,
        text: String
    ): SVGElement {
        const svg = SvgService.createSvgElement('text');
        svg.setAttribute('x', `${element.x}`);
        svg.setAttribute('y', `${element.y + this.yDescriptionLabelOffset}`);
        svg.setAttribute('font', this.FONT);
        svg.textContent = text.toString();
        element.registerSvg(svg);
        return svg;
    }

    private createSvgForText(element: Element, text: String): SVGElement {
        const svg = SvgService.createSvgElement('text');
        svg.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
        svg.setAttribute('y', `${element.y - this.YTEXTOFFSET}`);
        let stringWidth = this.GetStringWidth(text);
        if (stringWidth > this.maxFontWidth) {
            let subStrings = this.getSubStrings(text);
            const svg1 = SvgService.createSvgElement('tspan');
            svg1.setAttribute('font', this.FONT);
            svg1.textContent = subStrings[0].toString();
            const svg2 = SvgService.createSvgElement('tspan');
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
        return ctx!.measureText(text.toString()).width;
    }

    private static createSvgElement(name: string): SVGElement {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
