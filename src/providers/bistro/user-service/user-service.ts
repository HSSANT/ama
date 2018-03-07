import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { User } from '../classes/user';
@Injectable()
export class UserServiceProvider {

  user: User = new User("", "");

  constructor(public http: Http, ) { 
  }

  login(phone, password) {
    this.user.setName("Daniel");
    this.user.setPassword(password);
    this.user.setPhone(phone);
    this.user.setLoginStatus(true);
  }

  register(phone, password) {
    this.login(phone, password);
  }

  checkLogin() {
    return Boolean(this.user.isLoggedIn);
  }

  getUser(): User {
    return this.user;
  }

  logOut() {
    this.user.setLoginStatus(false);
  }

}
