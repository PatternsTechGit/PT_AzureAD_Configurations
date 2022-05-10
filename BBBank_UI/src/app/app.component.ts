import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export default class AppComponent implements OnInit {
  isUserLoggedIn?: boolean;

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('loggedInUser') != null;
  }

  title = 'BBBankUI';
}
