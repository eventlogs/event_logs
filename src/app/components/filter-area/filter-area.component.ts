import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';

export class FilterArgument {
    constructor(
        public filterValue: string,
        public filterActivity: boolean,
        public filterAttributeValues: boolean
    ) {}
}

@Component({
    selector: 'app-filter-area',
    templateUrl: './filter-area.component.html',
    styleUrls: ['./filter-area.component.scss'],
})
export class FilterAreaComponent {
    constructor() {}

    @Output() filterChanged = new EventEmitter();

    _filterActivity: boolean = true;
    _filterAttributeValues: boolean = false;
    _filterUsed: boolean = false;
    _filterValue: string = '';

    toggleFilter($event: MatButtonToggleChange) {
        this._filterUsed = $event.source.checked;
        if (this._filterUsed) {
            this.filterChanged.emit(
                new FilterArgument(
                    this._filterValue,
                    this._filterActivity,
                    this._filterAttributeValues
                )
            );
        } else {
            this.filterChanged.emit(new FilterArgument('', false, false));
        }
    }

    toggleActivity($event: MatCheckboxChange) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterAttributeValues = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues
            )
        );
    }

    toggleValues($event: MatCheckboxChange) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterActivity = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues
            )
        );
    }

    applyFilter(filterValue: string) {
        this._filterValue = filterValue;
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues
            )
        );
    }
}
