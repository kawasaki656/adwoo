import {Component, ElementRef, OnInit, HostListener} from '@angular/core';
import { NavigationService } from "./map/navigation.service";
import { ScreenService } from "./screen/screen.service";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "./addBlockModal/addBlockModal";
import { MyProperty } from "./my-property/myProperty";
import { ObjectInformation } from "./objectInformation/objectInformation";
import { HttpClient } from "@angular/common/http";
import {isUndefined} from "util";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit {
  jsonSections : any;
  title = 'Adwoo';
  map: Array<Array<Object>>;
  headerHeight: Number;
  navigation:any;
  bodyDom: any;
  heightModal:any;
  widthModal:any;
  lastHovered:any;
  lastMouseMove: MouseEvent;
  lastTouchMove: TouchEvent;

  constructor(el: ElementRef, private dialogService:DialogService, private http: HttpClient, screen:ScreenService, navigation:NavigationService) {
    this.navigation = navigation;
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

  showMyProperty() {
    this.dialogService.addDialog(MyProperty, {
      height: this.heightModal,
      width: this.widthModal
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        }
        else {
        }
      });
  }

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
  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    console.log(event)
    this.navigation.mouseDown = true;
  }

  selectSection(section):void {
    this.dialogService.addDialog(ObjectInformation, {
      height: this.heightModal,
      width: this.widthModal,
      name: section.name
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        }
        else {
        }
      });
  }

  hoverSection(id):void {
    if(this.lastHovered) {
      this.lastHovered.style.filter = "brightness(0.8)";
    }

    let hovered = document.getElementById(id);
    hovered.style.filter = "brightness(1)";

    this.lastHovered = hovered;
  }

  ngOnInit(): void {
    this.bodyDom = window.getComputedStyle(document.getElementsByTagName("body").item(0));
    this.heightModal = parseFloat(this.bodyDom.height)*0.7 + 'px';
    this.widthModal = parseFloat(this.bodyDom.height)*0.9 + 'px';
    let headerDom = window.getComputedStyle(document.getElementsByClassName("header").item(0));
    this.headerHeight = parseFloat(headerDom.height);
    this.http.get('/assets/json/objects.json').subscribe(data => {
      this.jsonSections = data;
    });
  }
}
