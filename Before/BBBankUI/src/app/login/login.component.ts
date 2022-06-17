import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.login()
      .subscribe(user => {
        console.log("Is Login Success: " + user);

        if (user) {
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        }
      });
  }
}
