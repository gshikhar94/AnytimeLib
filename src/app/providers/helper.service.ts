import { Injectable } from '@angular/core';
import { Users } from '../Users';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Http, Response, HttpModule } from "@angular/http";

const USER_KEY = "user";

@Injectable()
export class HelperService {

  constructor() { }

  addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  getStoredItem(key): any {
    return localStorage.getItem(key);
  }

  removeStoredItem(key) {
    localStorage.removeItem(key);
  }

  storeUserObject(userObject: {}) {
    this.addToLocalStorage(USER_KEY, JSON.stringify(userObject));
  }

  getUserObject(): Users {
    var userString = this.getStoredItem(USER_KEY);
    if (userString == null || userString == 'undefined') {
      return null;
    }
    return new Users(JSON.parse(this.getStoredItem(USER_KEY)));
  }

  removeStoredUser() {
    this.removeStoredItem(USER_KEY);
  }

  isUserLoggedIn(): boolean {
    if (this.getUserObject() == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
