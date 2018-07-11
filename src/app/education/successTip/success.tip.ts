import { Component } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

export interface ConfirmModel {

}

@Component({
  selector: 'success-tip',
  styleUrls: ['./../startTips/start.tips.css'],
  templateUrl: 'success.tip.html'
})

export class SuccessTip extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm (){
    this.close();
  }
}

