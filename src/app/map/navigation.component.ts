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

  getTouchPos(canvasDom, touchEvent):Object {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
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
