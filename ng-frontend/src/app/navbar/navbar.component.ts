import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth/auth.service';
import { AdminAuthService } from '../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService,private adminAuth: AdminAuthService, private router: Router,  private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['']);
    this.flashMessage.show('You are log out', { cssClass: 'alert-success', timeout: 500 });
  }

}
