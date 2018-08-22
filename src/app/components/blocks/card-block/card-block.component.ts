import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss']
})
export class CardBlockComponent {

  constructor(private router: Router,
  private authService: AuthService) {

  }

  goto(route) {
    this.router.navigate([route]);
  }
}
