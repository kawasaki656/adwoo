import { Component } from '@angular/core';
import { NavigationService } from "./navigation.service";
import {ScreenService} from "../screen/screen.service";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./map.css']
})
export class NavigationComponent {
  screen:any;
  navigation:any;
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
