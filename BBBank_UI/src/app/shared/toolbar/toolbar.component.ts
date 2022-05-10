import {
  Component, Input, OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MsalService } from '@azure/msal-angular';
import AppUser from '../models/app-user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export default class ToolbarComponent implements OnInit {
  // @ts-ignore: Object is possibly 'null'.
  @Input() inputSideNav: MatSidenav;

  loggedInUser?: AppUser;

  constructor(private authService: MsalService) {

  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.authService.logout();
  }
}
