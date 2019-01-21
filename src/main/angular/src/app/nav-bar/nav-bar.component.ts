import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchSt: String;
  user: User;
  constructor(private uService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.searchSt = '';
  }

  logout() {
    console.log('logging out');
    this.uService.logout().subscribe(resp => {
      this.router.navigate(['/login']);
    });
  }

  search() {
    this.router.navigate(['/home/search/' + this.searchSt.replace(".","`")]);
  }
  deleteUser(){
    console.log('deleting user');
    this.uService.delete().subscribe(resp => {
        console.log(resp);
        this.logout();
      });
  }
}
