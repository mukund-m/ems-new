import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService, AlertService, UserService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = '';
  isAuthenticated = false;
  angularImage: string;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  isExpanded1 = true;
  showSubmenu1: boolean = false;
  isShowing1 = false;
  
  expanded = false;
  expanded1 = false;
  mode = 'side';
  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private userService: UserService
    ) {
      this.isAuthenticated = this.authService.isAuthenticated(),
      this.angularImage = '/assets/img/angular2.jpg';
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.mode = 'over';
      }
  }

  userUid() {
    this.userService.getUserProfileInformation();
    return firebase.auth().currentUser.uid;
  }

  userEmail() {
    this.userService.getUserProfileInformation();
    return firebase.auth().currentUser.email;
  }

  userName() {
    this.userService.getUserProfileInformation();
    return firebase.auth().currentUser.displayName;
  }

  onLogout() {
    this.authService.logout();
    this.alertService.showToaster('Logout succesful');
  }

  public menuItems: Array<Object> = [
    {
      icon: 'description',
      title: 'Published packages',
      link: 'https://www.npmjs.com/~jeroenouw'
    },
    {
      icon: 'link',
      title: 'Fork on Github',
      link: 'https://github.com/jeroenouw/AngularMaterialFirebase'
    },
  ];
}
