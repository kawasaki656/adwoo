import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface User {
  firstName: string,
  lastName: string,
  password: string,
  passwordConfirmation: string,
  gender: {'m','w', undefined},
  userName: string,
  mail: string,
  birthday: string,
  language: string
}


@Component({
  selector: 'personal-data-form',
  templateUrl: './personal-data-from.component.html',
  styleUrls: ['./personal-data-from.component.css']
})
export class PersonalDataFormComponent {
  user: User;

  constructor(){
   this.user = {
     firstName: '',
     lastName: '',
     password: '',
     passwordConfirmation: '',
     gender: undefined,
     userName: '',
     mail: '',
     birthday: '',
     language: ''
   };
  }


  onSubmit(form: NgForm) {
    console.log(form, this.user);
  }

}
