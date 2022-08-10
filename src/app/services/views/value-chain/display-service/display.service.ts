import { Injectable } from '@angular/core';
import { Diagram } from '../../../../classes/diagram/diagram';
import { GraphTrace } from '../../../../classes/diagram/GraphTrace';
import { EventLog } from '../../../../classes/EventLog/eventlog';
import { Element, ElementType } from '../../../../classes/diagram/element';
import { DisplayServiceBase } from '../../../common/display-service/display-base.service';

@Injectable({
    providedIn: 'root',
})
export class DisplayService extends DisplayServiceBase {
    private convertEventLogToDiagram(log: EventLog): Diagram {
        let traces = log.sortedTraces;
        let graphTraces = new Array<GraphTrace>();
        traces.forEach(traces => {
            let caseIds = traces.map(val => {
                return val.caseId;
            });
            let traceCount = new Element(ElementType.text, () =>
                this.traceCaseSelectionService.selectTraceCaseIds(caseIds)
            );
            let graphTrace = new GraphTrace(
                this.getEventGraphics(traces[0], caseIds),
                traces.length,
                [traceCount],
                caseIds
            );
            graphTraces.push(graphTrace);
        });

        return new Diagram(graphTraces);
    }

    public displayEventLog(log: EventLog) {
        let net = this.convertEventLogToDiagram(log);
        this._diagram$.next(net);
        return net;
    }
}
