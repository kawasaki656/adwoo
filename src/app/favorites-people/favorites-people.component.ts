import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    Renderer2
} from '@angular/core';

@Component({
  selector: 'favorites-people-component',
  templateUrl: './favorites-people.component.html',
  styleUrls: ['./favorites-people.component.css']
})
export class FavoritesPeopleComponent implements AfterViewInit {

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
