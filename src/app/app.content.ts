import { Component, ElementRef, OnInit,  HostListener } from '@angular/core';
import { NavigationService } from "./map/navigation.service";
import { ScreenService } from "./screen/screen.service";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "./addBlockModal/addBlockModal";
import { HttpClient } from "@angular/common/http";
import {isUndefined} from "util";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit {
  jsonSections : any;
  sizemap:number;
  title = 'Adwoo';
  map: Array<Array<Object>>;
  mapHeight: string;
  mapWidth: string;
  navigation:any;
  lastMouseMove: MouseEvent;
  lastTouchMove: TouchEvent;
  constructor(el: ElementRef, private dialogService:DialogService, private http: HttpClient, screen:ScreenService, navigation:NavigationService) {
    this.navigation = navigation;
  }
  
  onMousemove(event: MouseEvent) {
    if(!isUndefined(this.lastMouseMove) && this.navigation.mouseDown) {
      this.navigation.x += event.clientX - this.lastMouseMove.clientX;
      console.log(event.clientX - this.lastMouseMove.clientX)
      this.navigation.y += event.clientY - this.lastMouseMove.clientY;
    }
    this.lastMouseMove = event;
  }
  
  onTouchMove(event: TouchEvent) {
    if(!isUndefined(this.lastTouchMove)) {
      this.navigation.x += event.changedTouches[0].pageX- this.lastTouchMove.touches[0].pageX;
      console.log(event)
      this.navigation.y += event.changedTouches[0].pageY - this.lastTouchMove.touches[0].pageY;
    }
    this.lastTouchMove = event;
  }
  onMouseup(event) {
    console.log("mouseUp")
    this.navigation.mouseDown = false;
  }
  onMousedown(event) {
    console.log("mouseDown")
    this.navigation.mouseDown = true;
  }

  click():void {
    console.log("CLICK CLICK CLICK")
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title: 'Add a new building',
        message: 'Confirm message'
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }
      });
  }

  selectSection(section): void {
    console.log(section);
  }

  ngOnInit(): void {
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    this.http.get('/assets/json/objects.json').subscribe(data => {
      this.jsonSections = data;
    });
  }
}
