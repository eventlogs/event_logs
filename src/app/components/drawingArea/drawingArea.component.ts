import { Component } from '@angular/core';
import { DisplayComponent} from "../display/display.component";
import { DirectlyFollowsGraphComponent } from "../directly-follows-graph/directly-follows-graph.component";

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
