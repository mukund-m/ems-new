import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss']
})
export class CardBlockComponent {

  constructor(private router: Router) {

  }

  goto(route) {
    this.router.navigate([route]);
  }
}
