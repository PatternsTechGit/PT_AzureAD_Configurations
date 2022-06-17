import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  loggedInUserRole: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUserRole = JSON.parse(localStorage.getItem('loggedInUser')).roles[0];
  }

}
