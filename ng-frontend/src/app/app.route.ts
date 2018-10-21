import { RouterModule, Routes } from '@angular/router';

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

import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard/admin-auth-guard.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService], data:{ expectedRole: false} },
    { path: 'note/create', component: NoteCreateComponent, canActivate:[AuthGuardService], data:{ expectedRole: false}},
    { path: 'note/:id', component: NoteShowComponent, canActivate:[AuthGuardService], data:{ expectedRole: false} },
    { path: 'note/:id/edit', component: NoteEditComponent,canActivate:[AuthGuardService], data:{ expectedRole: false} },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate:[AdminAuthGuardService], data:{ expectedRole: true} },
    { path: '**', component: ErrorComponent }
  ];

  export const Route = RouterModule.forRoot(appRoutes);