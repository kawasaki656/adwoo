import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppContent } from './app.content';
import { FilterComponent } from "./filters/filter.component";
import { NavigationService } from "./map/navigation.service"
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {ConfirmComponent} from "./addBlockModal/addBlockModal";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppContent,
    FilterComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BootstrapModalModule,
    HttpClientModule
  ],
  entryComponents: [ConfirmComponent],
  providers: [NavigationService],
  bootstrap: [AppContent]
})
export class AppModule {}
