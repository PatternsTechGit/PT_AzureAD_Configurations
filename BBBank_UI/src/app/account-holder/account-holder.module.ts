import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import AccountHolderRoutingModule from './account-holder-routing.module';
import AccountHolderComponent from './account-holder.component';

@NgModule({
  declarations: [
    AccountHolderComponent,
  ],
  imports: [
    CommonModule,
    AccountHolderRoutingModule,
  ],
})
export default class AccountHolderModule { }
