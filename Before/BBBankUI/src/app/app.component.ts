import { Component, OnInit } from '@angular/core';
import { AppUser } from './models/app-user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserLoggedIn?: boolean;
  constructor(private authService: AuthService) { 
   
  }
  ngOnInit(): void {
    this.isUserLoggedIn =  localStorage.getItem('loggedInUser') != null;
  }
  title = 'BBBankUI';
}
