import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartTutorialManager } from '../services/startTutorialManager';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  checkAgreements: boolean;
  login: string;
  step: number;
  constructor(private router: Router, private startTutorialManager: StartTutorialManager) {
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
  }

  facebookRegistration() {
    this.router.navigateByUrl('');
    this.startTutorialManager.educationNeed(true);
  }

  ngOnInit() {
  }

}
