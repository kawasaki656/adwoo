import { NgModule } from '@angular/core';
import {
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ]
})

export class MaterialModule {
}
