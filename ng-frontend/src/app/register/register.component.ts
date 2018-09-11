import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

uname: String;
uemail: String;
upassword: String;
val: any;

  constructor(private auth: AuthService, private flashMessage: FlashMessagesService) {

   }

  ngOnInit() {
  }

  userSignup(){
    const user = {
      name: this.uname,
      email: this.uemail,
      password: this.upassword
    };

    this.auth.registerUser(user)
    .subscribe((data) => {
      this.val = data;
      if(this.val.success) {
        this.flashMessage.show('User Registered.', { cssClass: 'alert-success', timeout: 700 });
        console.log(data);
      } else {
        this.flashMessage.show('Please fill all details.', { cssClass: 'alert-danger', timeout: 800 });
      }
    });
  }

}
