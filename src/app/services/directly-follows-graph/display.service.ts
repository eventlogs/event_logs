import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Edge } from '../../classes/directly-follows-graph/edge';
import { Graph } from '../../classes/directly-follows-graph/graph';
import { Vertex } from '../../classes/directly-follows-graph/vertex';
import { Event } from '../../classes/EventLog/event';
import { EventLog } from '../../classes/EventLog/eventlog';
import { Trace } from '../../classes/EventLog/trace';

@Injectable({
    providedIn: 'root',
})
export class DirectlyFollowsGraphService implements OnDestroy {
    private _graph: BehaviorSubject<Graph>;

    constructor() {
        this._graph = new BehaviorSubject<Graph>(new Graph([], []));
    }

    ngOnDestroy(): void {
        this._graph.complete();
    }

    public get graph$(): Observable<Graph> {
        return this._graph.asObservable();
    }

    public get graph(): Graph {
        return this._graph.getValue();
    }

    private convertEventLogToDirectlyFollowsGraph(eventLog: EventLog): Graph {
        let sortedTraces: Trace[][] = eventLog.sortedTraces;

        let edges: Edge[] = [];
        let vertices: Vertex[] = [];

        sortedTraces.forEach(traces => {
            for (let i = 0; i < traces[0].events.length; i++) {
                let event: Event = traces[0].events[i];

                //Überprüft, ob der Knoten bereits vorhanden ist, bzw. ob ein neuer Knoten erstellt werden muss.
                let vertex: Vertex | undefined = vertices.find(
                    vertex => vertex.activityName === event.activity
                );

                if (vertex !== undefined) vertex.activityCount += traces.length;
                else vertices.push(new Vertex(event.activity, traces.length));

                //Überprüft, ob zwischen den letzten beiden Events bereits eine Kante vorhanden ist, bzw. ob eine neue Kante erstellt werden muss.
                if (i >= 1) {
                    let previousEvent: Event = traces[0].events[i - 1];
                    let edge: Edge | undefined = edges.find(
                        edge =>
                            edge.startVertex?.activityName ===
                                previousEvent.activity &&
                            edge.endVertex.activityName === event.activity
                    );
                    if (edge !== undefined) edge.activityCount += traces.length;
                    else {
                        let startVertex: Vertex | undefined = vertices.find(
                            vertex =>
                                vertex.activityName === previousEvent.activity
                        );
                        let endVertex: Vertex | undefined = vertices.find(
                            vertex => vertex.activityName === event.activity
                        );
                        if (
                            startVertex !== undefined &&
                            endVertex !== undefined
                        )
                            edges.push(
                                new Edge(startVertex, endVertex, traces.length)
                            );
                    }
                }
            }
        });

        return new Graph(vertices, edges);
    }

    public displayDirectlyFollowsGraph(eventLog: EventLog) {
        let net = this.convertEventLogToDirectlyFollowsGraph(eventLog);
        this._graph.next(net);
    }
}
