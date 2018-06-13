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
  isAnimation: boolean;
  widthScreen: number;
  heightScreen: number;
  navigationTmp: any;

  private static jsonSections : any;

  private static coordinatesOfSections:Array<Array<Object>>;

  private static appPixi;

  private static createContainer(json, sprites) {
    let container = new PIXI.Container();
    let i=0;

    for(let line in json) {
      for (let cell in json[line]) {
        container.addChildAt(Object.create(sprites[parseInt(json[line][cell].name)]), i);
      }
    }
    return container;
  }

  private static setPositions(container) {
    //console.log(MapComponent.jsonSections)
    //console.log(MapComponent.coordinatesOfSections)
    console.log(container)
    let index = 0;
    for(let line in MapComponent.coordinatesOfSections) {
      for(let cell in MapComponent.coordinatesOfSections[line]) {
        //if(MapComponent.jsonSections[line][cell]["draw"]) {
          if (MapComponent.coordinatesOfSections[line][cell]["left"]) {
            container.children[index].x = MapComponent.coordinatesOfSections[line][cell]["left"];
            container.children[index].y = MapComponent.coordinatesOfSections[line][cell]["top"];
          }
        //}
        index++;
      }
    }

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

    this.myPropertyIndent = 0;
    this.myPropertyWidth = 0;
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
    this.myPropertyWidth = parseFloat(window.getComputedStyle(document.getElementById("my-property")).width);
    let header1Width = parseFloat(window.getComputedStyle(document.getElementById("header1")).width);
    let header2Width = parseFloat(window.getComputedStyle(document.getElementById("header2")).width);
    let header3Width = parseFloat(window.getComputedStyle(document.getElementById("menu")).width);
    this.myPropertyIndent = header1Width + header2Width + header3Width;
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
      MapComponent.jsonSections = data;
      MapComponent.coordinatesOfSections = new Array<Array<Object>>();
      let startX = 0;
      let startY = 0;
      let xIncrement = 0;
      let yIncrement = 0;
      for(var line in MapComponent.jsonSections) {
        MapComponent.coordinatesOfSections[line] = new Array<Object>();
        for(var cell in MapComponent.jsonSections[line]) {
          if(MapComponent.jsonSections[line][cell].draw) {
            if(MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 5) {
              xIncrement = 193;
              yIncrement = 134;
            } else if(MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 2) {
              xIncrement = -77;
              yIncrement = -85;
            } else if(MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 1) {
              xIncrement = 138;
              yIncrement = -51;
            } else if(MapComponent.jsonSections[line][cell].width == 1 && MapComponent.jsonSections[line][cell].height == 2) {
              xIncrement = 130;
              yIncrement = -430;
            }
            MapComponent.coordinatesOfSections[line][cell] = {
              left: startX + parseInt(cell) * 267 + parseInt(line) * 268 + xIncrement,
              top: startY - parseInt(cell) * 155 + parseInt(line) * 155 + yIncrement
            };
            xIncrement = 0;
            yIncrement = 0;
          } else {
            MapComponent.coordinatesOfSections[line][cell] = {};
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {

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
      .add("../assets/City_Objects/Block_12.png")
      .add("../assets/City_Objects/Block_13.png")
      .add("../assets/City_Objects/Block_14.png")
      .add("../assets/City_Objects/Block_15.png")
      .add("../assets/City_Objects/Block_16.png")
      .add("../assets/City_Objects/Block_17.png")
      .add("../assets/City_Objects/Block_18.png")
      .add("../assets/City_Objects/Block_19.png")
      .add("../assets/City_Objects/Block_23.png")
      .add("../assets/City_Objects/Block_24.png")
      .add("../assets/City_Objects/Block_25.png")
      .add("../assets/City_Objects/Block_26.png")
      .add("../assets/City_Objects/Block_27.png")
      .add("../assets/City_Objects/Block_28.png")
      .add("../assets/City_Objects/Block_30.png")
      .add("../assets/City_Objects/Block_31.png")
      .add("../assets/City_Objects/Block_32.png")
      .add("../assets/City_Objects/Block_33.png")
      .add("../assets/City_Objects/Block_34.png")
      .add("../assets/City_Objects/Block_35.png")
      .add("../assets/City_Objects/Block_36.png")
      .add("../assets/City_Objects/Block_37.png")
      .add("../assets/City_Objects/Block_38.png")
      .add("../assets/City_Objects/Block_39.png")
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
    let sprite12 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_12.png"].texture
    );
    let sprite13 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_13.png"].texture
    );
    let sprite14 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_14.png"].texture
    );
    let sprite15 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_15.png"].texture
    );
    let sprite16 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_16.png"].texture
    );
    let sprite17 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_17.png"].texture
    );
    let sprite18 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_18.png"].texture
    );
    let sprite19 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_19.png"].texture
    );
    let sprite23 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_23.png"].texture
    );
    let sprite24 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_24.png"].texture
    );
    let sprite25 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_25.png"].texture
    );
    let sprite26 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_26.png"].texture
    );
    let sprite27 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_27.png"].texture
    );
    let sprite28 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_28.png"].texture
    );
    let sprite30 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_30.png"].texture
    );
    let sprite31 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_31.png"].texture
    );
    let sprite32 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_32.png"].texture
    );
    let sprite33 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_33.png"].texture
    );
    let sprite34 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_34.png"].texture
    );
    let sprite35 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_35.png"].texture
    );
    let sprite36 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_36.png"].texture
    );
    let sprite37 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_37.png"].texture
    );
    let sprite38 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_38.png"].texture
    );
    let sprite39 = new PIXI.Sprite(
      PIXI.loader.resources["../assets/City_Objects/Block_39.png"].texture
    );

    /*
    sprite1.name = "1"
    sprite2.name = "2"
    sprite3.name = "3"
    sprite4.name = "4"
    */

    /*sprite1.x = 0;
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
    sprite6.y = -125;*/

    let sprites: Array<Object>;
    sprites = new Array();
    sprites.push({});
    sprites.push(sprite1);
    sprites.push(sprite2);
    sprites.push(sprite3);
    sprites.push(sprite4);
    sprites.push(sprite5);
    sprites.push(sprite6);
    sprites.push(sprite7);
    sprites.push(sprite8);
    sprites.push(sprite9);
    sprites.push(sprite10);
    sprites.push(sprite11);
    sprites.push(sprite12);
    sprites.push(sprite13);
    sprites.push(sprite14);
    sprites.push(sprite15);
    sprites.push(sprite16);
    sprites.push(sprite17);
    sprites.push(sprite18);
    sprites.push(sprite19);
    sprites.push({});
    sprites.push({});
    sprites.push({});
    sprites.push(sprite23);
    sprites.push(sprite24);
    sprites.push(sprite25);
    sprites.push(sprite26);
    sprites.push(sprite27);
    sprites.push(sprite28);
    sprites.push({});
    sprites.push(sprite30);
    sprites.push(sprite31);
    sprites.push(sprite32);
    sprites.push(sprite33);
    sprites.push(sprite34);
    sprites.push(sprite35);
    sprites.push(sprite36);
    sprites.push(sprite37);
    sprites.push(sprite38);
    sprites.push(sprite39);

    let map = MapComponent.createContainer(MapComponent.jsonSections, sprites);
    MapComponent.setPositions(map);

    //map.x = 400;
    //map.y = 400;

    map.localTransform.scale(0.5, 0.5);


    MapComponent.appPixi.stage.addChild(map);

  }
}
