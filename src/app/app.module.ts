import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppContent } from './app.content';
import { FilterComponent } from "./filters/filter.component";
import { NavigationService } from "./map/navigation.service"
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from "./addBlockModal/addBlockModal";
import { HttpClientModule } from '@angular/common/http';
import { ScreenService } from "./screen/screen.service";
import { NavigationComponent } from "./map/navigation.component";
import { CommonModule } from "@angular/common";
import { MyProperty } from "./my-property/myProperty";
import { ObjectInformation } from "./objectInformation/objectInformation";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

const ROUTES:Routes = [
  {
    path: '',
    component: MapComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppContent,
    FilterComponent,
    ConfirmComponent,
    MyProperty,
    ObjectInformation,
    NavigationComponent,
    DashboardComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BootstrapModalModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  entryComponents: [ConfirmComponent, MyProperty, ObjectInformation],
  providers: [NavigationService, ScreenService],
  bootstrap: [AppContent]
})
export class AppModule {}
