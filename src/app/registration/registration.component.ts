import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { StartTips } from '../education/startTips/start.tips';
import { ObjectInformation } from '../objectInformation/objectInformation';
import { SuccessTip } from '../education/successTip/success.tip';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  checkAgreements: boolean;
  login: string;
  step: number;
  constructor(private router: Router, private dialogService: DialogService) {
    this.step = 0;
    this.checkAgreements = false;
  }

  changeInput(arg) {
    if(this.login !== undefined && this.login !== '') {
      switch(arg) {
        case 'login': this.step = 1; break;
        case 'password': this.step = 2; break;
        case 'rules': this.checkAgreements ? this.step = 2 : this.step = 3;
      }
    } else {
      switch(arg) {
        case 'login': this.step = 0; break;
        case 'password': this.step = 1; break;
      }
    }
    console.log(this.step)
  }

  facebookRegistration() {
    // window.location.href = '';
    this.router.navigateByUrl('').then(()=>{
      this.dialogService.addDialog(StartTips)
        .subscribe((e) => {
          this.dialogService.addDialog(ObjectInformation)
            .subscribe(() => {
              this.dialogService.addDialog(SuccessTip)
            })
        })
    });
  }

  ngOnInit() {
  }

}
