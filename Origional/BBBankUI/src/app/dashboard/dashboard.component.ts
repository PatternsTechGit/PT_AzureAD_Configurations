import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { LineGraphData } from '../models/line-graph-data';
import TransactionService from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements  AfterViewInit {
  lineGraphData: LineGraphData;
  loggedInUser: AppUser;
  constructor(private transactionService: TransactionService) {}

  ngAfterViewInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (this.loggedInUser) {
      this.transactionService
        .getLast12MonthBalances(this.loggedInUser.id)
        .subscribe({
          next: (data) => {
            this.lineGraphData = data;
          },
          error: (error) => {
            console.log(error.responseException.exceptionMessage);
          },
        });
    }
  }
}
