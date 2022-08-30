import { Diagram } from '../../../classes/diagram/diagram';
import { Element } from '../../../classes/diagram/element';
import { GraphTrace } from '../../../classes/diagram/GraphTrace';

export class LayoutService {
    public static readonly LOG_INFORMATION_INSTANCE =
        'LogInformationLayoutService';
    public static readonly VALUE_CHAIN_INSTANCE = 'ValueChainLayoutService';

    public static readonly X_OFFSET_VALUE_CHAIN = 40;
    public static readonly X_OFFSET_LOG_INFORMATION = 40;

    public static readonly Y_OFFSET_VALUE_CHAIN = 30;
    public static readonly Y_OFFSET_LOG_INFORMATION = 25;

    public static readonly X_STEP_VALUE_CHAIN = 150;
    public static readonly X_STEP_LOG_INFORMATION = 250;

    public static readonly Y_STEP_LOG_INFORMATION = 0;
    public static readonly Y_STEP_VALUE_CHAIN = 50;

    public static readonly X_LABELSIZE_VALUE_CHAIN = 65;
    public static readonly X_LABELSIZE_LOG_INFORMATION = 80;

    public static readonly X_LABEL_CHAR_EXTRA_OFFSET = 10;

    private readonly xOffset: number;
    private readonly yOffset: number;
    public readonly xStep: number;
    public readonly yStep: number;
    public readonly xLabelSize: number;

    private readonly labelExtraSizeExtractor;

    constructor(
        xOffset: number,
        yOffset: number,
        xStep: number,
        yStep: number,
        xLabelSize: number,
        labelExtraSizeExtractor: (trace: GraphTrace) => number
    ) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.xStep = xStep;
        this.yStep = yStep;
        this.xLabelSize = xLabelSize;
        this.labelExtraSizeExtractor = labelExtraSizeExtractor;
    }

    // Ordnet die Elemente des Diagrams an und gibt die maximalen Ausmaße der Zeichnung zurück
    public layout(
        diagram: Diagram,
        maxLabelExtraLettersOpt: number = -1
    ): [number, number] {
        let x = 0;
        let y = 0;
        let xMax = 0;

        const maxLabelExtraLetters =
            maxLabelExtraLettersOpt === -1
                ? Math.max(...diagram.traces.map(this.labelExtraSizeExtractor))
                : maxLabelExtraLettersOpt;

        diagram.traces.forEach(trace => {
            this.layoutTraceLabel(y, trace.svgElements[0]);
            x++;
            trace.events.forEach(event => {
                this.layoutEventElements(
                    x,
                    y,
                    maxLabelExtraLetters,
                    event.svgElements
                );
                x++;
            });
            if (x > xMax) {
                xMax = x;
            }
            x = 0;
            y++;
        });

        return this.calculateLayoutSize(xMax, y, maxLabelExtraLetters);
    }

    private layoutTraceLabel(y: number, element: Element) {
        element.x += this.xOffset;
        element.y += this.yOffset + y * this.yStep;
    }

    private layoutEventElements(
        x: number,
        y: number,
        maxLabelExtraLetters: number,
        elements: Element[]
    ) {
        elements.forEach(svg => {
            svg.x +=
                this.xOffset +
                (this.xLabelSize +
                    maxLabelExtraLetters *
                        LayoutService.X_LABEL_CHAR_EXTRA_OFFSET) +
                (x - 1) * this.xStep;
            svg.y += this.yOffset + y * this.yStep;
        });
    }

    private calculateLayoutSize(
        xMax: number,
        y: number,
        maxLabelExtraLetters: number
    ): [number, number] {
        // Halbe Y-Stepsize wird wieder abgezogen, da die Elemente in der Zeichnug ihren Nullpunkt in der Mitte haben
        // Ganze X-Stepsize wird wieder abgezogen, da Label über definierte Labesize berücksichtigt wird
        return [
            this.xOffset +
                (xMax - 1) * this.xStep +
                this.xLabelSize +
                maxLabelExtraLetters * LayoutService.X_LABEL_CHAR_EXTRA_OFFSET,
            2 * this.yOffset + y * this.yStep - (y > 0 ? this.yStep / 2 : 0),
        ];
    }
}
