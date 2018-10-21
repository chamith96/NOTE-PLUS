import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AdminAuthService } from '../admin-auth/admin-auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config on the data property
    const expectedRole = route.data.expectedRole;

    if (this.adminAuthService.logedIn() || this.adminAuthService.verify() !== expectedRole) {
      this.router.navigate(['admin/login']);
      return false;
    }
    return true;
  }
}
