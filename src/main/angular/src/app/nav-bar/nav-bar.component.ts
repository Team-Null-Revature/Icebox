import { Router } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';
import { UserServiceService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchSt: String;
  @Input() u: User;
  constructor(private uService: UserServiceService, private router: Router, private home : HomeComponent) {}

  ngOnInit() {
    this.searchSt = '';
    this.uService.checkLogin().subscribe(
      resp => {
          this.u = resp;
          console.log("user in navbar");
          console.log(this.u);
          if (resp == null) {
              this.router.navigate(['/login']);
          }
      }
    );
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
