import {Component, Input} from '@angular/core';

@Component({
    selector: 'upload-button',
    templateUrl: './upload-button.component.html',
    styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {

    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    uploadedFile: File | undefined;

    constructor() {
    }

    prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    hoverStart(e: MouseEvent) {
        this.prevent(e);
        const target = (e.target as HTMLElement);
        target.classList.add('mouse-hover');
    }

    hoverEnd(e: MouseEvent) {
        this.prevent(e);
        const target = (e.target as HTMLElement);
        target.classList.remove('mouse-hover');
    }

    handleFileInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;
        console.log(files);
        let fileReader = new FileReader();
        fileReader.onload = () => {
            console.log(fileReader.result);
        }
        fileReader.readAsText(files[0]);
    }

}
