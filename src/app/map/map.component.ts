import {Component, ElementRef, OnInit, HostListener} from '@angular/core';
import { NavigationService } from "../map/navigation.service";
import { ScreenService } from "../screen/screen.service";
import { DialogService } from "ng2-bootstrap-modal";
import { MyProperty } from "../my-property/myProperty";
import { ObjectInformation } from "../objectInformation/objectInformation";
import { HttpClient } from "@angular/common/http";
import {isUndefined} from "util";
import * as PIXI from "pixi.js";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../map/map.css', '../header/header.css', '../footer/footer.css', './map.component.css']
})
export class MapComponent implements OnInit {
  jsonSections : any;
  title = 'Adwoo';
  map: Array<Array<Object>>;
  headerHeight: Number;
  navigation:any;
  bodyDom: any;
  screen: any;
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
  isAnimation: boolean;
  widthScreen: number;
  heightScreen: number;
  navigationTmp: any;

  private static appPixi;

  private static createContainer(sprites) {
    let container = new PIXI.Container();

    for(var index in sprites) {
      container.addChild(sprites[index]);
    }

    return container;
  }

  private static setPosition(container) {

  }

  private static defineLayers(container) {
    //Use layers
    //container.addChildAt(sprites[index], 0);
  }

  constructor(el: ElementRef, private dialogService:DialogService, private http: HttpClient, screen:ScreenService, navigation:NavigationService) {
    this.navigation = navigation;
    this.footerState = false;
    this.cursorPosition = {left:screen.screenWidth, top:screen.screenHeight};
    this.openedPropertyState = false;
    this.isAnimation = true;
    console.log(this);
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
    this.navigation.left+=this.navigation.x - this.navigationTmp.x;
    this.navigation.top+=this.navigation.y - this.navigationTmp.y;
    if(Math.abs(this.navigation.x - this.navigationTmp.x) > 10 && Math.abs(this.navigation.y - this.navigationTmp.y) > 10) {
      this.isAnimation = false;
    }
    this.navigationTmp.x = this.navigation.x;
    this.navigationTmp.y = this.navigation.y;
    this.navigation.mouseDown = false;
    setTimeout(() => {
      this.isAnimation = true;
    }, 2700);
  }
  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if(this.isAnimation) {
      this.navigation.mouseDown = true;
    }
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
  deleteHidedSections(cursorLeft, cursorTop, width, height) {
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
  }

  moveMap(event):void {
    /*let cursorLeft = this.cursorPosition.left-2 * (event.direction === 'left' ? event.value : this.navigation.left);
    let cursorTop = this.cursorPosition.top-2 * (event.direction === 'top' ? event.value : this.navigation.top);*/
    this.isAnimation = false;
    /*setTimeout(() => {
      this.deleteHidedSections(cursorLeft, cursorTop, this.widthScreen*2, this.heightScreen*2);
    }, 10);*/
    setTimeout(() => {
      this.isAnimation = true;
    }, 2500);
  }

  ngOnInit(): void {
    this.navigationTmp = Object.assign({}, this.navigation);
    this.bodyDom = window.getComputedStyle(document.getElementsByTagName("body").item(0));
    this.screen = document.getElementsByClassName("screen").item(0);
    this.screenDom = window.getComputedStyle(this.screen);
    this.widthScreen = parseInt(this.screenDom.width);
    this.heightScreen = parseInt(this.screenDom.height);
    this.heightModal = parseFloat(this.bodyDom.height)*0.8 + 'px';
    this.widthModal = parseFloat(this.bodyDom.height)*0.9 + 'px';
    let headerDom = window.getComputedStyle(document.getElementsByClassName("header").item(0));
    this.headerHeight = parseFloat(headerDom.height);
    this.http.get('/assets/json/objects.json').subscribe(data => {
      this.jsonSections = data;
      this.coordinatesOfSections = new Array<Array<Object>>();
      let startX = 0;
      let startY = 0;
      let xIncrement = 0;
      let yIncrement = 0;
      for(var line in this.jsonSections) {
        this.coordinatesOfSections[line] = new Array<Object>();
        for(var cell in this.jsonSections[line]) {
          if(this.jsonSections[line][cell].draw) {
            if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 5) {
              xIncrement = 193;
              yIncrement = 134;
            } else if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 2) {
              xIncrement = -77;
              yIncrement = -85;
            } else if(this.jsonSections[line][cell].width == 2 && this.jsonSections[line][cell].height == 1) {
              xIncrement = 138;
              yIncrement = -51;
            } else if(this.jsonSections[line][cell].width == 1 && this.jsonSections[line][cell].height == 2) {
              xIncrement = 130;
              yIncrement = -430;
            }
            this.coordinatesOfSections[line][cell] = {
              left: startX + parseInt(cell) * 267 + parseInt(line) * 268 + xIncrement,
              top: startY - parseInt(cell) * 155 + parseInt(line) * 155 + yIncrement
            };
            xIncrement = 0;
            yIncrement = 0;
          } else {
            this.coordinatesOfSections[line][cell] = {};
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.myPropertyWidth = parseFloat(window.getComputedStyle(document.getElementById("my-property")).width);
    let header1Width = parseFloat(window.getComputedStyle(document.getElementById("header1")).width);
    let header2Width = parseFloat(window.getComputedStyle(document.getElementById("header2")).width);
    let header3Width = parseFloat(window.getComputedStyle(document.getElementById("menu")).width);
    this.myPropertyIndent = header1Width + header2Width + header3Width;

    MapComponent.appPixi = new PIXI.Application({width:1200, height:800, antialias: false, transparent: false, resolution: 1});
    MapComponent.appPixi.renderer.backgroundColor = "413a43";

    this.screen.appendChild(MapComponent.appPixi.view);
    PIXI.loader
      .add("../assets/City_Objects/Block_1.png")
      .add("../assets/City_Objects/Block_2.png")
      .add("../assets/City_Objects/Block_3.png")
      .add("../assets/City_Objects/Block_4.png")
      .add("../assets/City_Objects/Block_5.png")
      .add("../assets/City_Objects/Block_6.png")
      .add("../assets/City_Objects/Block_7.png")
      .add("../assets/City_Objects/Block_8.png")
      .add("../assets/City_Objects/Block_9.png")
      .add("../assets/City_Objects/Block_10.png")
      .add("../assets/City_Objects/Block_11.png")
      .load(this.setup);
  }

  setup(): void {
    let sprite1 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_1.png"].texture
    );
    let sprite2 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_2.png"].texture
    );
    let sprite3 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_3.png"].texture
    );
    let sprite4 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_4.png"].texture
    );
    let sprite5 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_5.png"].texture
    );
    let sprite6 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_6.png"].texture
    );
    let sprite7 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_7.png"].texture
    );
    let sprite8 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_8.png"].texture
    );
    let sprite9 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_9.png"].texture
    );
    let sprite10 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_10.png"].texture
    );
    let sprite11 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_11.png"].texture
    );
    sprite1.name = "1"
    sprite2.name = "2"
    sprite3.name = "3"
    sprite4.name = "4"

    sprite1.x = 0;
    sprite1.y = 0;
    sprite2.x = 215;
    sprite2.y = 125;
    sprite3.x = 430;
    sprite3.y = 250;
    sprite4.x = 645;
    sprite4.y = 375;
    sprite5.x = 250;
    sprite5.y = -125;
    sprite6.x = 250;
    sprite6.y = -125;

    let sprites: Array<Object>;
    sprites = new Array();
    sprites.push(sprite5);
    sprites.push(sprite1);
    sprites.push(sprite2);
    sprites.push(sprite3);
    sprites.push(sprite4);
    console.log(sprite1);
    let map = MapComponent.createContainer(sprites);

    //map.x = 400;
    //map.y = 400;

    map.localTransform.scale(0.5, 0.5);


    MapComponent.appPixi.stage.addChild(map);

  }
}
