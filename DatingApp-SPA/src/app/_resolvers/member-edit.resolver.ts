import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
    
    constructor(private userService:UserService,
        private router:Router, private alertifyService:AlertifyService,
        private authService:AuthService) {        
    }

    resolve(route:ActivatedRouteSnapshot):Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .pipe(
                catchError(error => {
                    this.alertifyService.error("Retreiving data failed");
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
    }

}