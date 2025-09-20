import { Component, OnInit } from '@angular/core';
import {configuration} from "src/app/configuration/configuration";

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.less'],
    standalone: false
})
export class SummaryComponent implements OnInit {
  expectedResult: number = 0;
  images: Map<number, string> = new Map([
    [1, 'no.gif'],
    [2, 'cringe.gif'],
    [3, 'bad.mp4'],
    [4, 'okay.gif'],
    [5, 'good.gif'],
    [6, 'best.gif'],
  ]);
  maxPoints: number = configuration.length * 4;
  minRequiredPercentage: number = 0.4;
  thresholdDifference: number = 0.15;
  constructor() { }

  ngOnInit(): void {
    console.log('expectedResult', this.expectedResult);
    this.expectedResult = configuration.reduce((partialResult, task) => {
      const aPoints = Object.values(task.A.subTasks);
      const bPoints = Object.values(task.B.subTasks);
      if (aPoints > bPoints) {
        return partialResult +
          aPoints.filter(st => st).length +
          (bPoints.every(st => st) ? 1 : 0)
      } else {
        return partialResult +
          bPoints.filter(st => st).length +
          (aPoints.every(st => st) ? 1 : 0)
      }
    }, 0);
  }

}
