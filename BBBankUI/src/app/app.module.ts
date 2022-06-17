import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { loginRequest, msalConfig, MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory, protectedResources } from './auth-config';
import TransactionService from './services/transaction.service';
import DashboardComponent from './dashboard/dashboard.component';
import LoginComponent from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageAccountsComponent,
    CreateAccountComponent,
    DepositFundsComponent,
    TransferFundsComponent,
    ToolbarComponent,
    SidenavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // CLI adds AppRoutingModule to the AppModule's imports array
    MsalModule
  ],
  providers: [TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
