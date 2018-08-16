import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WindowService, PhoneNumber, AuthService, AlertService } from '../../shared';

@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.scss']
})
export class PhoneSigninComponent implements OnInit {
  phoneNumber = new PhoneNumber()
  isAuthenticated = false;

  token: string;
  windowRef: any;
  verificationCode: string;
  currentUser: any;

  constructor(private win: WindowService,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
      this.isAuthenticated = this.authService.isAuthenticated()
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef
   
    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
        .then((result) => {
          const currentUser = result.user;
        })
        .then(response => {
          this.router.navigate(['/']);
   })
}

}
