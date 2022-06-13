import { Component } from '@angular/core';

@Component({
    selector: 'app-drawing-area',
    templateUrl: './drawingArea.component.html',
    styleUrls: ['./drawingArea.component.scss'],
})
export class DrawingAreaComponent {

    switchView() {
        console.log("switch...");
    }

}
