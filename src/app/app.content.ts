import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent {
  title = 'Adwoo';
  screenHeight: number;
  screenWidth: number;
  cellHeight: number;
  cellWidth: number;
  map:Array<string>
  constructor(el: ElementRef) {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.cellHeight = this.screenHeight / 10;
    this.cellWidth = this.screenWidth / 9;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
  }
}
