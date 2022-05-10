import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import AppUser from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  loggedInUser?: AppUser;

  constructor(private router: Router) { }

  login(): Observable<AppUser> {
    /*   this.loggedInUser = {
        id: '5b1aa188-636f-436a-a2da-ae742ddadedf',
        firstName: 'Patterns',
        lastName: 'Tech',
        roles: ['bank-manager'],
      } as AppUser; */
    /*          this.loggedInUser = {
           id: 'c651e237-102a-4de1-8c5a-d41c94079ff0',
          firstName: 'Salman',
          lastName: 'Taj',
          roles: ['account-holder']
        } as AppUser;  */

    this.loggedInUser = {
      id: 'aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3',
      firstName: 'Raas',
      lastName: 'Masood',
      roles: ['account-holder'],
    } as AppUser;

    // Azure AD Call goes here  _msalService.getAccount();

    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

    return of(this.loggedInUser).pipe(
      delay(1000),
    );
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
