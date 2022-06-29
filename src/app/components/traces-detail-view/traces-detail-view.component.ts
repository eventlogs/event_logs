import { AfterViewInit, Attribute, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
    EventLogAttribute,
    StringAttribute,
} from 'src/app/classes/EventLog/eventlogattribute';
import { DisplayService } from 'src/app/services/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { TracesDetailViewDataSource } from './traces-detail-view-datasource';
import { Event } from 'src/app/classes/EventLog/event';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-traces-detail-view',
    templateUrl: './traces-detail-view.component.html',
    styleUrls: ['./traces-detail-view.component.scss'],
})
export class TracesDetailViewComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<Event>;
    dataSource: TracesDetailViewDataSource;
    subscription: Subscription; //TODO schließen der Subscription

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns: string[] = [];

    refresh(): void {
        console.log('refresh');
    }

    constructor(
        private _eventlogDataService: EventlogDataService,
        private _displayService: DisplayService
    ) {
        this.dataSource = new TracesDetailViewDataSource(
            _eventlogDataService,
            _displayService
        );
        this.displayedColumns = this.dataSource.getColumns();
        this.subscription =
            this._displayService.selectedTraceCaseIds$.subscribe(num => {
                this.dataSource.loadData(num);
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    public getCaseId(event: Event): number {
        for (let trace of this._eventlogDataService.eventLog.traces) {
            if (trace.events.includes(event)) {
                return trace.caseId;
            }
        }
        return 0;
    }

    public getAttributeValue(
        attributes: Array<EventLogAttribute>,
        key: string
    ): any {
        return attributes.filter(attr => attr.key === key).length
            ? attributes.filter(attr => attr.key === key)[0].value
            : '';
    }
}
