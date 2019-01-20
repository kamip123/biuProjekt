import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileFormLogin: any;
  firstNameCtrl: FormControl;
  registeredLogin: string;
  registeredpassword: string;
  is_loged_in = false;
  is_registered = false;
  wrong_input = false;

  get firstName() {
    return this.profileFormLogin.get('firstName');
  }

  get password() {
    return this.profileFormLogin.get('password');
  }

  login() {
    console.warn(this.profileFormLogin.value);
      if(this.registeredLogin === this.profileFormLogin.get('firstName').value && this.registeredpassword === this.profileFormLogin.get('password').value){
        this.cookieService.set( 'logedIn', 'true' );
        this.is_loged_in = true;
      }else{
        this.wrong_input = true;
      }
  }

  constructor(private fb: FormBuilder, private cookieService: CookieService) {
  }

  ngOnInit() {
    if (this.cookieService.check('login') && this.cookieService.check('password')) {
      this.is_registered = true;
      if (this.cookieService.check('logedIn')) {
        this.is_loged_in = true;
      } else {
        this.registeredLogin = this.cookieService.get('login');
        this.registeredpassword = this.cookieService.get('password');
      }
    }
    this.firstNameCtrl = this.fb.control('', [Validators.required, Validators.minLength(4)]);
    this.profileFormLogin = this.fb.group({
      'firstName': this.firstNameCtrl,
      'password': ['', Validators.required]
    });
  }

}
