import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User;
  constructor(private uService: UserServiceService){}

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.user);
    this.uService.sendRegistration(this.user).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }
}
