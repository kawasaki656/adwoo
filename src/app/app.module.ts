import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppContent } from './app.content';

@NgModule({
  declarations: [
    AppContent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppContent]
})
export class AppModule { }
