import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  name:string;
  height:string;
  width:string;
}
@Component({
  selector: 'object-information',
  styleUrls: ['objectInformation.css'],
  templateUrl: 'objectInformation.html'
})
export class ObjectInformation extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  name:string;
  height:string;
  width:string;
  menuItem:number;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  selectMenu(item) {
    this.menuItem = item;
    console.log(this.menuItem)
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
