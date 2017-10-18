import {Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  leftNav: any;
  scale: number;
  left: number;
  top: number;
  constructor() {
    this.leftNav = document.getElementsByClassName("leftNav");
    //this.leftNav.addEventListener("click",()=>{console.log("click left navv")})
    this.left = 1;
    this.top = 2;
  }

  addEventHandlers(): void {
    this.leftNav = document.getElementsByClassName("leftNav")[0];
  }
}
