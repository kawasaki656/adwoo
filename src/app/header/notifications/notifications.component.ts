import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    Renderer2
} from '@angular/core';

@Component({
  selector: 'notifications-component',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit {

  private currentElement: ElementRef;
  private renderer: Renderer2;

  constructor(currentElement: ElementRef, renderer: Renderer2) {
      this.currentElement = currentElement;
      this.renderer = renderer;
  }

  ngAfterViewInit() {
      setTimeout(()=> {
          this.renderer.addClass(this.currentElement.nativeElement, "animate-in");
      }, 10);
  }

}
