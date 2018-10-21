import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth/admin-auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

aemail: String;
apassword: String;
val: any;

  constructor(private auth: AdminAuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  adminLogin() {
    const admin = {
      email: this.aemail,
      password: this.apassword
    };

    this.auth.adminLogin(admin).subscribe((data) => {
      this.val = data;
      if(this.val.success) {
        this.auth.storeAdminData(this.val.token, this.val.admin);
        this.router.navigate(['admin/dashboard']);
      } else {
        this.flashMessage.show(this.val.message, { cssClass: 'alert-danger', timeout: 700 });
      };
    });
  }

}
