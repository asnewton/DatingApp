import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from '../../gloablConfig';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(GlobalConfig.baseApiUrl + 'auth/login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      )
  }

  register(model:any) {
    return this.http.post(GlobalConfig.baseApiUrl + 'auth/register', model);
  }

}
