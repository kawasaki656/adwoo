import { NgModule } from '@angular/core';
import {
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule
  ]
})

export class MaterialModule {
}
