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
  screenDom: any;
  heightModal:any;
  widthModal:any;
  lastHovered:any;
  lastMouseMove: MouseEvent;
  lastTouchMove: TouchEvent;
  footerState: boolean;
  cursorPosition:any;
  myPropertyWidth:any;
  myPropertyIndent:any;
  openedPropertyState:boolean;
  coordinatesOfSections:Array<Array<Object>>;

  constructor(el: ElementRef, private dialogService:DialogService, private http: HttpClient, screen:ScreenService, navigation:NavigationService) {
    this.navigation = navigation;
    this.footerState = true;
    this.cursorPosition = {left:screen.screenWidth, top:screen.screenHeight};
    this.openedPropertyState = false;
  }
  showMyProperty() {
    if(this.openedPropertyState == false) {
      this.openedPropertyState = true;
      this.dialogService.addDialog(MyProperty, {
          height: this.heightModal,
          width: this.widthModal,
          headerHeight: this.headerHeight+"px"
        })
        .subscribe((isConfirmed) => {
          if (isConfirmed) {
          }
          else {
            this.openedPropertyState = false;
          }
        });
    }
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  isInsideRect(x, y, z1, z2, z3, z4) {
    let x1 = Math.min(z1, z3);
    let x2 = Math.max(z1, z3);
    let y1 = Math.min(z2, z4);
    let y2 = Math.max(z2, z4);
    if ((x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(!isUndefined(this.lastMouseMove) && this.navigation.mouseDown) {
      this.navigation.x += event.clientX - this.lastMouseMove.clientX;
      //console.log(event.clientX - this.lastMouseMove.clientX)
      this.navigation.y += event.clientY - this.lastMouseMove.clientY;
    }
    this.lastMouseMove = event;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if(!isUndefined(this.lastTouchMove)) {
      this.navigation.x += event.changedTouches[0].pageX- this.lastTouchMove.touches[0].pageX;
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
    this.navigation.mouseDown = true;
  }

  hideFooter():void {
    this.footerState = !this.footerState;
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
      this.lastHovered.style.filter = "brightness(0.89)";
    }

    let hovered = document.getElementById(id);
    hovered.style.filter = "brightness(1)";

    this.lastHovered = hovered;
  }

  moveMap():void {
    let width = parseInt(this.screenDom.width) * 1.5;
    let height = parseInt(this.screenDom.height) * 1.5;
    let cursorLeft = this.cursorPosition.left-2 * this.navigation.left;
    let cursorTop = this.cursorPosition.top-2 * this.navigation.top;

    for(var line in this.jsonSections) {
      for (var cell in this.jsonSections[line]) {
        this.jsonSections[line][cell].hide = false;
        if (!this.isInsideRect(this.coordinatesOfSections[line][cell].left, this.coordinatesOfSections[line][cell].top, cursorLeft - width, cursorTop - height, cursorLeft + width, cursorTop + height)) {
          if(this.jsonSections[line][cell] != {}) {
            this.jsonSections[line][cell].hide = true;
          }
        }
      }
    }
    console.log(this.jsonSections)
  }

  ngOnInit(): void {
    this.bodyDom = window.getComputedStyle(document.getElementsByTagName("body").item(0));
    this.screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.heightModal = parseFloat(this.bodyDom.height)*0.8 + 'px';
    this.widthModal = parseFloat(this.bodyDom.height)*0.9 + 'px';
    let headerDom = window.getComputedStyle(document.getElementsByClassName("header").item(0));
    this.headerHeight = parseFloat(headerDom.height);
    this.http.get('/assets/json/objects1.json').subscribe(data => {
      this.jsonSections = data;
      this.coordinatesOfSections = new Array<Array<Object>>();
      let startX = 410;
      let startY = 400;
      let xIncrement = 0;
      let yIncrement = 0;
      for(var line in this.jsonSections) {
        this.coordinatesOfSections[line] = new Array<Object>();
        for(var cell in this.jsonSections[line]) {
          if(this.jsonSections[line][cell].draw) {
            if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 5) {
              xIncrement = 790;
              yIncrement = 250;
            } else if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 2) {
              xIncrement = 300;
            } else if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 1) {
              xIncrement = 330;
              yIncrement = -90;
            } else if(this.jsonSections[line][cell].width == 1 && this.jsonSections[line][cell].height == 2) {
              xIncrement = 120;
              yIncrement = 60;
            }
            this.coordinatesOfSections[line][cell] = {
              left: startX + parseInt(cell) * 267 + parseInt(line) * 268 + xIncrement,
              top: startY - parseInt(cell) * 155 + parseInt(line) * 155 + yIncrement
            }
            xIncrement = 0;
            yIncrement = 0;
          } else {
            this.coordinatesOfSections[line][cell] = {};
          }
        }
      }
      console.log(this.coordinatesOfSections)
    });
  }
  ngAfterViewInit(): void {
    this.myPropertyWidth = parseFloat(window.getComputedStyle(document.getElementById("my-property")).width);
    let header1Width = parseFloat(window.getComputedStyle(document.getElementById("header1")).width);
    let header2Width = parseFloat(window.getComputedStyle(document.getElementById("header2")).width);
    let header3Width = parseFloat(window.getComputedStyle(document.getElementById("menu")).width);
    this.myPropertyIndent = header1Width + header2Width + header3Width;
  }
}
