import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./map.css', './header.css', './content.css']
})
export class AppComponent {
  title = 'Adwoo';
  screenHeight: number;
  screenWidth: number;
  constructor(el: ElementRef) {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.offsetHeight;
    document.body.style.height = '870px';
  }
}
