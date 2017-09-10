import {Component, ElementRef, OnInit, Input, AfterViewInit} from '@angular/core';
import { NavigationService } from "./map/navigation.service";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit, AfterViewInit{

  sizemap:number;
  title = 'Adwoo';
  screenHeight: number;
  screenWidth: number;
  map: Array<Array<Object>>;
  mapHeight: string;
  mapWidth: string;
  headerIconHeight: string;
  navigation: any;
  navigationX: number;
  navigationY: number;
  constructor(el: ElementRef, navigation:NavigationService) {
    this.navigation = navigation;
    this.navigationX = 0;
    this.navigationY = -30;
  }

  navRight():void {
    this.navigationX -= this.screenWidth/2;
  }
  navLeft():void {
    this.navigationX += this.screenWidth/2;
  }
  navTop():void {
    this.navigationY += this.screenHeight/2;
  }
  navBottom():void {
    this.navigationY -= this.screenHeight/2;
  }


  animate(draw, duration):void {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    var timePassed = time - start;

    if (timePassed > duration) {
      timePassed = duration;
    }
    draw(timePassed);

    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }

  });
}


  ngAfterViewInit(): void {
    let outerThis = this;
    this.headerIconHeight = window.getComputedStyle(document.getElementsByClassName("icon").item(0)).height;
    this.navigation.addEventHandlers();
    let leftOffset = -500;
    /*setInterval(()=>{
      leftOffset--;
      this.leftOffsetWrap = leftOffset + 'px'
    }, 20)*/
    /*
    let i = -600;
    let last=0;
    this.animate((a)=> {
      if((a-last) < 20 && (a-last)>10) {
        console.log(a - last);
        i-=40/(a-last);
        outerThis.leftOffsetWrap = i + "px"
      }
      last = a;
    }, 3000)*/

  }
  ngOnInit(): void {
    this.fillMap();
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    //console.log(window.getComputedStyle(document.getElementsByClassName("map").item(0)))
  }
  fillMap():void {
    this.sizemap = 10;
    this.map = new Array();
    for(let i=0; i<this.sizemap; i++) {
      this.map.push(new Array());
      for(let j=0; j<this.sizemap; j++) {
        this.map[i].push(new Array());
      }
    }
    for(let i=0; i<this.sizemap; i++) {
      for(let j=0; j<this.sizemap; j++) {
        this.map[i][j] = '../assets/City_Objects/Block_0' + (Math.floor(Math.random() * 7)+1) + '.png';
      }
    }
    console.log(this.map)
  }
}
