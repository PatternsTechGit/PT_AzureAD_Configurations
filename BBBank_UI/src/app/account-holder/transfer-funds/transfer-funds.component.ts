import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css'],
})
export default class TransferFundsComponent implements OnInit {
  fromAccountId: string | undefined;

  toAccountId: string | undefined;

  sub: Subscription | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.fromAccountId = params['fromAccountId'];
      this.toAccountId = params['toAccountId'];
    });
  }
}
