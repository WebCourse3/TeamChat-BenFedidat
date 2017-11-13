import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService) { }

  name: string;
  password: string;
  confirmpassword: string;

  /** GET heroes from the server */
  signup (): void {
    this.userService.signup(this.name, this.password)
    .subscribe(res => {
      if(!this.cookieService.get("user")) {
        this.router.navigate(['./signin']);      
      } 
      else {
        this.router.navigate(['./mainchat']);
      }
    });
  }

}
