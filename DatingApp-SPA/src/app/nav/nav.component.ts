import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  username:string = null;
  constructor(private authService: AuthService, private alertifyService:AlertifyService) { 
  }
  
  ngOnInit() {
    this.username = this.authService.decodedToken.unique_name;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.username = this.authService.decodedToken.unique_name;
      this.alertifyService.success('Logged in successfully.');
    }, error => {
      this.alertifyService.message('Login failed.');
     });
  }

  loggedIn() { 
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('Logged out');
  }

}
