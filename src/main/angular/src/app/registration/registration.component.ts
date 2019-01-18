import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserServiceService } from '../shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;

  constructor(private uService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.user = new User();
    this.uService.checkLogin().subscribe(resp => {
      if (resp != null) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit() {
    this.uService.sendRegistration(this.user).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }
}
