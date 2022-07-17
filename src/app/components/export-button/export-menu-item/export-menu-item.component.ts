import { Component, Input } from '@angular/core';
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

    constructor() {}

    processMouseClick(e: MouseEvent) {
        saveAs(
            new Blob([this.fileContent], { type: this.fileType }),
            (this.datePrefix ? new Date().toLocaleString() + '_' : '') +
                this.fileName
        );
    }
}
