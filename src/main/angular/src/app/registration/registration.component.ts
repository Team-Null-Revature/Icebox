import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = {username: "", pass: "", fname:"", lname:"",email:""};
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.user);
  }

}
