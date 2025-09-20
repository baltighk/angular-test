import { Component } from '@angular/core';
import { configuration } from '../../../configuration/configuration';
import {pelda_tasksConfiguration} from "./configurations";


@Component({
    selector: 'app-task4-a',
    templateUrl: './task4-a.component.html',
    styleUrls: ['./task4-a.component.less'],
    standalone: false
})
export class Task4AComponent {

    pieChartData: any[] = [];
    pieChartData2: any[] = [];
    view: [number, number] = [700, 400];

    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;


    columnChartData: any[] = [
        { name: '1', value: 2 },
        { name: '2', value: 5 },
        { name: '3', value: 10 },
        { name: '4', value: 8 },
        { name: '5', value: 6 },
        { name: 'Feladta és szégyenli magát', value: 1 },
    ];
    columnChartView: [number, number] = [700, 400];
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Jegy';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Tanulók száma';

    
    timelineChartData: any[] = [
        {
            name: 'Érdeklődés',
            series: [
                { name: '1. hét', value: 10 },
                { name: '2. hét', value: 9 },
                { name: '3. hét', value: 12 },
                { name: '4. hét', value: 7 },
                { name: '5. hét', value: 6 },
                { name: '6. hét', value: 10 },
                { name: '7. hét', value: 4 },
                { name: '8. hét', value: 7 },
                { name: '9. hét', value: 3 },
                { name: '10. hét', value: 1 },
            ],
        },
    ];
    timelineChartView: [number, number] = [800, 400];

    constructor() {
        this.pieChartData = configuration.slice(0, 10).map((task) => ({
            name: task.A.subTasks["1"].valueOf(),
            value: task.A.subTasks["3"].valueOf(),
        }));

        this.pieChartData2 = pelda_tasksConfiguration.slice(0, 10).map((task: { task: string; solvedSubtasks: number }) => ({
            name: task.task,
            value: task.solvedSubtasks,
        }));

    }
}