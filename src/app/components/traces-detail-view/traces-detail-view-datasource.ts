import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { Event } from 'src/app/classes/EventLog/event';
import { EventEmitter } from 'stream';

/**
 * Data source for the TracesDetailView view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TracesDetailViewDataSource extends DataSource<Event> {
    _data: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
    private _filter: string = '';
    public get filter(): string {
        return this._filter;
    }
    public set filter(value: string) {
        this._filter = value;
        this.refreshData();
    }
    _selectedTraceCaseIds: BehaviorSubject<Number[]> = new BehaviorSubject<
        Number[]
    >([]);

    constructor(private _eventlogDataService: EventlogDataService) {
        super();
    }

    refreshData() {
        let eventlog =
            this._eventlogDataService
                .eventLogWithSelectedOrNothingWhenNothingSelected;

        let eventsData = eventlog.traces.flatMap(trace => trace.events);
        this._data.next(eventsData);

        let selectedData = eventlog.traces.map(trace => trace.caseId);
        this._selectedTraceCaseIds.next(selectedData);
    }

    getColumns(): string[] {
        let eventlog =
            this._eventlogDataService
                .eventLogWithSelectedOrNothingWhenNothingSelected;
        if (!eventlog.traces.length) {
            return [];
        }
        let result = ['caseId', 'activity'];

        const otherAttributes = new Set<string>(
            eventlog.traces
                .flatMap(trace => trace.events)
                .flatMap(event => event.attributes)
                .map(attribute => attribute.key)
        );

        return result.concat(Array.from(otherAttributes));
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
                this._data,
                this.paginator.page,
                this.sort.sortChange
            ).pipe(
                map(() => {
                    return this.getPagedData(
                        this.getSortedData(
                            this.getFilteredData([...this._data.value])
                        )
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
    disconnect(): void {
        this._selectedTraceCaseIds.complete();
        this._data.complete();
    }

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
                case 'caseId':
                    return compare(
                        this._eventlogDataService.getCaseId(a),
                        this._eventlogDataService.getCaseId(b),
                        isAsc
                    );
                default:
                    if (this.sort?.active === undefined) {
                        return 0;
                    }
                    return compare(
                        a.getAttribute(this.sort?.active).value.toString(),
                        b.getAttribute(this.sort?.active).value.toString(),
                        isAsc
                    );
            }
        });
    }

    private getFilteredData(data: Event[]): Event[] {
        if (this._filter === '') {
            return data;
        }
        return data.filter(event => {
            return (
                event.activity
                    .toLowerCase()
                    .includes(this._filter.toLowerCase()) ||
                event.attributes.some(attribute =>
                    attribute.value
                        .toString()
                        .toLowerCase()
                        .includes(this._filter.toLowerCase())
                ) ||
                event.attributes.some(attribute =>
                    attribute.key
                        .toLowerCase()
                        .includes(this._filter.toLowerCase())
                ) ||
                (parseInt(this._filter) !== NaN &&
                    this._eventlogDataService
                        .getCaseId(event)
                        .toString()
                        .toLowerCase()
                        .includes(this._filter))
            );
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
