import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
    DateAttribute,
    EventLogAttribute,
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
export class TracesDetailViewComponent implements AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<Event>;
    dataSource: TracesDetailViewDataSource;
    subscription: Subscription;

    private readonly MAX_LETTERS_TABLE_ENTRY_WITHOUT_WHITE_SPACE = 20;
    private readonly MAX_LETTERS_TABLE_ENTRY_TOTAL = 120;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns: string[] = [];

    constructor(
        public _eventlogDataService: EventlogDataService,
        private _displayService: DisplayService
    ) {
        this.dataSource = new TracesDetailViewDataSource(_eventlogDataService);
        this.displayedColumns = this.dataSource.getColumns();
        this.subscription =
            this._displayService.selectedTraceCaseIds$.subscribe(value => {
                this.refresh();
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public refresh(): void {
        this.displayedColumns = this.dataSource.getColumns();
        this.dataSource.refreshData();
    }

    public getAttributeValue(
        attributes: Array<EventLogAttribute>,
        key: string
    ): any {
        if (attributes.filter(attr => attr.key === key).length == 0) {
            return '';
        }
        let attribute = attributes.filter(attr => attr.key === key)[0];
        if (attribute instanceof DateAttribute) {
            return attribute.value.toLocaleDateString('de-De', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        }
        return attribute.value;
    }

    public trimValue(value: any) {
        if (value == null) {
            return value;
        }

        const stringParts = value.toString().split(/(\s+)/);

        let result = '';
        for (let i = 0; i < stringParts.length; i++) {
            const stringPart = stringParts[i];
            if (
                stringPart.length >
                this.MAX_LETTERS_TABLE_ENTRY_WITHOUT_WHITE_SPACE
            ) {
                result +=
                    stringPart.substring(
                        0,
                        this.MAX_LETTERS_TABLE_ENTRY_WITHOUT_WHITE_SPACE - 1
                    ) + '...';
                break;
            }
            result = result.concat(stringPart);
        }

        if (result.length > this.MAX_LETTERS_TABLE_ENTRY_TOTAL) {
            return (
                result.substring(0, this.MAX_LETTERS_TABLE_ENTRY_TOTAL - 1) +
                '...'
            );
        }

        return result;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
