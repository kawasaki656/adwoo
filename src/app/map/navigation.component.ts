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
  lastMove: MouseEvent;

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(!isUndefined(this.lastMove) && this.navigation.mouseDown) {
      this.navigation.x += event.clientX - this.lastMove.clientX;
      this.navigation.y += event.clientY - this.lastMove.clientY;
    }
    this.lastMove = event;
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
