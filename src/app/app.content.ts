import {Component, ElementRef, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'filters/filters.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit{
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
  filtersHeight: string;
  leftPositionShowButton: string;
  ngOnInit(): void {
    this.fillMap();
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.cellHeight = this.screenHeight / 5;
    this.cellWidth = this.screenWidth / 6;
    //this.rotateMap = 145;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    this.calculateFiltersCoordinate();
    //console.log(window.getComputedStyle(document.getElementsByClassName("map").item(0)))
  }
  constructor(el: ElementRef) {
  }
  fillMap():void {
    this.sizemap = 5;
    this.map = new Array();
    for(let i=0; i<this.sizemap; i++) {
      this.map.push(new Array());
      for(let j=0; j<this.sizemap; j++) {
        this.map[i].push(new Array());
      }
    }
    console.log(this.map)
  }
  calculateFiltersCoordinate(): void {
    let filtersDom = window.getComputedStyle(document.getElementsByClassName("header").item(0));
    this.filtersHeight = filtersDom.height;
    this.leftPositionShowButton = (parseFloat(this.mapWidth)/2 - 50) + 'px';
  }
}
