import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt'; 

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

import { AuthService } from './services/auth/auth.service';
import { NoteService } from './services/note/note.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  { path: 'note/create', component: NoteCreateComponent, canActivate:[AuthGuardService] },
  { path: 'note/:id', component: NoteShowComponent, canActivate:[AuthGuardService] },
  { path: 'note/:id/edit', component: NoteEditComponent,canActivate:[AuthGuardService] },
  { path: '**', component: ErrorComponent }
];

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
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
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
