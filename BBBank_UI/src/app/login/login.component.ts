/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult, EventMessage, EventType,
} from '@azure/msal-browser';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import jwt_decode from 'jwt-decode';
import AppUser from '../shared/models/app-user';
import { loginRequest } from '../auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements OnInit {
  loggedInUser: AppUser;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: MsalService,
    private router: Router,
    // Different events are triggered by MSAL throughout the Auth process. You can filter upon these events to to perform custom operations. 
    // complete list of Events are available at https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/events.md
    private msalBroadcastService: MsalBroadcastService,
  ) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        // filtering on LOGIN_SUCCESS event. Every event returns object of type EventMessage
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        // eslint-disable-next-line no-underscore-dangle
        takeUntil(this._destroying$),
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        // Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
        this.authService.instance.setActiveAccount(payload.account);
        if (payload.account.homeAccountId) {
          this.setLoggedInUser(payload.accessToken);
        }
      });
  }

  login() {
    this.authService.loginRedirect(loginRequest);
  }

  setLoggedInUser(accessToken: any) {
    //decoding the token and setting up values of logged in user.
    const tokenInfo = this.getDecodedAccessToken(accessToken);
    this.loggedInUser = {
      id: tokenInfo.oid,
      firstName: tokenInfo.given_name,
      lastName: tokenInfo.family_name,
      username: tokenInfo.unique_name,
      email: tokenInfo.email,
      roles: tokenInfo.roles,
    } as AppUser;
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
