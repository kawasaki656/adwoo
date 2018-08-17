import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state: string;
  ifAccountChecked: boolean;
  constructor() {}


  ngOnInit() {
      this.state = "account";
      this.ifAccountChecked = true;
  }

  navigate(item) {
    if(item === "accountChange") {
      if(this.state === "account") {
        this.state = "cashpoints";
      } else {
        this.state = "account"
      }
    } else {
      this.state = "property";
    }
  }

}
