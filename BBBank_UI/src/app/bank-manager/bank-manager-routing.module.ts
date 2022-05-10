import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from '../shared/dashboard/dashboard.component';
import AuthGuard from '../shared/guards/auth.guard';
import CreateAccountComponent from './create-account/create-account.component';
import ManageAccountsComponent from './manage-accounts/manage-accounts.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'manage-accounts', component: ManageAccountsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BankManagerRoutingModule { }
