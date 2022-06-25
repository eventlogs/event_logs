import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { DisplayService } from 'src/app/services/display.service';
import { Trace } from 'src/app/classes/EventLog/trace';
import { Event } from 'src/app/classes/EventLog/event';

/**
 * Data source for the TracesDetailView view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TracesDetailViewDataSource extends DataSource<Event> {
    data: Event[] = [];
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    constructor(
        private _eventlogDataService: EventlogDataService,
        private _displayService: DisplayService
    ) {
        super();
        let selectedTraceCaseIds = _displayService.selectedTraceCaseIds;
        this._eventlogDataService.eventLog.traces.forEach(trace => {
            if (selectedTraceCaseIds.includes(trace.caseId)) {
                trace.events.forEach(element => {
                    this.data.push(element);
                });
            }
        });
        console.log(this.data);
        //this.data = this._eventlogDataService.eventLog.;
    }

    getColumns(): string[] {
        let result = ['caseId'];
        result.push('activity');
        for (let trace of this._eventlogDataService.eventLog.traces) {
            if (
                this._displayService.selectedTraceCaseIds.includes(trace.caseId)
            ) {
                trace.events[0].attributes.forEach(attr => {
                    result.push(attr.key);
                });
                break;
            }
        }
        return result;
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Event[]> {
        if (this.paginator && this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(
                observableOf(this.data),
                this.paginator.page,
                this.sort.sortChange
            ).pipe(
                map(() => {
                    return this.getPagedData(
                        this.getSortedData([...this.data])
                    );
                })
            );
        } else {
            throw Error(
                'Please set the paginator and sort on the data source before connecting.'
            );
        }
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {}

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: Event[]): Event[] {
        if (this.paginator) {
            const startIndex =
                this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        } else {
            return data;
        }
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: Event[]): Event[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort?.direction === 'asc';
            switch (this.sort?.active) {
                case 'activity':
                    return compare(a.activity, b.activity, isAsc);
                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
