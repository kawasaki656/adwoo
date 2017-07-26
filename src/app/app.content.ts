import {Component, ElementRef, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit{
  ngOnInit(): void {
    this.fillMap()
  }
  sizemap:number;
  title = 'Adwoo';
  screenHeight: number;
  screenWidth: number;
  cellHeight: number;
  cellWidth: number;
  map: Array<Array<Object>>;
  rotateMap: number;
  constructor(el: ElementRef) {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.cellHeight = this.screenHeight / 5;
    this.cellWidth = this.screenWidth / 6;
    this.rotateMap = 145;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
  }
  fillMap():void {
    this.sizemap = 20;
    this.map = new Array();
    for(let i=0; i<this.sizemap; i++) {
      this.map.push(new Array());
      for(let j=0; j<this.sizemap; j++) {
        this.map[i].push(new Array());
      }
    }
    console.log(this.map)
  }
}
