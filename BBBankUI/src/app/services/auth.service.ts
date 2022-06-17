import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser?: AppUser;
  constructor(private router: Router) { }

  login(): Observable<AppUser> {
    /*    this.loggedInUser = {
         firstName: 'Salman',
         lastName: 'Taj',
         username: 'salmantaj',
         roles: ['bank-manager']
       } as AppUser; */

    this.loggedInUser = {
      firstName: 'Waqas',
      lastName: 'Tariq',
      username: 'waqastariq',
      roles: ['account-holder']
    } as AppUser;

    // Azure AD Call goes here  _msalService.getAccount();

    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

    return of(this.loggedInUser).pipe(
      delay(1000)
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
