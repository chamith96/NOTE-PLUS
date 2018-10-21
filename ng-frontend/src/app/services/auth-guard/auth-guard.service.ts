import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot) {
    // this will be passed from the route config on the data property
    const expectedRole = route.data.expectedRole;


    if (this.authService.logedIn() || this.authService.verify() !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
   }

}
