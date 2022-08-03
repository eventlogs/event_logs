import { Injectable, OnDestroy } from '@angular/core';
import { Diagram } from '../../../../classes/diagram/diagram';
import { GraphTrace } from '../../../../classes/diagram/GraphTrace';
import { Element, ElementType } from '../../../../classes/diagram/element';
import { Trace } from '../../../../classes/EventLog/trace';
import { LogInformationViewComponent } from '../../../../components/log-information-view/log-information-view.component';
import { DisplayServiceBase } from '../../common/display-service/display-base.service';

@Injectable({
    providedIn: LogInformationViewComponent,
})
export class DisplayService extends DisplayServiceBase implements OnDestroy {
    private convertTraceCaseToDiagram(traceCase: Trace): Diagram {
        let caseId = traceCase.caseId;
        let borderAndCaseIdentifierElement = new Element(ElementType.text, () =>
            this.traceCaseSelectionService.selectTraceCaseIds([caseId])
        );
        let graphTrace = new GraphTrace(
            this.getEventGraphics(traceCase, [caseId]),
            1,
            [borderAndCaseIdentifierElement],
            [caseId]
        );

        return new Diagram([graphTrace]);
    }

    public displayLogTraceCase(traceCase: Trace) {
        let next = this.convertTraceCaseToDiagram(traceCase);
        this._diagram$.next(next);
    }
}
