import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppContent } from './app.content';
import { FilterComponent } from "./filters/filter.component";
import { NavigationService } from "./map/navigation.service"

@NgModule({
  declarations: [
    AppContent,
    FilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NavigationService],
  bootstrap: [AppContent]
})
export class AppModule {}
