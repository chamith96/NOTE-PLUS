import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt'; 
import { FileUploadModule } from 'ng2-file-upload';
import { Route } from '../app/app.route';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteShowComponent } from './note-show/note-show.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AuthService } from './services/auth/auth.service';
import { NoteService } from './services/note/note.service'; 
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard/admin-auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    DashboardComponent,
    NoteCreateComponent,
    NoteShowComponent,
    NoteEditComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    FlashMessagesModule.forRoot(),
    Route,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],   
      }
    })
  ],
  providers: [
    AuthService,
    NoteService,
    AdminAuthService,
    AuthGuardService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
