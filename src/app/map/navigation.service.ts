import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  leftNav: any;
  constructor() {
    console.log("Navigation Service Constructor")
    this.leftNav = document.getElementsByClassName("leftNav")[0];
  }

  addEventHandlers(): void {
    this.leftNav = document.getElementsByClassName("leftNav")[0];
    console.log(this.leftNav)
  }
}
