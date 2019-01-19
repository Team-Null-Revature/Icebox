import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchSt: String;

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
    this.router.navigate(['/home/search/' + this.searchSt]);
  }
}
