import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from '../shared/dashboard/dashboard.component';
import AuthGuard from '../shared/guards/auth.guard';
import DepositFundsComponent from './deposit-funds/deposit-funds.component';
import TransferFundsComponent from './transfer-funds/transfer-funds.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'deposit-funds', component: DepositFundsComponent, canActivate: [AuthGuard] },
  { path: 'transfer-funds', component: TransferFundsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AccountHolderRoutingModule { }
