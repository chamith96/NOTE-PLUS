import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  admin: any;
  authToken : any;

  constructor(private http: HttpClient, private jwtauth: JwtHelperService) { }

  adminLogin(admin) {
    let headers = new HttpHeaders(admin);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admin/login', admin, {headers: headers});
  }

  //store token and admin data in angular db
  storeAdminData(token, admin) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('admin', JSON.stringify(admin));

    this.authToken = token;
    this.admin = admin;
  }

  //get token expire or not
  logedIn() {
    return this.jwtauth.isTokenExpired();
  }

  verify() {
    const token = localStorage.getItem('id_token');

    // decode the token to get its payload
    const tokenPayload = this.jwtauth.decodeToken(token);
    return tokenPayload.isAdmin;
  }

}
