import {Component, OnInit} from '@angular/core';
import { User } from '../shared/user';
import { UserServiceService } from '../shared/user-service.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    user = new User; 
    

    constructor(private uService: UserServiceService, private router: Router){}

    ngOnInit(){

    }

    Login(){
        this.uService.sendLogin(this.user).subscribe(
            resp => {
                console.log(resp);
            }
        );
        this.router.navigate(['/home'])
    }

}