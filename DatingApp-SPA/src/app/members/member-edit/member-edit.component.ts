import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { User } from './../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;  
  user: User;
  @HostListener('window:beforeunload', ['$event'])  unloadNotification($event:any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService,
    private userService: UserService,private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(+this.authService.decodedToken.nameid, this.user).subscribe(next=>{
      this.alertifyService.success("Profile updated successfully.");
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error("Updating failed.");
    })
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl=photoUrl;
  }

}
