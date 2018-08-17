import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppContent } from './app.content';
import { FilterComponent } from "./filters/filter.component";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from "./addBlockModal/addBlockModal";
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from "./map/navigation.component";
import { CommonModule } from "@angular/common";
import { MyProperty } from "./my-property/myProperty";
import { ObjectInformation } from "./objectInformation/objectInformation";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartTips } from './education/startTips/start.tips';
import { SuccessTip } from './education/successTip/success.tip';
import { InvitePeopleComponent } from './header/invite-people/invite-people.component';
import { FavoritesPeopleComponent } from './header/favorites-people/favorites-people.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { HeaderComponent } from './header/header.component';

import { ScreenService } from "./screen/screen.service";
import { NavigationService } from "./map/navigation.service";
import { StartTutorialManager } from './services/startTutorialManager';
import { NotificationsService } from './services/notifications.service';
import { ProfileComponent } from './header/profile/profile.component';

const ROUTES:Routes = [
  {
    path: '',
    component: MapComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'join',
    component: RegistrationComponent
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
    MapComponent,
    RegistrationComponent,
    StartTips,
    SuccessTip,
    InvitePeopleComponent,
    FavoritesPeopleComponent,
    NotificationsComponent,
    HeaderComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BootstrapModalModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  entryComponents: [ConfirmComponent, MyProperty, ObjectInformation,  StartTips, SuccessTip],
  providers: [NavigationService, ScreenService, StartTutorialManager, NotificationsService],
  bootstrap: [AppContent]
})
export class AppModule {}
