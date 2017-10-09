import {Component, ElementRef, OnInit} from '@angular/core';
import { NavigationService } from "./map/navigation.service";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmComponent} from "./addBlockModal/addBlockModal";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.html',
  styleUrls: ['map/map.css', 'header/header.css', 'footer/footer.css', './content.css']
})
export class AppContent implements OnInit {
  jsonSections : any;
  sizemap:number;
  title = 'Adwoo';
  screenHeight: number;
  screenWidth: number;
  map: Array<Array<Object>>;
  mapHeight: string;
  mapWidth: string;
  navigation: any;
  navigationX: number;
  navigationY: number;
  constructor(el: ElementRef, navigation:NavigationService, private dialogService:DialogService, private http: HttpClient) {
    this.navigation = navigation;
    this.navigationX = -250;
    this.navigationY = -90;
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

  navRight():void {
    this.navigationX -= this.screenWidth/2;
  }
  navLeft():void {
    this.navigationX += this.screenWidth/2;
  }
  navTop():void {
    this.navigationY += this.screenHeight/2;
  }
  navBottom():void {
    this.navigationY -= this.screenHeight/2;
  }
  ngOnInit(): void {
    this.fillMap();
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    document.body.style.height = this.screenHeight + 'px';
    document.body.style.width = this.screenWidth + 'px';
    let screenDom = window.getComputedStyle(document.getElementsByClassName("screen").item(0));
    this.mapHeight = screenDom.height;
    this.mapWidth = screenDom.width;
    this.http.get('/assets/json/objects.json').subscribe(data => {
      this.jsonSections = data;
      console.log(data);
    });
  }
  fillMap() {
    this.sizemap = 3;
    //this.map = new Array();
    /*for(let i=0; i<this.sizemap; i++) {
      this.map.push(new Array());
      for(let j=0; j<this.sizemap; j++) {
        this.map[i].push(new Array());
      }
    }*/
    /*for(let i=0; i<this.sizemap; i++) {
      for(let j=0; j<this.sizemap; j++) {
        this.map[i][j] = '../assets/City_Objects/Block_0' + (Math.floor(Math.random() * 7)+1) + '.png';
      }
    }*/
  }
}
