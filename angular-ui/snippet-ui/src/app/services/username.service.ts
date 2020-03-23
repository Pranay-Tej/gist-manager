import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  // ------ data lost on refresh, so localStorage is used -----------
  // private username: string;

  setUsername(username: string){
    // this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(){
    // return this.username;
    return localStorage.getItem('username');
  }

constructor() { }

}
