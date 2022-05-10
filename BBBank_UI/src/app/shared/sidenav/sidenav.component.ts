import { Component, OnInit } from '@angular/core';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export default class SidenavComponent implements OnInit {
  loggedInUserRole: string;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    // eslint-disable-next-line prefer-destructuring
    this.loggedInUserRole = JSON.parse(localStorage.getItem('loggedInUser')).roles[0];
  }
}
