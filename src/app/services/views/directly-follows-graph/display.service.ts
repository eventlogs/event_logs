import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Edge } from '../../../classes/directly-follows-graph/edge';
import { Graph } from '../../../classes/directly-follows-graph/graph';
import { Vertex } from '../../../classes/directly-follows-graph/vertex';
import { Event } from '../../../classes/EventLog/event';
import { EventLog } from '../../../classes/EventLog/eventlog';
import { Trace } from '../../../classes/EventLog/trace';
import { EventlogDataService } from '../../common/data/eventlog-data.service';

@Injectable({
    providedIn: 'root',
})
export class DirectlyFollowsGraphService implements OnDestroy {
    private _graph: BehaviorSubject<Graph>;
    private _verticalDirection: BehaviorSubject<boolean>;

    constructor(private _eventLogDataService: EventlogDataService) {
        this._graph = new BehaviorSubject<Graph>(new Graph([], []));
        this._verticalDirection = new BehaviorSubject<boolean>(true);
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

    public get verticalDirection$(): Observable<boolean> {
        return this._verticalDirection.asObservable();
    }

    public get verticalDirection(): boolean {
        return this._verticalDirection.getValue();
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

                //Startknoten erstellen oder wiederverwenden
                if (i == 0) {
                    let startVertex: Vertex | undefined = vertices.find(
                        vertex =>
                            vertex.activityName === event.activity + 'Start'
                    );

                    if (startVertex === undefined) {
                        startVertex = new Vertex(
                            event.activity + 'Start',
                            traces.length,
                            true
                        );
                        startVertex.isStart = true;

                        vertices.push(startVertex);

                        let endVertex: Vertex | undefined = vertices.find(
                            vertex => vertex.activityName === event.activity
                        );

                        if (endVertex !== undefined)
                            edges.push(
                                new Edge(startVertex, endVertex, traces.length)
                            );
                    } else {
                        startVertex.activityCount += traces.length;

                        let startEdge: Edge | undefined = edges.find(
                            edge =>
                                edge.startVertex?.activityName ===
                                    startVertex?.activityName &&
                                edge.endVertex.activityName === event.activity
                        );
                        if (startEdge !== undefined)
                            startEdge.activityCount += traces.length;
                    }
                }

                //Endknoten erstellen oder wiederverwenden
                if (i == traces[0].events.length - 1) {
                    let endVertex: Vertex | undefined = vertices.find(
                        vertex => vertex.activityName === event.activity + 'End'
                    );

                    if (endVertex === undefined) {
                        endVertex = new Vertex(
                            event.activity + 'End',
                            traces.length,
                            true
                        );
                        endVertex.isEnd = true;

                        vertices.push(endVertex);

                        let startVertex: Vertex | undefined = vertices.find(
                            vertex => vertex.activityName === event.activity
                        );

                        if (startVertex !== undefined)
                            edges.push(
                                new Edge(startVertex, endVertex, traces.length)
                            );
                    } else {
                        endVertex.activityCount += traces.length;

                        let endEdge: Edge | undefined = edges.find(
                            edge =>
                                edge.startVertex?.activityName ===
                                    event.activity &&
                                edge.endVertex.activityName ===
                                    endVertex?.activityName
                        );
                        if (endEdge !== undefined)
                            endEdge.activityCount += traces.length;
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

    public switchDirection() {
        this._verticalDirection.next(!this._verticalDirection.value);
    }
}
