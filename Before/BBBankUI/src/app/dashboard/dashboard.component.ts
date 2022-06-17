import { Component, OnInit } from '@angular/core';
import { LineGraphData } from '../models/line-graph-data';
import TransactionService from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements OnInit {
  lineGraphData: LineGraphData;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService
      .getLast12MonthBalances('37846734-172e-4149-8cec-6f43d1eb3f60')
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
