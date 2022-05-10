import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BankManagerRoutingModule from './bank-manager-routing.module';
import BankManagerComponent from './bank-manager.component';

@NgModule({
  declarations: [
    BankManagerComponent,
  ],
  imports: [
    CommonModule,
    BankManagerRoutingModule,
  ],
})
export default class BankManagerModule { }
