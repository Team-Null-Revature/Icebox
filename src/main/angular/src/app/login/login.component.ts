import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserServiceService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  incorrect: Boolean;

  constructor(private uService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.user = new User();
    this.incorrect = false;
    this.uService.checkLogin().subscribe(resp => {
      if (resp != null) {
        this.router.navigate(['/home']);
      }
    });
  }

  Login() {
    this.uService.sendLogin(this.user).subscribe(resp => {
      console.log(resp);
      if (resp == null) {
        this.incorrect = true;
        // this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
