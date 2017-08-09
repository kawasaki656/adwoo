import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppContent } from './app.content';
import {FilterComponent} from "./filters/filter.component";

@NgModule({
  declarations: [
    AppContent,
    FilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppContent]
})
export class AppModule {}
