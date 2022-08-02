import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter-area',
    templateUrl: './filter-area.component.html',
    styleUrls: ['./filter-area.component.scss'],
})
export class FilterAreaComponent {
    constructor() {}

    @Output() filterChanged = new EventEmitter();

    applyFilter(filterValue: string) {
        this.filterChanged.emit(filterValue);
    }
}
