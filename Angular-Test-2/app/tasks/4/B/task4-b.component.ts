import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-task4-b',
    templateUrl: './task4-b.component.html',
    styleUrls: ['./task4-b.component.less'],
    standalone: false
})
export class Task4BComponent {
    isModalVisible: boolean = false;
    imageChangedEvent: any = '';
    croppedImage: string = '';
    savedImage: string | null = '';
    errorMessage: string = '';

    constructor(private sanitizer: DomSanitizer) {

        this.savedImage = localStorage.getItem('croppedImage');
    }


    showModal(): void {
        this.isModalVisible = true;
        this.errorMessage = '';
    }


    handleCancel(): void {
        this.isModalVisible = false;
        this.imageChangedEvent = null;
        this.croppedImage = '';
    }


    saveCroppedImage(): void {
        if (this.croppedImage) {
            localStorage.setItem('croppedImage', this.croppedImage);
            this.savedImage = this.croppedImage;
            this.handleCancel();
        }
    }


    fileChangeEvent(event: any): void {
        console.log('Fájlfeltöltési esemény:', event);

        if (event.target.files && event.target.files.length > 0) {
            console.log('Fájl sikeresen kiválasztva:', event.target.files[0]);
            this.imageChangedEvent = event;
            this.errorMessage = '';
        } else {
            console.error('Fájlválasztás sikertelen!');
            this.errorMessage = 'Nem sikerült betölteni a képet!';
        }
    }

    onLoadImageFailed(): void {
        this.errorMessage = 'Nem sikerült betölteni a képet. Kérlek, ellenőrizd a fájl formátumát!';
    }

    onImageLoaded(): void {
        console.log('A kép sikeresen betöltődött!');
    }



    imageCropped(event: any): void {
        const { width, height } = event.imagePosition;
        if (width > 1920 || height > 1080) {
            this.errorMessage = 'A kép mérete túl nagy (Max: 1920x1080)!';
            return;
        }
        this.errorMessage = '';
        this.croppedImage = event.base64;
    }


    deleteImage(): void {
        localStorage.removeItem('croppedImage');
        this.savedImage = '';
    }
}