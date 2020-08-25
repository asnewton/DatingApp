import { Router } from '@angular/router';
import { User } from './../_models/user';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDaterangepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm:FormGroup;
  bsConfig: Partial<BsDaterangepickerConfig>;
  constructor(private authService: AuthService, private alertifyService:AlertifyService,
    private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
     this.registerForm = new FormGroup({
       username: new FormControl(null,Validators.required),
       gender: new FormControl('male', Validators.required),
       knownAs: new FormControl(null, Validators.required),
       dateOfBirth: new FormControl(null, Validators.required),
       city: new FormControl(null, Validators.required),
       country: new FormControl(null, Validators.required),
       password: new FormControl(null,[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
       confirmPassword: new FormControl(null,Validators.required),
     }, this.passwordMatchValidator);
    //this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      required: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:[null,Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  user:User;
  register() {
    if(this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
    } 
    this.authService.register(this.user).subscribe(() => {
      this.alertifyService.success('Registration successful.');
    }, error => {
      this.alertifyService.error('Registration failed.');
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {"mismatch": true}
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
