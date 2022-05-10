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
      .getLast12MonthBalances('aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3')
      .subscribe({
        next: (data: LineGraphData) => {
          this.lineGraphData = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
