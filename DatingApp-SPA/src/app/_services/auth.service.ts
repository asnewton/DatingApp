import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from '../../gloablConfig';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  jwtHelper = new JwtHelperService();
  decodedToken:any;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(GlobalConfig.baseApiUrl + 'auth/login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      )
  }

  register(model:any) {
    return this.http.post(GlobalConfig.baseApiUrl + 'auth/register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
