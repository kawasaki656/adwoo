import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  scale: number;
  left: number;
  top: number;
  x: number;
  y: number;
  mouseDown : boolean;
  constructor() {
    this.left = -2650;
    this.top = 700;
    this.scale = 0.5;

    this.x = 0;
    this.y = 0;
    this.mouseDown = false;
  }
}
