import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../services/notifications.service';
import {NavigationService} from "../map/navigation.service";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
    //modals
    private inviteModalState: boolean;
    private favoriteModalState: boolean;
    private notificationsModalState: boolean;
    private profileModalState: boolean;

    constructor(private notificationsService: NotificationsService) {
        this.inviteModalState = false;
        this.favoriteModalState = false;
        this.notificationsModalState = false;
        this.profileModalState = false;
    }

    ngOnInit() {
    }

    showInviteModal() {
        this.inviteModalState = !this.inviteModalState;
        this.hideOpenModal("invite");
    }

    showFavoriteModal() {
        this.favoriteModalState = !this.favoriteModalState;
        this.hideOpenModal("favorite");
    }

    showNotificationsModal() {
        this.notificationsModalState = !this.notificationsModalState;
        this.hideOpenModal("notifications");
    }

    showProfileModalState() {
        this.profileModalState = !this.profileModalState;
        this.hideOpenModal("profile");
    }

    hideOpenModal(clickedModalOpener) {
        switch(clickedModalOpener) {
            case "invite": this.favoriteModalState = false; this.notificationsModalState = false; this.profileModalState = false; break;
            case "favorite": this.inviteModalState = false; this.notificationsModalState = false; this.profileModalState = false; break;
            case "notifications": this.inviteModalState = false; this.favoriteModalState = false; this.profileModalState = false; break;
            case "profile": this.inviteModalState = false; this.favoriteModalState = false; this.notificationsModalState = false; break;
        }
    }

}
