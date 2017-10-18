import {Injectable} from '@angular/core';

@Injectable()
export class ScreenService {
  screenHeight: number;
  screenWidth: number;
  constructor() {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
  }

}
