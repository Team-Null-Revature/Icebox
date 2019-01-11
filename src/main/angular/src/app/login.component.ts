import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    usrnm: string;
    pswd: string;

    constructor(){

    }

    ngOnInit(){

    }

    Login(){
        if(this.usrnm == "AdminTest" && this.pswd == "pswd"){
            console.log("Logged In");
        }
        else{
            console.log("Invalide Username or Password");
        }
    }
}