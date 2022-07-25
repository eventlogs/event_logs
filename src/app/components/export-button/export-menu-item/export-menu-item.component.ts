import { Component, EventEmitter, Input, Output } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-export-menu-item',
    templateUrl: './export-menu-item.component.html',
    styleUrls: ['./export-menu-item.component.scss'],
})
export class ExportMenuItemComponent {
    @Input() buttonText: string | undefined;
    @Input() fileContent: string = '';
    @Input() fileType: string = '';
    @Input() fileName: string = '';
    @Input() datePrefix: boolean = false;
    @Input() disabled: boolean = false;
    @Input() reimport: boolean = false;
    @Output() processReimport = new EventEmitter();

    constructor() {}

    processMouseClick(e: MouseEvent) {
        saveAs(
            new Blob([this.fileContent], { type: this.fileType }),
            (this.datePrefix ? new Date().toLocaleString() + '_' : '') +
                this.fileName
        );
        if (this.reimport) {
            this.processReimport.emit();
        }
    }
}
