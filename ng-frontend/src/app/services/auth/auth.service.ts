import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

user: any;
authToken : any;
role: Boolean;

  constructor(private http: HttpClient, private jwtauth: JwtHelperService) {
   }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/register', user, {headers: headers});
  }

  loginUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/login', user, {headers: headers});
  }

  //store token and user data in angular db
  storeUserData(token, user) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  //user logout
  logOut(){
   this.authToken = null;
   this.user = null;
   localStorage.clear();
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
