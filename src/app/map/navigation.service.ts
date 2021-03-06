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
    this.left = 0;
    this.top = 0;
    this.scale = .5;

    this.x = 0;
    this.y = 0;
    this.mouseDown = false;
  }
}
