import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {ProfileRegistered} from "./register.profile";
import { CookieService } from 'ngx-cookie-service';
import {stringify} from "querystring";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm: any;
  firstNameCtrl: FormControl;
  ProfileRegistered: any;

  get company() {
    return this.profileForm.get('company') as FormArray;
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get password() {
    return this.profileForm.get('password');
  }

  addCompany() {
    this.company.push(this.fb.control(''));
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.cookieService.set( 'login', this.profileForm.get('firstName').value );
    this.cookieService.set( 'password', this.profileForm.get('password').value );
  }

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let repeatPassword = AC.get('repeatPassword').value;
    if (password != repeatPassword) {
      console.log('false');
      AC.get('repeatPassword').setErrors({MatchPassword: true})
    } else {
      console.log('true');
      return null
    }
  }

  NotName(AC: AbstractControl) {
    let firstName = AC.get('lastName').value;
    if (firstName == 'bob') {
      console.log('false');
      AC.get('lastName').setErrors({NotName: true})
    } else {
      console.log('true');
      return null
    }
  }

  constructor(private fb: FormBuilder, private cookieService: CookieService) {

  }

  updateProfile(){

  }

  ngOnInit() {
    this.firstNameCtrl = this.fb.control('', [Validators.required, Validators.minLength(4)]);


    this.profileForm = this.fb.group({
        'firstName': this.firstNameCtrl,
        'lastName': ['', Validators.required],
        'company': this.fb.array([
          this.fb.control('')
        ]),
        'password': ['', Validators.required],
        'repeatPassword': ['', Validators.required]
      },
      {
        validators: [this.MatchPassword, this.NotName]
      });
  }

}
