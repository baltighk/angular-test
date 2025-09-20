import { Component } from '@angular/core';
import {RouterService} from "src/app/_services/router.service";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: false
})
export class AppComponent {
  title = 'choose-your-own-beadando';

  constructor(public routerService: RouterService) {
  }

}
