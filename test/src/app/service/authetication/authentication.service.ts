import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Login, User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

export class CustomQueryEncoderHelper extends QueryEncoder {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line:no-inferrable-types
  // loginEndPointURL: string = '';
  // tslint:disable-next-line:no-inferrable-types
  isLoggedIn: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  loginSucess: boolean = false;
  userData: User[] = [];

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
    this.userService.getAllUserData().subscribe(res => {
      this.userData = res;
    });
  }

}
