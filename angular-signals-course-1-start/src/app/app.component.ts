import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {LoadingIndicatorComponent} from "./loading/loading.component";
import {MessagesComponent} from "./messages/messages.component";
import {MessagesService} from "./messages/messages.service";
import {APP_NAME_TOKEN, ENVIRONMENT_TOKEN, messagesFactory} from "./factory/messages.factory";
import {AuthService} from "./services/auth.service";


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet, MatSidenavContainer, MatSidenav, MatNavList, MatListItem, MatIcon, RouterLink, MatToolbar,
        MatIconButton, LoadingIndicatorComponent, MessagesComponent
    ],
    providers: [
      { provide: ENVIRONMENT_TOKEN, useValue: true},
      { provide: APP_NAME_TOKEN, useValue: 'MyAngularApp'},
      {
        provide: MessagesService,
        useFactory: messagesFactory,
        deps: [ENVIRONMENT_TOKEN, APP_NAME_TOKEN]
      }
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  async onLogout() {
    await this.authService.logout();
  }
}
