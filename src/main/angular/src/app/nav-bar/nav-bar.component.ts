import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private uService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    console.log("logging out");
    this.uService.logout().subscribe(resp => {
      this.router.navigate(['/login']);
  });
  }

}
