import { Component } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

export interface ConfirmModel {

}

@Component({
  selector: 'start-tips',
  styleUrls: ['start.tips.css'],
  templateUrl: 'start.tips.html'
})

export class StartTips extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  public tip: number;
  
  constructor(dialogService: DialogService) {
    super(dialogService);

    this.tip = 1;
  }

  next (){
    if (this.tip === 2) {
      this.close();

      return;
    }

    this.tip ++;
  }
}

