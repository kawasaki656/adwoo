import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  scale: number;
  left: number;
  top: number;
  x: number;
  y: number;
  deltaX:number;
  deltaY:number;
  mouseDown : boolean;
  constructor() {
    this.left = 1;
    this.top = 2;
    this.scale = 0.5;

    this.x = 0;
    this.y = 0;
    this.mouseDown = false;
  }
}
