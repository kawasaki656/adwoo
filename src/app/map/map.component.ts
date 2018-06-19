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

  private static appPixi;

  private static createSprite(number) {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources['../assets/City_Objects/Block_' + number + '.png'].texture
    );

    return sprite;
  }

  private static create(json) {
    let baseLayer = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: window.innerWidth,
      worldHeight: window.innerHeight
    });

    for (let line in json) {
      for (let cell in json[line]) {
        if (json[line][cell]['draw']) {
          let sprite = MapComponent.createSprite(json[line][cell].name);
          baseLayer.addChild(sprite);
        }
      }
    }

    return baseLayer;
  }

  private static setPositions(container) {
    let index = 0;
    for (let line in MapComponent.coordinatesOfSections) {
      for (let cell in MapComponent.coordinatesOfSections[line]) {
        if (MapComponent.jsonSections[line][cell]['draw']) {
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
    })

    console.log(offsetY)
  }

  private static defineLayers(container) {
    //Use layers
    //container.addChildAt(sprites[index], 0);
  }

  constructor(el: ElementRef, private dialogService: DialogService, private http: HttpClient, screen: ScreenService, navigation: NavigationService) {
    this.navigation = navigation;
    this.footerState = false;
    this.cursorPosition = {left: screen.screenWidth, top: screen.screenHeight};
    this.openedPropertyState = false;
    this.isAnimation = true;

    this.myPropertyIndent = 0;
    this.myPropertyWidth = 0;
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
      let startX = 0;
      let startY = 0;
      let xIncrement = 0;
      let yIncrement = 0;
      for (var line in MapComponent.jsonSections) {
        MapComponent.coordinatesOfSections[line] = new Array<Object>();
        for (var cell in MapComponent.jsonSections[line]) {
          if (MapComponent.jsonSections[line][cell].draw) {
            if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 5) {
              xIncrement = 193;
              yIncrement = 134;
            } else if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 2) {
              xIncrement = -77;
              yIncrement = -85;
            } else if (MapComponent.jsonSections[line][cell].width == 2 && MapComponent.jsonSections[line][cell].height == 1) {
              xIncrement = 138;
              yIncrement = -51;
            } else if (MapComponent.jsonSections[line][cell].width == 1 && MapComponent.jsonSections[line][cell].height == 2) {
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
      .load(this.setup);
  }

  setup(): void {
    let map = MapComponent.create(MapComponent.jsonSections);

    MapComponent.setPositions(map);

    MapComponent.appPixi.stage.addChild(map);

    map.worldHeight = map.parent.height;
    map.worldWidth = map.parent.width;

    const wheelConfig = {
      percent: 0.03
    };

    const mapSize = {
      height: map.parent.height,
      width: map.parent.width
    };

    const zoomConfig = {
      maxHeight: mapSize.height > 10000 ? 10000 : mapSize.height,
      minHeight: 800,
      maxWidth: mapSize.width > 10000 ? 10000 : mapSize.width,
      minWidth: 1600
    };

    MapComponent.normalizePositions(map);

    map
      .drag()
      .wheel(wheelConfig)
      .decelerate()
      .clampZoom(zoomConfig)
      .clamp()
      .bounce();

    window.onresize = () => {
      MapComponent.appPixi.renderer.resize(window.innerWidth, window.innerHeight);
    };
  }
}
