import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filter.component.html',
  styleUrls: ['./filters.css']
})
export class FilterComponent implements OnInit{
  mapWidth: string;
  filtersHeight: string;
  leftPositionShowButton: string;
  ifPress:boolean = false;
  showFilters(): void {
    if(!this.ifPress) {
      document.getElementsByClassName("wrap").item(0).setAttribute('class', 'motion');
      this.ifPress = !this.ifPress;
    } else {
      document.getElementsByClassName("motion").item(0).setAttribute('class', 'wrap');
      this.ifPress = !this.ifPress;
    }
  };

  ngOnInit(): void {
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapWidth = screenDom.width;
    this.calculateFiltersCoordinate();
  }
  calculateFiltersCoordinate(): void {
    let filtersDom = window.getComputedStyle(document.getElementsByClassName("header").item(0));
    this.filtersHeight = filtersDom.height;
    this.leftPositionShowButton = (parseFloat(this.mapWidth)/2 - 50) + 'px';
  }
}
