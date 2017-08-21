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
  cellHeight: number;
  cellWidth: number;
  map: Array<Array<Object>>;
  rotateMap: number;
  mapHeight: string;
  mapWidth: string;
  headerIconHeight: string;
  leftOffsetWrap: string = "-500px";
  navigation: any;
  constructor(el: ElementRef, navigation:NavigationService) {
    this.navigation = navigation;
  }
  ngAfterViewInit(): void {
    this.headerIconHeight = window.getComputedStyle(document.getElementsByClassName("icon").item(0)).height;
    this.navigation.addEventHandlers();
    let leftOffset = -500;
    /*setInterval(()=>{
      leftOffset--;
      this.leftOffsetWrap = leftOffset + 'px'
    }, 20)*/
  }
  ngOnInit(): void {
    this.fillMap();
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.cellHeight = 350;
    this.cellWidth = 283;
    this.rotateMap = -30;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    //console.log(window.getComputedStyle(document.getElementsByClassName("map").item(0)))
  }
  fillMap():void {
    this.sizemap = 9;
    this.map = new Array();
    for(let i=0; i<this.sizemap; i++) {
      this.map.push(new Array());
      for(let j=0; j<this.sizemap; j++) {
        this.map[i].push(new Array());
      }
    }
  }
}
