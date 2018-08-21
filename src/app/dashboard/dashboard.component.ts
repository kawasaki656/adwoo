import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Property {
    status: String
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state: string;
  ifAccountChecked: boolean;
  property: Property;
  constructor() {
    this.property = {
      status: "new"
    }
  }


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
