import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserServiceService } from '../shared/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User;
  constructor(private uService: UserServiceService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    this.uService.sendRegistration(this.user).subscribe(
      resp => {
        console.log(resp);
      }
    );
    this.router.navigate(['/home']);
  }
}
