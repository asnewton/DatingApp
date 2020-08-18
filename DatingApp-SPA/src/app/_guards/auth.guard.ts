import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) return true;
    this.alertifyService.error('Login required.');
    this.router.navigate(['home']);
    return false;
  }

}
