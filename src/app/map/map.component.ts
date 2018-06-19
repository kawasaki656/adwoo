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
  lastHovered: any;
  lastMouseMove: MouseEvent;
  lastTouchMove: TouchEvent;
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
    if (!isUndefined(this.lastMouseMove) && this.navigation.mouseDown) {
      this.navigation.x += event.clientX - this.lastMouseMove.clientX;
      //console.log(event.clientX - this.lastMouseMove.clientX)
      this.navigation.y += event.clientY - this.lastMouseMove.clientY;
    }
    this.lastMouseMove = event;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!isUndefined(this.lastTouchMove)) {
      this.navigation.x += event.changedTouches[0].pageX - this.lastTouchMove.touches[0].pageX;
      this.navigation.y += event.changedTouches[0].pageY - this.lastTouchMove.touches[0].pageY;
    }
    this.lastTouchMove = event;
  }

  @HostListener('mouseup')
  onMouseup() {
    this.navigation.left += this.navigation.x - this.navigationTmp.x;
    this.navigation.top += this.navigation.y - this.navigationTmp.y;
    if (Math.abs(this.navigation.x - this.navigationTmp.x) > 10 && Math.abs(this.navigation.y - this.navigationTmp.y) > 10) {
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
    if (this.isAnimation) {
      this.navigation.mouseDown = true;
    }
  }

  hideFooter(): void {
    this.footerState = !this.footerState;
  }

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

  moveMap(event): void {
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
