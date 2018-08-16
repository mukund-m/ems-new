import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-titlecase-pipe',
  template: `
          {{message }}
  `,
  styles: []
})
export class TitleCasePipeComponent implements OnInit {
   message = 'PCST - Institutional Assistant';
  constructor() { }

  ngOnInit() {
  }

}
