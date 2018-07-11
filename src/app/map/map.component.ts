import {Component, ElementRef, OnInit, HostListener, Renderer} from '@angular/core';
import {NavigationService} from '../map/navigation.service';
import {ScreenService} from '../screen/screen.service';
import {DialogService} from 'ng2-bootstrap-modal';
import {MyProperty} from '../my-property/myProperty';
import {ObjectInformation} from '../objectInformation/objectInformation';
import {HttpClient} from '@angular/common/http';
import {isUndefined} from 'util';
import * as PIXI from 'pixi.js';
import * as Viewport from 'pixi-viewport/dist/viewport.js';
import { StartTips } from '../education/startTips/start.tips';

import MapElement from '../Classes/MapElement';
import ContactInformation from '../Classes/ContactInformation';
import { SuccessTip } from '../education/successTip/success.tip';
import { StartTipsManager } from '../services/startTipsManager';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../map/map.css', '../header/header.css', '../footer/footer.css', './map.component.css']
})
export class MapComponent implements OnInit {
  title = 'Adwoo';
  map: Array<Array<Object>>;
  headerHeight: Number;
  navigation: any;
  bodyDom: any;
  screen: any;
  screenDom: any;
  heightModal: any;
  widthModal: any;
  footerState: boolean;
  cursorPosition: any;
  myPropertyWidth: any;
  myPropertyIndent: any;
  openedPropertyState: boolean;
  isAnimation: boolean;
  widthScreen: number;
  heightScreen: number;
  navigationTmp: any;

  private static jsonSections: any;

  private static coordinatesOfSections: Array<Array<Object>>;
  private static coordinatesOfHorizontalRoad: Array<Array<Object>>;
  private static coordinatesOfVerticalRoad: Array<Array<Object>>;

  private static appPixi;

  private static createSprite(number, isRoad) {
    let info = new ContactInformation(number);
    let sprite = new MapElement(info);

    return sprite;
  }
  private static createRoadSprite(item, isHorizontal) {
    let info;
    let sprite;
    if(item.width === 1 && (item.height === 1 || item.height === 2) && isHorizontal) {
      info = new ContactInformation("Horizontal");
    } else if(item.width === 2 && (item.height === 1 || item.height === 2 || item.height === 5) && isHorizontal) {
      info = new ContactInformation("Horizontal_Long");
    } else if(item.height === 1 && !isHorizontal) {
      info = new ContactInformation("Vertical");
    } else if(item.height === 2 && !isHorizontal) {
      info = new ContactInformation("Vertical_Long");
    } else if(item.height === 5 && !isHorizontal) {
      info = new ContactInformation("Vertical_Very_Long");
    }

    sprite = new MapElement(info);

    return sprite;
  }

  private static create(json) {
    let baseLayer = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: window.innerWidth,
      worldHeight: window.innerHeight
    });

    //add roads
    for (let line in json) {
      for (let cell in json[line]) {
        if (json[line][cell]['draw']) {
          let horizontalSprite = MapComponent.createRoadSprite(json[line][cell], true);
          baseLayer.addChild(horizontalSprite);
        }
      }
    }

    //add roads
    for (let line in json) {
      for (let cell in json[line]) {
        if (json[line][cell]['draw']) {
          let verticalSprite = MapComponent.createRoadSprite(json[line][cell], false);
          baseLayer.addChild(verticalSprite);
        }
      }
    }

    for (let line in json) {
      for (let cell = json[line].length - 1; cell >= 0; cell--) {
        if (json[line][cell]['draw'] && json[line][cell]['width'] === 1 && json[line][cell]['height'] === 1) {
          let sprite = MapComponent.createSprite(json[line][cell].name, false);
          baseLayer.addChild(sprite);
        }
      }
    }

    for (let line in json) {
      for (let cell = json[line].length - 1; cell >= 0; cell--) {
        if (json[line][cell]['draw'] && (json[line][cell]['width'] > 1 || json[line][cell]['height'] > 1)) {
          let sprite = MapComponent.createSprite(json[line][cell].name, false);
          baseLayer.addChild(sprite);
        }
      }
    }

    return baseLayer;
  }

  private static setPositions(container) {
    let index = 0;

    for (let line in MapComponent.coordinatesOfHorizontalRoad) {
      for (let cell in MapComponent.coordinatesOfHorizontalRoad[line]) {
        if (MapComponent.jsonSections[line][cell]['draw']) {
          container.children[index].x = MapComponent.coordinatesOfHorizontalRoad[line][cell]['left'];
          container.children[index].y = MapComponent.coordinatesOfHorizontalRoad[line][cell]['top'];
          index++;
        }
      }
    }

    for (let line in MapComponent.coordinatesOfVerticalRoad) {
      for (let cell in MapComponent.coordinatesOfVerticalRoad[line]) {
        if (MapComponent.jsonSections[line][cell]['draw']) {
          container.children[index].x = MapComponent.coordinatesOfVerticalRoad[line][cell]['left'];
          container.children[index].y = MapComponent.coordinatesOfVerticalRoad[line][cell]['top'];
          index++;
        }
      }
    }

    for (let line in MapComponent.coordinatesOfSections) {
      for (let cell = MapComponent.coordinatesOfSections[line].length - 1; cell >= 0; cell--) {
        if (MapComponent.jsonSections[line][cell]['draw'] && MapComponent.jsonSections[line][cell]['width'] === 1 && MapComponent.jsonSections[line][cell]['height'] === 1) {
          container.children[index].x = MapComponent.coordinatesOfSections[line][cell]['left'];
          container.children[index].y = MapComponent.coordinatesOfSections[line][cell]['top'];
          index++;
        }
      }
    }

    for (let line in MapComponent.coordinatesOfSections) {
      for (let cell = MapComponent.coordinatesOfSections[line].length - 1; cell >= 0; cell--) {
        if (MapComponent.jsonSections[line][cell]['draw'] && (MapComponent.jsonSections[line][cell]['width'] > 1 || MapComponent.jsonSections[line][cell]['height'] > 1)) {
          container.children[index].x = MapComponent.coordinatesOfSections[line][cell]['left'];
          container.children[index].y = MapComponent.coordinatesOfSections[line][cell]['top'];
          index++;
        }
      }
    }

  }

  public static normalizePositions(container) {
    let bounds = container.parent ? container.parent._bounds : {};

    let offsetY = bounds.minY < 0 ? -bounds.minY : 0;
    let offsetX = bounds.minX < 0 ? -bounds.minY : 0;

    container.children.forEach(function (child) {
      child.x += offsetX;
      child.y += offsetY;
    });
  }

  private static defineLayers(container) {
    //Use layers
    //container.addChildAt(sprites[index], 0);
  }

  constructor(el: ElementRef, private dialogService: DialogService, private http: HttpClient, screen: ScreenService, navigation: NavigationService, private startTipsManager: StartTipsManager) {
    this.navigation = navigation;
    this.footerState = false;
    this.cursorPosition = {left: screen.screenWidth, top: screen.screenHeight};
    this.openedPropertyState = false;
    this.isAnimation = true;

    this.myPropertyIndent = 0;
    this.myPropertyWidth = 0;

    if (this.startTipsManager.isEducationNeeded()) {
      this.dialogService.addDialog(StartTips)
        .subscribe((e) => {
          this.dialogService.addDialog(ObjectInformation)
            .subscribe(() => {
              this.dialogService.addDialog(SuccessTip)
                .subscribe(() => {
                  this.startTipsManager.complite();
                })
            })
        })
    }
  }

  showMyProperty() {
    if (this.openedPropertyState == false) {
      this.openedPropertyState = true;
      this.dialogService.addDialog(MyProperty, {
        height: this.heightModal,
        width: this.widthModal,
        headerHeight: this.headerHeight + 'px'
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

  hideFooter(): void {
    this.footerState = !this.footerState;
  }

  //to rewrite for the web gl handler
  selectSection(section): void {
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

  ngOnInit(): void {
    this.myPropertyWidth = parseFloat(window.getComputedStyle(document.getElementById('my-property')).width);
    let header1Width = parseFloat(window.getComputedStyle(document.getElementById('header1')).width);
    let header2Width = parseFloat(window.getComputedStyle(document.getElementById('header2')).width);
    let header3Width = parseFloat(window.getComputedStyle(document.getElementById('menu')).width);

    this.myPropertyIndent = header1Width + header2Width + header3Width;
    this.navigationTmp = Object.assign({}, this.navigation);
    this.bodyDom = window.getComputedStyle(document.getElementsByTagName('body').item(0));
    this.screen = document.getElementsByClassName('screen').item(0);
    this.screenDom = window.getComputedStyle(this.screen);
    this.widthScreen = parseInt(this.screenDom.width);
    this.heightScreen = parseInt(this.screenDom.height);
    this.heightModal = parseFloat(this.bodyDom.height) * 0.8 + 'px';
    this.widthModal = parseFloat(this.bodyDom.height) * 0.9 + 'px';

    let headerDom = window.getComputedStyle(document.getElementsByClassName('header').item(0));
    this.headerHeight = parseFloat(headerDom.height);

    this.http.get('/assets/json/objects.json').subscribe(data => {
      MapComponent.jsonSections = data;
      MapComponent.coordinatesOfSections = new Array<Array<Object>>();
      MapComponent.coordinatesOfHorizontalRoad = new Array<Array<Object>>();
      MapComponent.coordinatesOfVerticalRoad = new Array<Array<Object>>();
      let startX = 0;
      let startY = 0;
      let xIncrement = 0;
      let yIncrement = 0;
      let xHRoadIncrement = 0;
      let yHRoadIncrement = 0;
      let xVRoadIncrement = 0;
      let yVRoadIncrement = 0;
      for (var line in MapComponent.jsonSections) {
        MapComponent.coordinatesOfSections[line] = new Array<Object>();
        MapComponent.coordinatesOfHorizontalRoad[line] = new Array<Object>();
        MapComponent.coordinatesOfVerticalRoad[line] = new Array<Object>();
        for (var cell in MapComponent.jsonSections[line]) {
          if (MapComponent.jsonSections[line][cell].draw) {
            if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 5) {
              xIncrement = 193;
              yIncrement = 134;
              xHRoadIncrement = 1066;
              yHRoadIncrement = 468;
              xVRoadIncrement = 40;
              yVRoadIncrement = 34;
            } else if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 2) {
              xIncrement = -77;
              yIncrement = -85;
              xHRoadIncrement = 263;
              yHRoadIncrement = 2;
              xVRoadIncrement = 3;
              yVRoadIncrement = 2;
            } else if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 1) {
              xIncrement = 138;
              yIncrement = -51;
              xHRoadIncrement = -4;
              yHRoadIncrement = -155;
              xVRoadIncrement = 0;
              yVRoadIncrement = 0;
            } else if (MapComponent.jsonSections[line][cell].width == 1 && MapComponent.jsonSections[line][cell].height == 2) {
              xIncrement = 130;
              yIncrement = -430;
              xHRoadIncrement = 267;
              yHRoadIncrement = 154;
              xVRoadIncrement = 3;
              yVRoadIncrement = 2;
            }
            MapComponent.coordinatesOfSections[line][cell] = {
              left: startX + parseInt(cell) * 267 + parseInt(line) * 268 + xIncrement,
              top: startY - parseInt(cell) * 155 + parseInt(line) * 155 + yIncrement
            };
            MapComponent.coordinatesOfHorizontalRoad[line][cell] = {
              left: 412 + parseInt(cell) * 267 + parseInt(line) * 268 + xHRoadIncrement,
              top: 408 - parseInt(cell) * 155 + parseInt(line) * 155 + yHRoadIncrement
            };
            MapComponent.coordinatesOfVerticalRoad[line][cell] = {
              left: 140 + parseInt(cell) * 267 + parseInt(line) * 268 + xVRoadIncrement,
              top: 406 - parseInt(cell) * 155 + parseInt(line) * 155 + yVRoadIncrement
            };
            xIncrement = 0;
            yIncrement = 0;
            xHRoadIncrement = 0;
            yHRoadIncrement = 0;
            xVRoadIncrement = 0;
            yVRoadIncrement = 0;
          } else {
            MapComponent.coordinatesOfSections[line][cell] = {};
            MapComponent.coordinatesOfHorizontalRoad[line][cell] = {};
            MapComponent.coordinatesOfVerticalRoad[line][cell] = {};
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {

    MapComponent.appPixi = new PIXI.Application({
      width: parseInt(this.bodyDom.width),
      height: parseInt(this.bodyDom.height),
      antialias: false,
      transparent: false,
      resolution: 1,
      autoResize: true
    });
    MapComponent.appPixi.renderer.backgroundColor = '413a43';

    this.screen.appendChild(MapComponent.appPixi.view);
    PIXI.loader
      .add('../assets/City_Objects/Block_1.png')
      .add('../assets/City_Objects/Block_2.png')
      .add('../assets/City_Objects/Block_3.png')
      .add('../assets/City_Objects/Block_4.png')
      .add('../assets/City_Objects/Block_5.png')
      .add('../assets/City_Objects/Block_6.png')
      .add('../assets/City_Objects/Block_7.png')
      .add('../assets/City_Objects/Block_8.png')
      .add('../assets/City_Objects/Block_9.png')
      .add('../assets/City_Objects/Block_10.png')
      .add('../assets/City_Objects/Block_11.png')
      .add('../assets/City_Objects/Block_12.png')
      .add('../assets/City_Objects/Block_13.png')
      .add('../assets/City_Objects/Block_14.png')
      .add('../assets/City_Objects/Block_15.png')
      .add('../assets/City_Objects/Block_16.png')
      .add('../assets/City_Objects/Block_17.png')
      .add('../assets/City_Objects/Block_18.png')
      .add('../assets/City_Objects/Block_19.png')
      .add('../assets/City_Objects/Block_23.png')
      .add('../assets/City_Objects/Block_24.png')
      .add('../assets/City_Objects/Block_25.png')
      .add('../assets/City_Objects/Block_26.png')
      .add('../assets/City_Objects/Block_27.png')
      .add('../assets/City_Objects/Block_28.png')
      .add('../assets/City_Objects/Block_30.png')
      .add('../assets/City_Objects/Block_31.png')
      .add('../assets/City_Objects/Block_32.png')
      .add('../assets/City_Objects/Block_33.png')
      .add('../assets/City_Objects/Block_34.png')
      .add('../assets/City_Objects/Block_35.png')
      .add('../assets/City_Objects/Block_36.png')
      .add('../assets/City_Objects/Block_37.png')
      .add('../assets/City_Objects/Block_38.png')
      .add('../assets/City_Objects/Block_39.png')
      .add('../assets/City_Objects/Block_Horizontal.png')
      .add('../assets/City_Objects/Block_Horizontal_Long.png')
      .add('../assets/City_Objects/Block_Vertical_Long.png')
      .add('../assets/City_Objects/Block_Vertical_Very_Long.png')
      .add('../assets/City_Objects/Block_Vertical.png')
      .load(this.setup);
  }

  setup(): void {
    let map = MapComponent.create(MapComponent.jsonSections);

    MapComponent.setPositions(map);

    MapComponent.appPixi.stage.addChild(map);

    map.worldHeight = map.parent.height;
    map.worldWidth = map.parent.width;

    const wheelConfig = {
      percent: 0.1
    };

    const mapSize = {
      height: map.parent.height,
      width: map.parent.width
    };

    const zoomConfig = {
      maxHeight: mapSize.height > 7000 ? 7000 : mapSize.height,
      minHeight: 1500,
      maxWidth: mapSize.width > 7000 ? 7000 : mapSize.width,
      minWidth: 3000
    };

    const bounceConfig = {
      time: 450
    };

    MapComponent.normalizePositions(map);

    map
      .moveCenter(mapSize.width / 2, mapSize.height / 2)
      .drag()
      .wheel(wheelConfig)
      .decelerate()
      .clampZoom(zoomConfig)
      .clamp()
      .bounce(bounceConfig);

    map.on('drag-start', () => {
      document.body.classList.add('disable-text-select');
    });

    map.on('drag-end', () => {
      document.body.classList.remove('disable-text-select');
    });

    //TODO: to handle click on the section
    map.on('clicked', (event) => {

    });

    window.onresize = () => {
      MapComponent.appPixi.renderer.resize(window.innerWidth, window.innerHeight);
    };
  }
}
