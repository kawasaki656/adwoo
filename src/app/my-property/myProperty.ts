import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  width:string;
  height:string;
}
@Component({
  selector: 'myProperty',
  styleUrls: ['myProperty.css'],
  templateUrl: 'myProperty.html'
})
export class MyProperty extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  width: string;
  height: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
}