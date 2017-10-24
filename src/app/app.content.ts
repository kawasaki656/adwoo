import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationService } from "./map/navigation.service";
import { ScreenService } from "./screen/screen.service";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "./addBlockModal/addBlockModal";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit {
  jsonSections : any;
  sizemap:number;
  title = 'Adwoo';
  map: Array<Array<Object>>;
  mapHeight: string;
  mapWidth: string;
  navigation:any;
  constructor(el: ElementRef, private dialogService:DialogService, private http: HttpClient, screen:ScreenService, navigation:NavigationService) {
    this.navigation = navigation;
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title: 'Add a new building',
        message: 'Confirm message'
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }
      });
  }

  selectSection(section): void {
    console.log(section);
  }

  ngOnInit(): void {
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    this.http.get('/assets/json/objects.json').subscribe(data => {
      this.jsonSections = data;
    });
  }
}
