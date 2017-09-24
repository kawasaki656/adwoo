import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
  selector: 'confirm',
  templateUrl: 'addBlockModal.html',
  styleUrls: ['addModalObject.css']
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  rotatorPosition:number;
  currentObject:number;
  constructor(dialogService: DialogService) {
    super(dialogService);
    this.title = "Add a new object";
    this.rotatorPosition = 60;
    this.currentObject = 1;
  }
  moveLeft() {
    if(this.currentObject > 1) {
      this.rotatorPosition+=310;
      this.currentObject-=1;
    }
  }
  moveRight() {
    if(this.currentObject < 7) {
      this.rotatorPosition -= 310;
      this.currentObject+=1;
    }
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
}
