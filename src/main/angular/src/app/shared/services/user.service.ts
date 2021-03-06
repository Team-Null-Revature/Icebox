import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  sendRegistration(user: User) {
    return this.http.post('user', user).pipe(map(resp => resp as User));
  }

  sendLogin(user: User) {
    return this.http.post('api/login', user).pipe(map(resp => resp as User));
  }

  checkLogin() {
    return this.http.get('api/login').pipe(map(resp => resp as User));
  }

  logout() {
    return this.http.delete('api/login').pipe(map(resp => resp as User));
  }

  delete(){ 
    return this.http.delete('api/home/user/deleteUser').pipe(map(resp => resp as User));
  }
}
