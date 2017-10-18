import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  scale: number;
  left: number;
  top: number;
  constructor() {
    this.left = 1;
    this.top = 2;
    this.scale = 0.5;
  }
}
