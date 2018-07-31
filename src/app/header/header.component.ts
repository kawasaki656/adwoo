import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../services/notifications.service';
import {NavigationService} from "../map/navigation.service";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
    //header
    inviteModalState: boolean;
    favoriteModalState: boolean;
    notificationsModalState: boolean;

    constructor(private notificationsService: NotificationsService) {
        this.inviteModalState = false;
        this.favoriteModalState = false;
        this.notificationsModalState = false;
    }

    ngOnInit() {
    }

    showInviteModal() {
        this.inviteModalState = !this.inviteModalState;
    }

    showFavoriteModal() {
        this.favoriteModalState = !this.favoriteModalState;
    }

    showNotificationsModal() {
        this.notificationsModalState = !this.notificationsModalState;
    }

}
