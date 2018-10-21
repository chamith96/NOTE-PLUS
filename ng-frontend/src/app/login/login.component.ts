import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

uemail: String;
upassword: String;
val: any;
token = localStorage.getItem('id_token');

  constructor(private jwtauth: JwtHelperService,private auth: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  userLogin() {
    const user = {
      email: this.uemail,
      password: this.upassword
    };

    this.auth.loginUser(user).subscribe((data) => {
      this.val = data;
      if(this.val.success) {
        this.auth.storeUserData(this.val.token, this.val.user);
        this.router.navigate(['dashboard']);
        console.log(JSON.parse(localStorage.getItem('user')).isAdmin);
      } else {
        this.flashMessage.show(this.val.message, { cssClass: 'alert-danger', timeout: 700 });
      };
    });
  }

}
