import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'app/components/shared';

@Component({
  selector: 'admin-dashboard-top-cards',
  templateUrl: './admin-dashboard-top-cards.component.html',
  styleUrls: ['./admin-dashboard-top-cards.component.scss']
})
export class AdminDashboardTopCardsComponent implements OnInit {

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', 'blue']
  };
  view: any[] = [800, 150];
  single =[{
    'name':'Students' ,
    'value': 580
  },
  {
    'name': 'Staffs' ,
    'value':48
  },

  {
    'name':'Branches' ,
    'value':5
  },

  {
    'name':'Courses' ,
    'value':74
  },
  {
    'name': "SMS Balance",
    "value":0
  }
]

  constructor(private router: Router,
  private restService: RestService) { }

  ngOnInit() {
    this.restService.getFromExternal('http://control.msg91.com/api/balance.php?type=4&authkey=222685AydWOPqhrfjo5b32730f', (data)=> {
      console.log(data);
      this.single[4].value = data;
  })
  }

  onSelect(data) {
    console.log(data);
    if(data.name == 'Students') {
      this.router.navigate(['students'])
    }
    if(data.name == 'Courses') {
      this.router.navigate(['courses'])
    }
    if(data.name == 'Branches') {
      this.router.navigate(['branches'])
    }
    if(data.name == 'Staffs') {
      this.router.navigate(['staffs'])
    }
  }
}
