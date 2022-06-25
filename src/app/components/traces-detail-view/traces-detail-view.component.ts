import { AfterViewInit, Attribute, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EventLogAttribute } from 'src/app/classes/EventLog/eventlogattribute';
import { Trace } from 'src/app/classes/EventLog/trace';
import { DisplayService } from 'src/app/services/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { TracesDetailViewDataSource } from './traces-detail-view-datasource';

@Component({
    selector: 'app-traces-detail-view',
    templateUrl: './traces-detail-view.component.html',
    styleUrls: ['./traces-detail-view.component.scss'],
})
export class TracesDetailViewComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<Trace>;
    dataSource: TracesDetailViewDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns: string[] = [];

    constructor(
        private _eventlogDataService: EventlogDataService,
        private _displayService: DisplayService
    ) {
        this.dataSource = new TracesDetailViewDataSource(
            _eventlogDataService,
            _displayService
        );
        this.displayedColumns = this.dataSource.getColumns();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    public getAttributeValue(
        attributes: Array<EventLogAttribute>,
        key: string
    ): any {
        return attributes.filter(attr => attr.key === key)[0].value;
    }
}
