import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameFormatterPipe } from '../../../name-formatter.pipe';



@Component({
    selector: 'app-task3-a',
    templateUrl: './task3-a.component.html',
    styleUrls: ['./task3-a.component.less'],
    standalone: false
})
export class Task3AComponent {
    form: FormGroup;
    submittedData: any = null;


    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            title: [''],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            middleName: [''],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.submittedData = this.form.value;
            console.log('Az űrlap adatai:', this.form.value);
        } else {
            alert('Az űrlap hibás! Ellenőrizd az adatokat!');
            this.submittedData = null;
        }
    }


}

