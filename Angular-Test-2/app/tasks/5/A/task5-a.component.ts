import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { parse as parseYaml } from 'yaml';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-task5-a',
    templateUrl: './task5-a.component.html',
    standalone: false,
    styleUrls: ['./task5-a.component.less']
})
export class Task5AComponent implements OnInit {
    yamlFiles = ['config-default.yaml', 'config-course.yaml', 'config-user.yaml'];
    file1Content: any = {};
    file2Content: any = {};
    file3Content: any = {};
    mergedObject: any = {};

    constructor(private http: HttpClient) {}

    ngOnInit(): void {

        const requests = this.yamlFiles.map(file => this.http.get(`assets/yamls/${file}`, { responseType: 'text' }));

        forkJoin(requests).subscribe(responses => {

            this.file1Content = parseYaml(responses[0]);
            this.file2Content = parseYaml(responses[1]);
            this.file3Content = parseYaml(responses[2]);

            console.log('config-default.yaml:', this.file1Content);
            console.log('config-course.yaml:', this.file2Content);
            console.log('config-user.yaml:', this.file3Content);


            this.mergeYamlObjects();
        });
    }


    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.yamlFiles, event.previousIndex, event.currentIndex);
        this.mergeYamlObjects();
    }


    mergeYamlObjects(): void {
        this.mergedObject = this.yamlFiles.reduce((merged, file) => {
            let content = {};
            if (file === 'config-default.yaml') content = this.file1Content;
            if (file === 'config-course.yaml') content = this.file2Content;
            if (file === 'config-user.yaml') content = this.file3Content;

            return { ...merged, ...content };
        }, {});

        //console.log('Összefűzött Object:', this.mergedObject);
    }
}