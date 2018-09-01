import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss']
})
export class CardBlockComponent {
 authService: AuthService;
  constructor(private router: Router,
  private authServiceTemp: AuthService) {
    this.authService = authServiceTemp;
  }

  goto(route) {
    this.router.navigate([route]);
  }
}
