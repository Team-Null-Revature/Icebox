import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  sendRegistration(user:User){
    return this.http.post('/icebox/user',user).pipe(
     map(resp => resp as User)
   );
  }

  sendLogin(user: User){
    return this.http.post('/icebox/API/login', user).pipe(
      map(resp => resp as User)
    );
  }
}
 