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
<<<<<<< HEAD
      console.log(user.username + " " + user.pass);

      const body = 'username=${user.username}&password=${user.pass}'; 
      return this.http.post('/icebox/API/login', body).pipe(
=======
      return this.http.post('/icebox/API/login', user).pipe(
>>>>>>> 5b09e615c8852cb2cf5b4ef44c704cceebfabb3d
        map(resp => resp as User)
    );
  } 
}
 