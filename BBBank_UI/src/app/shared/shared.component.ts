import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export default class SharedComponent implements OnInit {
  isUserLoggedIn?: boolean;

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('loggedInUser') != null;
  }
}
