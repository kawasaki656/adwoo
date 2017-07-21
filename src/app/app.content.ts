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
  constructor(el: ElementRef) {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
  }
}
