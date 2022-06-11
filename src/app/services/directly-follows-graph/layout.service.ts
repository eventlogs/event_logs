import { Injectable } from '@angular/core';
import { Graph } from 'src/app/classes/directly-follows-graph/graph';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private readonly layerValues = [1, 2, 2, 3, 3, 4];
    private readonly positionValues = [160, 10, 310, 10, 310, 160];

    public layout(graph: Graph): void {
        let num: number = 0;

        graph.vertices.forEach(vertex => {
            let xValue: number = +this.layerValues[num % 6];
            xValue = +Math.floor(num / 6) + xValue;
            vertex.layer = this.layerValues[num % 6];
            vertex.position =
                this.positionValues[num % 6] + 510 * Math.floor(num / 6);
            num++;
        });
    }
}
