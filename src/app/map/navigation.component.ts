import {Component, HostListener} from '@angular/core';
import { NavigationService } from "./navigation.service";
import {ScreenService} from "../screen/screen.service";
import {isUndefined} from "util";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./map.css']
})
export class NavigationComponent {
  screen:any;
  navigation:any;
  lastMouseMove: MouseEvent;
  lastTouchMove: TouchEvent;

  getTouchPos(canvasDom, touchEvent):Object {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }
  /*
  STYLES for the first figure
   width: 117px;
   height: 106px;
   background: green;
   transform: rotate(30deg) skew(-31deg);
   position: absolute;
   left: 149px;
   top: 159px;
  */

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(!isUndefined(this.lastMouseMove) && this.navigation.mouseDown) {
      this.navigation.x += event.clientX - this.lastMouseMove.clientX;
      console.log(event.clientX - this.lastMouseMove.clientX)
      this.navigation.y += event.clientY - this.lastMouseMove.clientY;
    }
    this.lastMouseMove = event;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if(!isUndefined(this.lastTouchMove)) {
      this.navigation.x += event.changedTouches[0].pageX- this.lastTouchMove.touches[0].pageX;
      console.log(event)
      this.navigation.y += event.changedTouches[0].pageY - this.lastTouchMove.touches[0].pageY;
    }
    this.lastTouchMove = event;
  }
  @HostListener('mouseup')
  onMouseup() {
    this.navigation.mouseDown = false;
  }
  @HostListener('mousedown')
  onMousedown() {
    this.navigation.mouseDown = true;
  }
  constructor(navigation:NavigationService, screen:ScreenService) {
    this.screen = screen;
    this.navigation = navigation;
  }

  navRight():void {
    this.navigation.left -= this.screen.screenWidth/2;
  }
  navLeft():void {
    this.navigation.left += this.screen.screenWidth/2;
  }
  navTop():void {
    this.navigation.top += this.screen.screenHeight/2;
  }
  navBottom():void {
    this.navigation.top -= this.screen.screenHeight/2;
  }
}
