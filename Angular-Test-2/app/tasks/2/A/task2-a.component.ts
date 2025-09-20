import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CPUData, GPUData } from "../../../_entities/hardware";



@Component({
    selector: 'app-task2-a',
    templateUrl: './task2-a.component.html',
    styleUrls: ['./task2-a.component.less'],
    standalone: false
})
export class Task2AComponent {

  CPUs: CPUData[] = [
    { name: "Intel Core i9-13900K", score: 62000 },
    { name: "Intel Core i7-13700K", score: 54000 },
    { name: "Intel Core i5-13600K", score: 42000 },
    { name: "Intel Core i7-12700H", score: 36000 },
    { name: "Intel Core i5-12400F", score: 25000 },
    { name: "Intel Core i3-12100", score: 19000 },
    { name: "AMD Ryzen 9 7950X", score: 61000 },
    { name: "AMD Ryzen 9 7900X", score: 56000 },
    { name: "AMD Ryzen 7 7700X", score: 47000 },
    { name: "AMD Ryzen 5 7600", score: 39000 },
    { name: "AMD Ryzen 7 5800X", score: 34000 },
    { name: "AMD Ryzen 5 5600X", score: 27000 },
    { name: "Apple M2 Max", score: 45000 },
    { name: "Apple M2 Pro", score: 39000 },
    { name: "Apple M1", score: 17000 },
    { name: "Intel Core i7-1165G7", score: 12000 },
    { name: "Intel Core i5-1135G7", score: 9500 },
    { name: "AMD Ryzen 5 5500U", score: 8800 },
    { name: "Intel Core i5-10210U", score: 7600 },
    { name: "Intel Core i7-9700K", score: 15000 }
  ];

  GPUs: GPUData[] = [
    { name: 'NVIDIA GeForce RTX 4090', vramGB: 24 },
    { name: 'NVIDIA GeForce RTX 4070 Ti', vramGB: 12 },
    { name: 'NVIDIA GeForce RTX 3060', vramGB: 12 },
    { name: 'NVIDIA GeForce GTX 1650', vramGB: 4 },
    { name: 'AMD Radeon RX 7900 XTX', vramGB: 24 },
    { name: 'AMD Radeon RX 6800 XT', vramGB: 16 },
    { name: 'Intel Arc A770', vramGB: 16 },
    { name: 'AMD Radeon RX 6600', vramGB: 8 },
    { name: 'NVIDIA GeForce RTX 2060', vramGB: 6 },
    { name: 'NVIDIA GeForce GT 1030', vramGB: 2 }
  ];


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
        {
          cpu: [null, [Validators.required, this.validateCpuScore]],
          gpu: [null, [Validators.required, this.validateGpuVram]],
          rayTracing: [false, Validators.requiredTrue],
          ram: [null, [Validators.required, Validators.min(16)]],
          storage: [null, [Validators.required, Validators.min(100)]]
        },
        { validators: [this.customGpuValidation] }
    );
  }

  validateCpuScore(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value && value.score >= 14500 ? null : { scoreInvalid: true };
  }

  validateGpuVram(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value && value.vramGB >= 8 ? null : { vramInvalid: true };
  }

  customGpuValidation(group: FormGroup): ValidationErrors | null {
    const gpu = group.get('gpu')?.value;
    const rayTracing = group.get('rayTracing')?.value;

    if (gpu && rayTracing && gpu.vramGB < 4) {
      return { invalidGpuConfig: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      alert('A megadott adatok alapján futtatható a DOOM: The Dark Ages!');
    } else {
      alert('A megadott adatok alapján NEM futtatható a DOOM: The Dark Ages.');
    }
  }
}


