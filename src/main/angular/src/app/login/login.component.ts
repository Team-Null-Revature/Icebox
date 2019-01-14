import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    public user: string;
    public password: string;

    constructor(user: string, pass: string){
        this.user = user;
        this.password = pass;
    }

    ngOnInit(){

    }

    Login(event){
        console.log(event);
        event.preventDefault();
    }
/*     Login(user: string, pass:string):boolean{
        console.log("username: " + user + " password: " + pass); 
        if(this.user == user && this.password == pass){
            console.log("User Successfully Logged In");
            return this.user == user && this.password == pass
        } else{
            console.log("Username or password invalid");
        }
            
    } */
}