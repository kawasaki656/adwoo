import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    PersonalDataFormComponent
  ],
  exports: [
    PersonalDataFormComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
  ]

})

export class UserModule {}
