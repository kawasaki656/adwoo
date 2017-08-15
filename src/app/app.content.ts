import {Component, ElementRef, OnInit, Input, AfterViewInit} from '@angular/core';

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
  leftOffsetBlock: string;
  ngAfterViewInit(): void {
    this.headerIconHeight = window.getComputedStyle(document.getElementsByClassName("icon").item(0)).height;
    //$('#box').width()*Math.cos(rotationAngle) + $('#box').height()*Math.sin(rotationAngle)
    console.log(window.getComputedStyle(document.getElementsByClassName("line").item(0)))
    console.log(window.getComputedStyle(document.getElementsByClassName("line invisible").item(0)).width)
  }
  ngOnInit(): void {
    this.fillMap();
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.cellHeight = this.screenHeight / 3;
    this.cellWidth = this.screenWidth / 4;
    this.rotateMap = -30;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    //console.log(window.getComputedStyle(document.getElementsByClassName("map").item(0)))
  }
  constructor(el: ElementRef) {
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
