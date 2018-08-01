import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'personal-data-form',
  templateUrl: './personal-data-from.component.html',
  styleUrls: ['./personal-data-from.component.css']
})

export class PersonalDataFormComponent {
  constructor() {
  }

  onSubmit(form: NgForm) {
    console.log(form.form.value);
  }
}
