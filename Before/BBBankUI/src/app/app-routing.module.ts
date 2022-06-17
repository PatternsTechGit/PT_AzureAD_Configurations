import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import DashboardComponent from './dashboard/dashboard.component';

import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'manage-accounts', component: ManageAccountsComponent, canActivate: [AuthGuard] },
  { path: 'deposit-funds', component: DepositFundsComponent, canActivate: [AuthGuard] },
  { path: 'transfer-funds', component: TransferFundsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
