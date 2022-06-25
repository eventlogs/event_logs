import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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
    displayedColumns = ['caseId', 'activity'];

    constructor(
        private _eventlogDataService: EventlogDataService,
        private _displayServie: DisplayService
    ) {
        this.dataSource = new TracesDetailViewDataSource(
            _eventlogDataService,
            _displayServie
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}
